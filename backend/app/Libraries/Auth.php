<?php

namespace App\Libraries;

use App\Models\UserModel;

use CodeIgniter\Session\Session;

/**
 * Autenticacion del dashboard.
 *
 * Las contrasenas nunca se guardan en claro: se almacena el hash de
 * password_hash() y la verificacion se hace con password_verify(),
 * re-hasheando si el algoritmo por defecto de PHP ha cambiado.
 */
class Auth
{
    public const SESSION_KEY = 'lunaspa_user';

    /** Intentos de login permitidos por usuario dentro de la ventana. */
    private const MAX_ATTEMPTS  = 5;
    private const LOCKOUT_MINS  = 15;
    private const THROTTLE_KEY   = 'lunaspa_login_attempts';

    private Session $session;
    private UserModel $users;

    public function __construct()
    {
        $this->session = session();
        $this->users   = new UserModel();
    }
    public function attempt(string $identifier, string $password): array
    {
        $identifier = trim($identifier);

        if ($identifier === '' || $password === '') {
            return $this->fail('Escribe tu usuario y tu contrasena.');
        }

        $throttle = $this->throttleState($identifier);

        if ($throttle['locked']) {
            return $this->fail(
                "Demasiados intentos fallidos. Intenta de nuevo en {$throttle['minutes']} minuto(s)."
            );
        }

        $user = $this->users->findActiveBy($identifier);

        // Se ejecuta password_verify() aunque el usuario no exista para que el
        // tiempo de respuesta no revele que identificadores estan dados de alta.
        $stored = $user['password_hash'] ?? '$2y$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinv';
        $valid  = password_verify($password, $stored);

        if ($user === null || ! $valid) {
            $this->recordFailure($identifier);

            return $this->fail('Usuario o contrasena incorrectos.');
        }

        if (password_needs_rehash($user['password_hash'], PASSWORD_DEFAULT)) {
            $this->users->updatePassword($user['id'], $password);
        }

        $this->clearFailures($identifier);
        $this->login($user);

        return ['ok' => true, 'user' => $this->currentUser()];
    }

    private function login(array $user): void
    {
        // Regenerar el ID de sesion evita el secuestro de sesion previo al login.
        $this->session->regenerate(true);

        $this->session->set(self::SESSION_KEY, [
            'id'            => (int) $user['id'],
            'username'      => $user['username'],
            'email'         => $user['email'],
            'full_name'     => $user['full_name'],
            'role'          => $user['role'],
            'logged_in_at'  => time(),
        ]);

        $this->users->touchLogin((int) $user['id']);
    }

    public function logout(): void
    {
        $this->session->remove(self::SESSION_KEY);
        $this->session->regenerate(true);
    }

    public function check(): bool
    {
        $data = $this->session->get(self::SESSION_KEY);

        if (! is_array($data) || ! isset($data['id'])) {
            return false;
        }

        // La sesion puede haber caducado si el usuario fue desactivado.
        $user = $this->users->findActiveBy((string) $data['username']);

        if ($user === null || (int) $user['id'] !== (int) $data['id']) {
            $this->logout();

            return false;
        }

        return true;
    }

    public function id(): ?int
    {
        $data = $this->session->get(self::SESSION_KEY);

        return is_array($data) ? (int) $data['id'] : null;
    }

    public function currentUser(): ?array
    {
        $data = $this->session->get(self::SESSION_KEY);

        if (! is_array($data)) {
            return null;
        }

        $data['id']       = (int) $data['id'];
        $data['is_admin'] = ($data['role'] ?? '') === 'admin';
        $data['initials'] = $this->initials((string) ($data['full_name'] ?: $data['username']));

        return $data;
    }

    public function isAdmin(): bool
    {
        return $this->currentUser()['is_admin'] ?? false;
    }

    private function initials(string $name): string
    {
        $parts = preg_split('/\s+/', trim($name)) ?: [];
        $out   = '';

        foreach (array_slice($parts, 0, 2) as $part) {
            $out .= mb_strtoupper(mb_substr($part, 0, 1));
        }

        return $out === '' ? '?' : $out;
    }

    /**
     * Control de intentos por identificador.
     *
     * @return array{attempts:int,locked:bool,minutes:int}
     */
    private function throttleState(string $identifier): array
    {
        $all      = (array) $this->session->get(self::THROTTLE_KEY);
        $attempts = $all[$identifier] ?? ['count' => 0, 'first' => time()];

        if (time() - (int) $attempts['first'] > self::LOCKOUT_MINS * 60) {
            unset($all[$identifier]);

            return ['attempts' => 0, 'locked' => false, 'minutes' => 0];
        }

        return [
            'attempts' => (int) $attempts['count'],
            'locked'   => (int) $attempts['count'] >= self::MAX_ATTEMPTS,
            'minutes'  => (int) ceil((self::LOCKOUT_MINS * 60 - (time() - (int) $attempts['first'])) / 60),
        ];
    }

    private function recordFailure(string $identifier): void
    {
        $all   = (array) $this->session->get(self::THROTTLE_KEY);
        $state = $all[$identifier] ?? ['count' => 0, 'first' => time()];
        $state['count']++;

        $all[$identifier] = $state;
        $this->session->set(self::THROTTLE_KEY, $all);
    }

    private function clearFailures(string $identifier): void
    {
        $all = (array) $this->session->get(self::THROTTLE_KEY);
        unset($all[$identifier]);
        $this->session->set(self::THROTTLE_KEY, $all);
    }

    private function fail(string $message): array
    {
        return ['ok' => false, 'message' => $message, 'user' => null];
    }
}
