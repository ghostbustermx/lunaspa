<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\ReviewModel;
use CodeIgniter\HTTP\ResponseInterface;

/**
 * API publica de resenas.
 *
 * GET  /api/reviews   -> resenas publicadas (lo unico que sale del servidor)
 * POST /api/reviews   -> alta desde /reviews-score; siempre entra como 'pending'
 *
 * La moderacion no se expone aqui: cambiar el estado es cosa del dashboard.
 */
class Reviews extends BaseController
{
    /**
     * Campo trampa para bots. Se lee a mano porque el envio llega como JSON y
     * el filtro honeypot de CodeIgniter solo mira el cuerpo de formulario.
     */
    private const TRAP_FIELD = 'website';

    public function index(): ResponseInterface
    {
        $reviews = (new ReviewModel())->publishedAll();

        $data = array_map(static function (array $r): array {
            return [
                'id'       => (int) $r['id'],
                'score'    => (float) $r['score'],
                'ratings'  => [
                    'value'   => (int) $r['rate_value'],
                    'service' => (int) $r['rate_service'],
                    'staff'   => (int) $r['rate_staff'],
                    'karma'   => (int) $r['rate_karma'],
                    'vibes'   => (int) $r['rate_vibes'],
                ],
                'title'    => $r['title'],
                'body'     => $r['body'],
                'name'     => $r['display_name'],
                'location' => $r['location'] ?? '',
                'date'     => $r['experience_date'],
                'treatment' => $r['treatment'] ?? '',
                'publishedAt' => $r['published_at'],
            ];
        }, $reviews);

        return $this->response->setJSON([
            'data' => $data,
            'meta' => [
                'total'     => count($data),
                'filters'   => ReviewModel::TREATMENTS,
                'generated' => date('c'),
            ],
        ]);
    }

    public function store(): ResponseInterface
    {
        $payload = $this->request->getJSON(true);

        if (! is_array($payload)) {
            $payload = $this->request->getPost();
        }

        // Campo relleno = bot. Se responde 201 con el mismo cuerpo para no
        // darle pistas, pero no se guarda nada.
        if (trim((string) ($payload[self::TRAP_FIELD] ?? '')) !== '') {
            return $this->response->setStatusCode(201)->setJSON([
                'ok'   => true,
                'id'   => null,
                'note' => 'Tu resena quedo registrada para revision.',
            ]);
        }

        $rules = [
            'rate_value'   => 'required|integer|greater_than_equal_to[1]|less_than_equal_to[5]',
            'rate_service' => 'required|integer|greater_than_equal_to[1]|less_than_equal_to[5]',
            'rate_staff'   => 'required|integer|greater_than_equal_to[1]|less_than_equal_to[5]',
            'rate_karma'   => 'required|integer|greater_than_equal_to[1]|less_than_equal_to[5]',
            'rate_vibes'   => 'required|integer|greater_than_equal_to[1]|less_than_equal_to[5]',
            'title'        => 'required|trim|min_length[3]|max_length[90]',
            'body'         => 'required|trim|min_length[20]|max_length[1200]',
            'email'        => 'required|trim|valid_email|max_length[190]',
            'display_name' => 'required|trim|max_length[50]',
            'location'     => 'permit_empty|trim|max_length[80]',
            'experience_date' => 'required|valid_date',
            'private_note' => 'permit_empty|trim|max_length[600]',
        ];

        if (! $this->validate($rules, $payload)) {
            return $this->response->setStatusCode(422)->setJSON([
                'ok'     => false,
                'error'  => 'Revisa los campos marcados e intentalo de nuevo.',
                'errors' => $this->validator->getErrors(),
            ]);
        }

        $model = new ReviewModel();

        $ratings = [
            (int) $payload['rate_value'],
            (int) $payload['rate_service'],
            (int) $payload['rate_staff'],
            (int) $payload['rate_karma'],
            (int) $payload['rate_vibes'],
        ];

        $id = $model->insert([
            'rate_value'   => $ratings[0],
            'rate_service' => $ratings[1],
            'rate_staff'   => $ratings[2],
            'rate_karma'   => $ratings[3],
            'rate_vibes'   => $ratings[4],
            'score'        => $model->averageFrom($ratings),
            'title'        => trim((string) $payload['title']),
            'body'         => trim((string) $payload['body']),
            'private_note' => $this->clean($payload['private_note'] ?? null),
            'email'        => trim((string) $payload['email']),
            'display_name' => trim((string) $payload['display_name']),
            'location'     => $this->clean($payload['location'] ?? null),
            'experience_date' => $payload['experience_date'],
            // El filtro de la pagina publica lo elige el moderador al publicar.
            'treatment'    => null,
            'status'       => 'pending',
        ]);

        if ($id === false) {
            return $this->response->setStatusCode(500)->setJSON([
                'ok'    => false,
                'error' => 'No pudimos guardar tu resena. Intentalo de nuevo en un momento.',
            ]);
        }

        return $this->response->setStatusCode(201)->setJSON([
            'ok'   => true,
            'id'   => (int) $id,
            'note' => 'Tu resena quedo registrada para revision.',
        ]);
    }

    private function clean($value): ?string
    {
        $value = trim((string) $value);

        return $value === '' ? null : $value;
    }
}
