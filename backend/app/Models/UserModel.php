<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table           = 'users';
    protected $returnType       = 'array';
    protected $useTimestamps    = true;
    protected $createdField     = 'created_at';
    protected $updatedField     = 'updated_at';
    protected $allowedFields    = [
        'username', 'email', 'password_hash', 'full_name', 'role', 'is_active',
        'last_login_at',
    ];

    protected $hidden = ['password_hash'];

    public const ROLES = ['admin', 'editor'];

    /**
     * Busca un usuario activo por identificador (usuario o correo).
     */
    public function findActiveBy(string $identifier): ?array
    {
        return $this
            ->groupStart()
            ->where('username', $identifier)
            ->orWhere('email', $identifier)
            ->groupEnd()
            ->where('is_active', 1)
            ->first();
    }

    public function usernameTaken(string $username, ?int $ignoreId = null): bool
    {
        $builder = $this->where('username', $username);

        if ($ignoreId !== null) {
            $builder->where('id !=', $ignoreId);
        }

        return $builder->countAllResults() > 0;
    }

    public function emailTaken(string $email, ?int $ignoreId = null): bool
    {
        $builder = $this->where('email', $email);

        if ($ignoreId !== null) {
            $builder->where('id !=', $ignoreId);
        }

        return $builder->countAllResults() > 0;
    }

    public function countAdmins(?int $ignoreId = null): int
    {
        $builder = $this->where('role', 'admin')->where('is_active', 1);

        if ($ignoreId !== null) {
            $builder->where('id !=', $ignoreId);
        }

        return $builder->countAllResults();
    }

    public function touchLogin(int $id): void
    {
        $this->update($id, ['last_login_at' => date('Y-m-d H:i:s')]);
    }

    /**
     * Guarda la contrasena hasheada. Nunca se almacena en claro.
     */
    public function updatePassword(int $id, string $plain): void
    {
        $this->update($id, ['password_hash' => password_hash($plain, PASSWORD_DEFAULT)]);
    }
}
