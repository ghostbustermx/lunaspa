<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// -----------------------------------------------------------------
// API publica: alimenta el frontend React
// -----------------------------------------------------------------
// El filtro 'cors' se aplica en Filters.php como global (solo api/*). Se
// declaran rutas OPTIONS explicitas porque el preflight del navegador no
// coincide con las rutas GET y, sin ellas, responderia 404.
$routes->group('api', [], static function (RouteCollection $routes): void {
    $routes->get('posts',            'Api\Posts::index');
    $routes->get('posts/(:segment)', 'Api\Posts::show/$1');
    $routes->options('posts',            'Api\Posts::index');
    $routes->options('posts/(:segment)', 'Api\Posts::show/$1');

    // Reseñas. El POST es el alta desde /reviews-score y no publica nada:
    // toda alta entra como 'pending' y la decide el dashboard.
    $routes->get('reviews',         'Api\Reviews::index');
    $routes->post('reviews',        'Api\Reviews::store');
    $routes->options('reviews',      'Api\Reviews::index');
});

// -----------------------------------------------------------------
// Dashboard
// -----------------------------------------------------------------
$routes->get('dashboard/login',  'Dashboard\Auth::index');
$routes->post('dashboard/login', 'Dashboard\Auth::attempt');
$routes->get('dashboard/logout', 'Dashboard\Auth::logout');
$routes->post('dashboard/logout', 'Dashboard\Auth::logout');

$routes->group('dashboard', ['filter' => 'auth'], static function (RouteCollection $routes): void {
    $routes->get('/',    'Dashboard\Posts::index',   ['as' => 'dashboard_home']);

    // Moderacion de comentarios. El boton "Comentarios" del menu apunta aqui.
    $routes->get('reviews',                  'Dashboard\Reviews::index',   ['as' => 'reviews_index']);
    $routes->get('reviews/(:num)',           'Dashboard\Reviews::show/$1', ['as' => 'reviews_show']);
    $routes->post('reviews/(:num)/moderate', 'Dashboard\Reviews::moderate/$1');
    $routes->post('reviews/(:num)/delete',   'Dashboard\Reviews::delete/$1');

    $routes->get('posts/new',            'Dashboard\Posts::new',     ['as' => 'posts_new']);
    $routes->post('posts/save',          'Dashboard\Posts::save');
    $routes->get('posts/(:num)/edit',    'Dashboard\Posts::edit/$1', ['as' => 'posts_edit']);
    $routes->post('posts/(:num)/save',   'Dashboard\Posts::save/$1');
    $routes->get('posts/(:num)/preview', 'Dashboard\Posts::preview/$1', ['as' => 'posts_preview']);
    $routes->post('posts/(:num)/delete', 'Dashboard\Posts::delete/$1');

    $routes->group('users', ['filter' => 'adminsonly'], static function (RouteCollection $routes): void {
        $routes->get('/',                 'Dashboard\Users::index',  ['as' => 'users_index']);
        $routes->get('new',               'Dashboard\Users::new',    ['as' => 'users_new']);
        $routes->post('save',             'Dashboard\Users::save');
        $routes->get('(:num)/edit',       'Dashboard\Users::edit/$1', ['as' => 'users_edit']);
        $routes->post('(:num)/save',      'Dashboard\Users::save/$1');
        $routes->post('(:num)/delete',    'Dashboard\Users::delete/$1');
        $routes->post('(:num)/password',  'Dashboard\Users::password/$1');
    });
});

$routes->get('/', 'Home::index');
