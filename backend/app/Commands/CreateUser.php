<?php

namespace App\Commands;

use App\Models\UserModel;
use CodeIgniter\CLI\BaseCommand;
use CodeIgniter\CLI\CLI;

/**
 * Crea un usuario del dashboard desde la terminal.
 *
 * Existe porque el panel se protege con sesion y, en una base de datos nueva,
 * no hay forma de entrar para crear el primer usuario desde la web. Es el
 * unico punto de acceso inicial, asi que no se expone por HTTP: solo corre con
 * `php spark users:create`.
 *
 *   php spark users:create
 *   php spark users:create --role=editor
 *   docker compose exec web php spark users:create --username=admin --email=... --name=... --password=... --password-confirm=...
 *
 * Todos los valores se pueden pasar por opcion para correrlo sin terminal
 * interactiva; si faltan, se preguntan.
 */
class CreateUser extends BaseCommand
{
    protected $group       = 'Users';
    protected $name        = 'users:create';
    protected $description = 'Crea un usuario para el dashboard (admin o editor).';
    protected $usage       = 'users:create [--username=] [--email=] [--name=] [--password=] [--password-confirm=] [--role=admin|editor]';
    protected $arguments   = [];
    protected $options     = [
        '--username'         => 'Identificador para iniciar sesion. Sin espacios.',
        '--email'            => 'Correo. Sirve tambien como identificador.',
        '--name'             => 'Nombre completo que aparece en el panel.',
        '--password'         => 'Contrasena. Si se omite se pregunta y se ve al escribir.',
        '--password-confirm' => 'Repite la contrasena para no confirmarla a ciegas.',
        '--role'             => 'admin (todo el panel) o editor (sin gestion de usuarios).',
    ];

    public function run(array $params)
    {
        $users = new UserModel();

        $username = $this->value('username', 'Usuario');
        $email    = $this->value('email', 'Correo electronico');
        $name     = $this->value('name', 'Nombre completo', ['— usar el usuario —']);
        $role     = $this->value('role', 'Rol', UserModel::ROLES, 'admin');

        if ($name === '— usar el usuario —') {
            $name = $username;
        }

        $givenPassword = CLI::getOption('password');
        $givenConfirm  = CLI::getOption('password-confirm');

        $password = (string) ($givenPassword ?? '');

        if ($password === '') {
            $password = (string) CLI::prompt(
                'Contrasena (se vera mientras escribes)',
                null,
                'required|min_length[10]'
            );
        }

        $confirm = (string) ($givenConfirm ?? '');

        if ($confirm === '') {
            // Pasando la contrasena por opcion, un error de tecleo no se
            // detecta al escribirla. Se pide la confirmacion tambien por
            // opcion, en vez de dar un "no coinciden" que no encaja con lo que
            // el usuario ha hecho.
            if ($givenPassword !== null) {
                CLI::error('--password necesita tambien --password-confirm. O deja las dos opciones fuera y se preguntan por terminal.');

                return 1;
            }

            $confirm = (string) CLI::prompt('Repite la contrasena', null, 'required');
        }

        if (! hash_equals($password, $confirm)) {
            CLI::error('La contrasena y su confirmacion no coinciden.');

            return 1;
        }

        if (strlen($password) < 10) {
            CLI::error('La contrasena necesita al menos 10 caracteres.');

            return 1;
        }

        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            CLI::error("El correo no es valido: {$email}");

            return 1;
        }

        if (! preg_match('/^[A-Za-z0-9._-]{3,60}$/', $username)) {
            CLI::error('El usuario admite de 3 a 60 caracteres: letras, numeros, punto, guion y guion bajo.');

            return 1;
        }

        if ($users->usernameTaken($username)) {
            CLI::error("El usuario '{$username}' ya existe.");

            return 1;
        }

        if ($users->emailTaken($email)) {
            CLI::error("El correo {$email} ya esta registrado.");

            return 1;
        }

        $id = $users->insert([
            'username'      => $username,
            'email'         => $email,
            'password_hash' => password_hash($password, PASSWORD_DEFAULT),
            'full_name'     => $name !== '' ? $name : $username,
            'role'          => $role,
            'is_active'     => 1,
        ]);

        if ($id === false) {
            CLI::error('No se pudo guardar el usuario. Revisa writable/logs.');

            return 1;
        }

        CLI::write();
        CLI::success("Usuario creado (id {$id}).");
        CLI::write("  usuario: {$username}");
        CLI::write("  correo:  {$email}");
        CLI::write("  rol:     {$role}");

        return 0;
    }

    /**
     * Devuelve la opcion ya pasada o, si falta, la pregunta por terminal.
     *
     * @param list<string>|null $choices Valores aceptados; el primero es el defecto.
     */
    private function value(string $option, string $label, ?array $choices = null): string
    {
        $given = CLI::getOption($option);

        if (is_string($given) && trim($given) !== '') {
            $value = trim($given);

            if ($choices !== null && ! in_array($value, $choices, true)) {
                CLI::error("El valor '{$value}' no es valido para --{$option}. Usa: " . implode(', ', $choices) . '.');

                exit(1);
            }

            return $value;
        }

        return CLI::prompt($label, $choices, 'required');
    }
}
