<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title><?= esc($title ?? 'Dashboard') ?></title>
    <link rel="stylesheet" href="<?= base_url('assets/dashboard/dashboard.css') ?>">
</head>
<body class="ls-body">

<header class="ls-top">
    <div class="ls-top__in">
        <a class="ls-brand" href="<?= base_url('dashboard') ?>">
            Luna Spa
            <span>Content Dashboard</span>
        </a>

        <nav class="ls-nav">
            <a href="<?= base_url('dashboard') ?>" class="<?= url_is('dashboard') ? 'is-on' : '' ?>">Articulos</a>
            <a href="<?= base_url('dashboard/reviews') ?>" class="<?= url_is('dashboard/reviews*') ? 'is-on' : '' ?>">Comentarios</a>
            <?php if (($user['is_admin'] ?? false) === true): ?>
                <a href="<?= base_url('dashboard/users') ?>" class="<?= url_is('dashboard/users*') ? 'is-on' : '' ?>">Usuarios</a>
            <?php endif; ?>
            <?php if (($user['is_admin'] ?? false) === true): ?>
                <a href="<?= base_url('api/posts') ?>" target="_blank" rel="noopener">API JSON</a>
            <?php endif; ?>
            <span class="ls-avatar" title="<?= esc($user['username'] ?? '') ?>"><?= esc($user['initials'] ?? '?') ?></span>
            <a href="<?= base_url('dashboard/logout') ?>">Salir</a>
        </nav>
    </div>
</header>

<main class="ls-wrap">
    <?php if ($success = session()->getFlashdata('success')): ?>
        <div class="ls-alert ls-alert--ok"><?= esc($success) ?></div>
    <?php endif; ?>
    <?php if ($error = session()->getFlashdata('error')): ?>
        <div class="ls-alert ls-alert--err"><?= esc($error) ?></div>
    <?php endif; ?>

    <?= $this->renderSection('content') ?>
</main>

</body>
</html>
