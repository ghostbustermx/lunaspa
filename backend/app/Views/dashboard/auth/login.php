<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title><?= esc($title ?? 'Iniciar sesion') ?></title>
    <link rel="stylesheet" href="<?= base_url('assets/dashboard/dashboard.css') ?>">
    <script src="<?= base_url('assets/dashboard/dashboard.js') ?>" defer></script>
</head>
<body class="ls-body">

<main class="ls-login">
    <div class="ls-login__box">
        <div class="ls-login__head">
            <h1>Luna Spa</h1>
            <p>Panel de contenido del blog</p>
        </div>

        <div class="ls-card">
            <div class="ls-card__body">
                <?php if ($success = session()->getFlashdata('success')): ?>
                    <div class="ls-alert ls-alert--ok"><?= esc($success) ?></div>
                <?php endif; ?>
                <?php if ($error = session()->getFlashdata('error')): ?>
                    <div class="ls-alert ls-alert--err"><?= esc($error) ?></div>
                <?php endif; ?>

                <form action="<?= base_url('dashboard/login') ?>" method="post">
                    <?= csrf_field() ?>

                    <div class="ls-field">
                        <label for="identifier">Usuario o correo</label>
                        <input type="text" id="identifier" name="identifier" required autofocus
                               autocomplete="username"
                               value="<?= esc(old('identifier') ?? '') ?>">
                    </div>

                    <div class="ls-field">
                        <label for="password">Contrasena</label>
                        <div class="ls-pass">
                            <input type="password" id="password" name="password" required
                                   autocomplete="current-password">
                            <button class="ls-pass__toggle" type="button" data-pass-toggle="password"
                                    data-visible="false" aria-pressed="false"
                                    aria-label="Mostrar contrasena" title="Mostrar contrasena">
                                <svg class="ls-eye" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                                     aria-hidden="true" focusable="false">
                                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                <svg class="ls-eye-off" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                                     aria-hidden="true" focusable="false">
                                    <path d="M10.6 6.2A9.9 9.9 0 0 1 12 6c6.5 0 10 6 10 6a17.6 17.6 0 0 1-3.2 3.9M6.3 6.4A17.6 17.6 0 0 0 2 12s3.5 6 10 6a9.7 9.7 0 0 0 4.1-.9"></path>
                                    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"></path>
                                    <line x1="3" y1="3" x2="21" y2="21"></line>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <button class="ls-btn ls-btn--primary" type="submit" style="width:100%">Entrar</button>
                </form>
            </div>
        </div>
    </div>
</main>

</body>
</html>
