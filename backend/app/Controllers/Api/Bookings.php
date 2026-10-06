<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

/**
 * API publica de solicitudes de cita.
 *
 * POST /api/bookings -> recibe el formulario "View & Book" de las tarjetas de
 * tratamientos y lo reenvia por correo al equipo. El webmaster recibe ademas
 * una constancia de cada solicitud como CORREO APARTE (no como BCC del
 * primero): sale con la identidad de la cuenta SMTP autenticada, porque el
 * dominio From (sayulitatravel.com) no tiene DKIM de Google y los mensajes
 * con From info@... caian en spam (dmarc=fail).
 *
 * Destinatarios viven en Config\Email y se pueden sobreescribir desde el
 * .env (email.recipients / email.bcc), de modo que cambiar el correo en
 * produccion no exige tocar codigo.
 */
class Bookings extends BaseController
{
    /**
     * Campo trampa para bots. Se lee a mano porque el envio llega como JSON y
     * el filtro honeypot de CodeIgniter solo mira el cuerpo de formulario.
     */
    private const TRAP_FIELD = 'website';

    public function store(): ResponseInterface
    {
        $payload = $this->request->getJSON(true);

        if (! is_array($payload)) {
            $payload = $this->request->getPost();
        }

        // Campo relleno = bot. Se responde igual que si hubiera ido bien para
        // no darle pistas, pero no se envia ningun correo.
        if (trim((string) ($payload[self::TRAP_FIELD] ?? '')) !== '') {
            return $this->response->setStatusCode(201)->setJSON([
                'ok'   => true,
                'note' => 'Your request has been sent. We will confirm availability shortly.',
            ]);
        }

        // Corta el spam automatizado que llega sin rellenar el trampantojo.
        $throttler = service('throttler');
        if ($throttler->check(md5($this->request->getIPAddress()), 5, MINUTE) === false) {
            return $this->response->setStatusCode(429)->setJSON([
                'ok'    => false,
                'error' => 'Too many requests from this network. Please try again in a minute.',
            ]);
        }

        $rules = [
            'treatment'      => 'required|trim|max_length[140]',
            'name'           => 'required|trim|min_length[2]|max_length[60]',
            'email'          => 'required|trim|valid_email|max_length[190]',
            'whatsapp'       => 'required|trim|min_length[5]|max_length[30]',
            'location'       => 'permit_empty|trim|max_length[120]',
            'preferred_date' => 'permit_empty|trim|valid_date',
            'notes'          => 'permit_empty|trim|max_length[600]',
            'page'           => 'permit_empty|trim|max_length[300]',
        ];

        if (! $this->validate($rules, $payload)) {
            return $this->response->setStatusCode(422)->setJSON([
                'ok'     => false,
                'error'  => 'Please review the highlighted fields and try again.',
                'errors' => $this->validator->getErrors(),
            ]);
        }

        $config = config('Email');

        // Con SMTPHost en el .env se envia por SMTP; sin el, mail() del
        // servidor. El .env manda sin que la configuracion base cambie.
        if ($config->SMTPHost !== '' && $config->protocol !== 'smtp') {
            $config->protocol = 'smtp';
        }

        $name     = trim((string) $payload['name']);
        $email    = trim((string) $payload['email']);
        $whatsapp = trim((string) $payload['whatsapp']);
        $treatment = trim((string) $payload['treatment']);

        $mailer = service('email');
        $mailer->setFrom($config->fromEmail, $config->fromName);
        $mailer->setTo($this->splitAddresses($config->recipients));
        $mailer->setReplyTo($email, $name);
        $mailer->setSubject(sprintf('Luna Spa - Booking request: %s - %s', $treatment, $name));
        $mailer->setMailType('html');
        $mailer->setMessage($this->buildMessage($payload, $config->fromName));

        if (! $mailer->send()) {
            return $this->response->setStatusCode(500)->setJSON([
                'ok'    => false,
                'error' => 'We could not send your request. Please try again or contact us on WhatsApp.',
            ]);
        }

        // Constancia para el webmaster: correo aparte, no BCC. Se envia desde
        // la cuenta SMTP autenticada (keconecte@gmail.com) para que el receptor
        // lo vea autenticado (SPF/DKIM/DMARC de gmail.com) en vez de caer en
        // spam por el From info@sayulitatravel.com sin firma DKIM.
        // Ojo: send() limpia asunto, cuerpo, headers y destinatarios tras cada
        // envio, hay que volver a montar el mensaje completo.
        // Si falla no se responde error: el correo principal ya salio y
        // reintentar lo duplicaria; el fallo queda en el log.
        if ($bcc = $this->splitAddresses($config->bcc)) {
            $mailer->setFrom($config->SMTPUser !== '' ? $config->SMTPUser : $config->fromEmail, $config->fromName);
            $mailer->setTo($bcc);
            $mailer->setReplyTo($email, $name);
            $mailer->setSubject(sprintf('Luna Spa - Booking request: %s - %s', $treatment, $name));
            $mailer->setMailType('html');
            $mailer->setMessage($this->buildMessage($payload, $config->fromName));

            if (! $mailer->send()) {
                log_message('error', 'Bookings: no se pudo enviar la constancia a [{bcc}]: {err}', [
                    'bcc' => implode(', ', $bcc),
                    'err' => $mailer->printDebugger(['headers']),
                ]);
            }
        }

        return $this->response->setStatusCode(201)->setJSON([
            'ok'   => true,
            'note' => 'Your request has been sent. We will confirm availability shortly.',
        ]);
    }

