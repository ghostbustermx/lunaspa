<?= $this->extend('dashboard/layout') ?>

<?= $this->section('content') ?>

<div class="ls-card">
    <div class="ls-card__head">
        <h2>Usuarios del dashboard</h2>
        <div class="ls-actions" style="margin-left:auto">
            <a class="ls-btn ls-btn--primary ls-btn--sm" href="<?= base_url('dashboard/users/new') ?>">+ Nuevo usuario</a>
        </div>
    </div>

    <div class="ls-card__body" style="padding:0">
        <table class="ls-table">
            <thead>
            <tr>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Ultimo acceso</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <?php foreach ($users as $u): ?>
                <tr>
                    <td>
                        <b style="color:var(--ls-navy)"><?= esc($u['username']) ?></b>
                        <?php if ((int) $u['id'] === (int) $user['id']): ?>
                            <small class="ls-muted">(tu)</small>
                        <?php endif; ?>
                    </td>
                    <td class="ls-muted"><?= esc($u['email']) ?></td>
                    <td><span class="ls-pill ls-pill--<?= esc($u['role']) ?>"><?= esc($u['role']) ?></span></td>
                    <td>
                        <span class="ls-pill ls-pill--<?= (int) $u['is_active'] === 1 ? 'published' : 'draft' ?>">
                            <?= (int) $u['is_active'] === 1 ? 'activo' : 'inactivo' ?>
                        </span>
                    </td>
                    <td class="ls-nowrap ls-muted"><?= esc($u['last_login_at'] ?? 'nunca') ?></td>
                    <td>
                        <div class="ls-actions" style="flex-wrap:nowrap">
                            <a class="ls-btn ls-btn--ghost ls-btn--sm" href="<?= base_url("dashboard/users/{$u['id']}/edit") ?>">Editar</a>
                            <?php if ((int) $u['id'] !== (int) $user['id']): ?>
                                <form action="<?= base_url("dashboard/users/{$u['id']}/delete") ?>" method="post"
                                      onsubmit="return confirm('Eliminar este usuario?')">
                                    <?= csrf_field() ?>
                                    <button class="ls-btn ls-btn--danger ls-btn--sm" type="submit">Borrar</button>
                                </form>
                            <?php endif; ?>
                        </div>
                    </td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>

<?= $this->endSection() ?>
