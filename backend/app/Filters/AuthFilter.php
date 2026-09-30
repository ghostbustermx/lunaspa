<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Config\App;

/**
 * Exige una sesion valida para entrar al dashboard.
 */
class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        /** @var \App\Libraries\Auth $auth */
        $auth = service('auth');

        if ($auth->check()) {
            return null;
        }

        if ($request->isAJAX() || str_starts_with((string) $request->getPath(), 'api/')) {
            return service('response')
                ->setStatusCode(401)
                ->setJSON(['error' => 'No autenticado.']);
        }

        $base = config(App::class)->baseURL;

        return redirect()->to($base . 'dashboard/login')
            ->with('error', 'Inicia sesion para continuar.');
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
    }
}