    /**
     * "a@x.com, b@y.com" -> ['a@x.com', 'b@y.com'] ignorando huecos.
     *
     * @return list<string>
     */
    private function splitAddresses(string $raw): array
    {
        return array_values(array_filter(array_map('trim', explode(',', $raw))));
    }

    private function buildMessage(array $p, string $siteName): string
    {
        $rows = [
            'Treatment'      => (string) ($p['treatment'] ?? ''),
            'Name'           => (string) ($p['name'] ?? ''),
            'Email'          => (string) ($p['email'] ?? ''),
            'WhatsApp'       => (string) ($p['whatsapp'] ?? ''),
            'Location'       => (string) ($p['location'] ?? ''),
            'Preferred date' => (string) ($p['preferred_date'] ?? ''),
            'Notes'          => (string) ($p['notes'] ?? ''),
            'Page'           => (string) ($p['page'] ?? ''),
        ];

        $cells = '';
        foreach ($rows as $label => $value) {
            $value = $value === '' ? '&mdash;' : htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
            $cells .= sprintf(
                '<tr><td style="padding:8px 14px;border:1px solid #dbe4ea;color:#5b6b78;'
                . 'font:600 13px/1.4 Arial,sans-serif;text-transform:uppercase;letter-spacing:.06em;">%s</td>'
                . '<td style="padding:8px 14px;border:1px solid #dbe4ea;color:#0f2a3d;'
                . 'font:15px/1.5 Arial,sans-serif;">%s</td></tr>',
                htmlspecialchars($label, ENT_QUOTES, 'UTF-8'),
                $value
            );
        }

        $meta = sprintf(
            'Received %s (IP %s)',
            date('Y-m-d H:i:s T'),
            $this->request->getIPAddress()
        );

        return '<div style="background:#f4f8fa;padding:22px;">'
            . '<p style="margin:0 0 14px;font:700 12px/1.4 Arial,sans-serif;letter-spacing:.14em;'
            . 'text-transform:uppercase;color:#087f9a;">' . htmlspecialchars($siteName, ENT_QUOTES, 'UTF-8') . ' - New booking request</p>'
            . '<table style="border-collapse:collapse;background:#fff;border:1px solid #dbe4ea;">'
            . $cells
            . '</table>'
            . '<p style="margin:12px 0 0;font:12px/1.5 Arial,sans-serif;color:#8a97a3;">'
            . htmlspecialchars($meta, ENT_QUOTES, 'UTF-8') . '</p>'
            . '</div>';
    }
}
