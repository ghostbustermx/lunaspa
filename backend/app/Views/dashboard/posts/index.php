<?= $this->extend('dashboard/layout') ?>

<?= $this->section('content') ?>

<div class="ls-stats">
    <div class="ls-stat"><b><?= esc($counts['total']) ?></b><span>Articulos</span></div>
    <div class="ls-stat"><b><?= esc($counts['published']) ?></b><span>Publicados</span></div>
    <div class="ls-stat"><b><?= esc($counts['draft']) ?></b><span>Borradores</span></div>
</div>

<div class="ls-card">
    <div class="ls-card__head">
        <h2>Articulos del blog</h2>
        <div class="ls-actions" style="margin-left:auto">
            <?php if (($user['is_admin'] ?? false) === true): ?>
                <a class="ls-btn ls-btn--ghost ls-btn--sm" href="<?= base_url('api/posts') ?>" target="_blank" rel="noopener">Ver API</a>
            <?php endif; ?>
            <a class="ls-btn ls-btn--primary ls-btn--sm" href="<?= base_url('dashboard/posts/new') ?>">+ Nuevo articulo</a>
        </div>
    </div>

    <div class="ls-card__body" style="padding:0">
        <?php if ($posts === []): ?>
            <p class="ls-muted" style="padding:22px;margin:0">
                Todavia no hay articulos. Crea el primero o ejecuta el seeder para volcar el contenido actual.
            </p>
        <?php else: ?>
        <table class="ls-table">
            <thead>
            <tr>
                <th>Titulo</th>
                <th>Slug</th>
                <th>Categoria</th>
                <th>Estado</th>
                <th>Orden</th>
                <th>Actualizado</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <?php foreach ($posts as $p): ?>
                <tr>
                    <td class="ls-title-cell">
                        <b><?= esc($p['title']) ?></b>
                        <small><?= esc($p['eyebrow'] ?? '') ?></small>
                    </td>
                    <td><code>/blog/<?= esc($p['slug']) ?></code></td>
                    <td class="ls-nowrap"><?= esc($p['category']) ?></td>
                    <td>
                        <span class="ls-pill ls-pill--<?= esc($p['status']) ?>"><?= esc($p['status']) ?></span>
                        <?php if ((int) $p['is_featured'] === 1): ?>
                            <span class="ls-pill ls-pill--star">destacado</span>
                        <?php endif; ?>
                    </td>
                    <td><?= esc($p['sort_order']) ?></td>
                    <td class="ls-nowrap ls-muted"><?= esc($p['updated_at'] ?? '—') ?></td>
                    <td>
                        <div class="ls-actions" style="flex-wrap:nowrap">
                            <a class="ls-btn ls-btn--ghost ls-btn--sm" href="<?= base_url("dashboard/posts/{$p['id']}/edit") ?>">Editar</a>
                            <a class="ls-btn ls-btn--ghost ls-btn--sm" href="<?= base_url("dashboard/posts/{$p['id']}/preview") ?>" target="_blank" rel="noopener">Vista previa</a>
                            <form action="<?= base_url("dashboard/posts/{$p['id']}/delete") ?>" method="post"
                                  onsubmit="return confirm('Eliminar este articulo y todos sus bloques?')">
                                <?= csrf_field() ?>
                                <button class="ls-btn ls-btn--danger ls-btn--sm" type="submit">Borrar</button>
                            </form>
                        </div>
                    </td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
        <?php endif; ?>
    </div>
</div>

<?= $this->endSection() ?>
