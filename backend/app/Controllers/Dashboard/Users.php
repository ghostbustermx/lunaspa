<?php

namespace App\Controllers\Dashboard;

use App\Controllers\BaseController;
use App\Models\UserModel;
use CodeIgniter\HTTP\RedirectResponse;

class Users extends BaseController
{
    private UserModel $users;

    public function __construct()
    {
        $this->users = new UserModel();
    }

    public function index()
    {
        return view('dashboard/users/index', [
            'title' => 'Usuarios — Luna Spa',
            'users' => $this->users->orderBy('id', 'ASC')->findAll(),
            'user'  => service('auth')->currentUser(),
        ]);
    }

    public function new()
    {
        return view('dashboard/users/form', [
            'title' => 'Nuevo usuario — Luna Spa',
            'row'   => null,
            'roles' => UserModel::ROLES,
            'user'  => service('auth')->currentUser(),
        ]);
    }

    public function edit(int $id)
    {
        $row = $this->users->find($id);

        if ($row === null) {
            return redirect()->to(base_url('dashboard/users'))->with('error', 'El usuario no existe.');
        }

        return view('dashboard/users/form', [
            'title' => 'Editar: ' . $row['username'] . ' — Luna Spa',
            'row'   => $row,
            'roles' => UserModel::ROLES,
            'user'  => service('auth')->currentUser(),
        ]);
    }

    public function save(?int $id = null): RedirectResponse
    {
        $row = $id === null ? null : $this->users->find($id);

        if ($id !== null && $row === null) {
            return redirect()->to(base_url('dashboard/users'))->with('error', 'El usuario no existe.');
        }

        $username = trim((string) $this->request->getPost('username'));
        $email    = trim((string) $this->request->getPost('email'));
        $fullName = $this->clean($this->request->getPost('full_name'));
        $role     = (string) $this->request->getPost('role');
        $isActive = $this->request->getPost('is_active') ? 1 : 0;
        $password = (string) $this->request->getPost('password');

        if ($username === '' || $email === '') {
            return redirect()->back()->withInput()->with('error', 'Usuario y correo son obligatorios.');
        }

        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return redirect()->back()->withInput()->with('error', 'El correo no tiene un formato valido.');
        }

        if (! in_array($role, UserModel::ROLES, true)) {
            $role = 'editor';
        }

        if ($this->users->usernameTaken($username, $id)) {
            return redirect()->back()->withInput()->with('error', 'Ese nombre de usuario ya esta en uso.');
        }

        if ($this->users->emailTaken($email, $id)) {
            return redirect()->back()->withInput()->with('error', 'Ese correo ya esta registrado.');
        }

        if ($row === null && strlen($password) < 8) {
            return redirect()->back()->withInput()->with('error', 'La contrasena debe tener al menos 8 caracteres.');
        }

        $data = [
            'username'  => $username,
            'email'     => $email,
            'full_name' => $fullName,
            'role'      => $role,
            'is_active' => $isActive,
        ];

        // No se deja al sistema sin ningun administrador activo.
        if ($row !== null && $row['role'] === 'admin' && ($role !== 'admin' || ! $isActive)) {
            if ($this->users->countAdmins((int) $row['id']) === 0) {
                return redirect()->back()->withInput()->with('error', 'Debe quedar al menos un administrador activo.');
            }
        }

        if ($row === null) {
            $data['password_hash'] = password_hash($password, PASSWORD_DEFAULT);
            $this->users->insert($data);
            $flash = 'Usuario creado.';
            $id    = $this->users->getInsertID();
        } else {
            if ($password !== '') {
                if (strlen($password) < 8) {
                    return redirect()->back()->withInput()->with('error', 'La contrasena debe tener al menos 8 caracteres.');
                }

                $this->users->updatePassword((int) $id, $password);
            }

            $this->users->update($id, $data);
            $flash = 'Usuario actualizado.';
        }

        return redirect()->to(base_url("dashboard/users/{$id}/edit"))->with('success', $flash);
    }

    public function password(int $id): RedirectResponse
    {
        $row = $this->users->find($id);

        if ($row === null) {
            return redirect()->to(base_url('dashboard/users'))->with('error', 'El usuario no existe.');
        }

        $password = (string) $this->request->getPost('password');

        if (strlen($password) < 8) {
            return redirect()->back()->with('error', 'La contrasena debe tener al menos 8 caracteres.');
        }

        $this->users->updatePassword($id, $password);

        return redirect()->to(base_url("dashboard/users/{$id}/edit"))->with('success', 'Contrasena actualizada.');
    }

    public function delete(int $id): RedirectResponse
    {
        $row = $this->users->find($id);

        if ($row === null) {
            return redirect()->to(base_url('dashboard/users'))->with('error', 'El usuario no existe.');
        }

        if ((int) $id === service('auth')->id()) {
            return redirect()->to(base_url('dashboard/users'))->with('error', 'No puedes eliminar tu propia cuenta.');
        }

        if ($row['role'] === 'admin' && $this->users->countAdmins($id) === 0) {
            return redirect()->to(base_url('dashboard/users'))->with('error', 'Debe quedar al menos un administrador activo.');
        }

        $this->users->delete($id);

        return redirect()->to(base_url('dashboard/users'))->with('success', 'Usuario eliminado.');
    }

    private function clean($value): ?string
    {
        $value = trim((string) $value);

        return $value === '' ? null : $value;
    }
}
