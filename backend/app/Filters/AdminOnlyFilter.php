<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

/**
 * Restringe una ruta a usuarios con rol 'admin'.
 */
class AdminOnlyFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        /** @var \App\Libraries\Auth $auth */
        $auth = service('auth');

        if ($auth->check() && $auth->isAdmin()) {
            return null;
        }

        return service('response')
            ->setStatusCode(403)
            ->setJSON(['error' => 'Se requiere rol de administrador.']);
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
    }
}
