<?= $this->extend('dashboard/layout') ?>
<?php $isNew = $row === null; ?>

<?= $this->section('content') ?>

<div class="ls-card__head" style="border:0;padding:0 0 18px">
    <h2 style="margin:0;font-size:21px"><?= $isNew ? 'Nuevo usuario' : 'Editando ' . esc($row['username']) ?></h2>
    <div class="ls-actions" style="margin-left:auto">
        <a class="ls-btn ls-btn--ghost ls-btn--sm" href="<?= base_url('dashboard/users') ?>">Volver</a>
    </div>
</div>

<div class="ls-card">
    <div class="ls-card__body">

        <form action="<?= $isNew ? base_url('dashboard/users/save') : base_url("dashboard/users/{$row['id']}/save") ?>" method="post">
            <?= csrf_field() ?>

            <div class="ls-grid-2">
                <div class="ls-field">
                    <label for="username">Usuario</label>
                    <input type="text" id="username" name="username" required
                           value="<?= esc(old('username') ?? $row['username'] ?? '') ?>">
                </div>
                <div class="ls-field">
                    <label for="email">Correo</label>
                    <input type="email" id="email" name="email" required
                           value="<?= esc(old('email') ?? $row['email'] ?? '') ?>">
                </div>
            </div>

            <div class="ls-field">
                <label for="full_name">Nombre completo</label>
                <input type="text" id="full_name" name="full_name"
                       value="<?= esc(old('full_name') ?? $row['full_name'] ?? '') ?>">
            </div>

            <div class="ls-field">
                <label for="password"><?= $isNew ? 'Contrasena' : 'Nueva contrasena (opcional)' ?></label>
                <input type="password" id="password" name="password" <?= $isNew ? 'required' : '' ?>
                       autocomplete="new-password" minlength="8">
                <small>Minimo 8 caracteres. <?= $isNew ? '' : 'Dejalo vacio para no cambiarla.' ?></small>
            </div>

            <div class="ls-grid-2">
                <div class="ls-field">
                    <label for="role">Rol</label>
                    <select id="role" name="role">
                        <?php foreach ($roles as $r): ?>
                            <option value="<?= esc($r) ?>" <?= (old('role') ?? $row['role'] ?? 'editor') === $r ? 'selected' : '' ?>>
                                <?= esc($r) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                    <small>Solo <b>admin</b> puede gestionar usuarios.</small>
                </div>
                <div class="ls-field">
                    <label>&nbsp;</label>
                    <div class="ls-check" style="padding-top:8px">
                        <input type="checkbox" id="is_active" name="is_active" value="1"
                            <?= (int) (old('is_active') ?? $row['is_active'] ?? 1) === 1 ? 'checked' : '' ?>>
                        <label for="is_active">Cuenta activa</label>
                    </div>
                </div>
            </div>

            <div class="ls-actions">
                <button class="ls-btn ls-btn--primary" type="submit">Guardar usuario</button>
            </div>
        </form>

    </div>
</div>

<?= $this->endSection() ?>
