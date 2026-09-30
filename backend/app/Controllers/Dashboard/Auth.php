<?php

namespace App\Controllers\Dashboard;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\RedirectResponse;
use Config\App;

class Auth extends BaseController
{
    public function __construct()
    {
        // El login debe ser accesible sin sesion previa.
    }

    public function index()
    {
        /** @var \App\Libraries\Auth $auth */
        $auth = service('auth');

        if ($auth->check()) {
            return redirect()->to(config(App::class)->baseURL . 'dashboard');
        }

        return view('dashboard/auth/login', [
            'title' => 'Iniciar sesion — Luna Spa',
        ]);
    }

    public function attempt(): RedirectResponse
    {
        $identifier = (string) $this->request->getPost('identifier');
        $password   = (string) $this->request->getPost('password');

        $result = service('auth')->attempt($identifier, $password);

        if ($result['ok']) {
            return redirect()->to(config(App::class)->baseURL . 'dashboard')
                ->with('success', 'Hola, ' . ($result['user']['full_name'] ?: $result['user']['username']) . '.');
        }

        return redirect()->back()->withInput($this->request->getPost())->with('error', $result['message']);
    }

    public function logout(): RedirectResponse
    {
        service('auth')->logout();

        return redirect()->to(config(App::class)->baseURL . 'dashboard/login')
            ->with('success', 'Sesion cerrada.');
    }
}
