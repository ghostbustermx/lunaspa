<?= $this->extend('dashboard/layout') ?>

<?= $this->section('content') ?>

<div class="ls-stats">
    <div class="ls-stat"><b><?= esc($stats['total']) ?></b><span>Comentarios</span></div>
    <div class="ls-stat"><b><?= esc($stats['pending']) ?></b><span>Por revisar</span></div>
    <div class="ls-stat"><b><?= esc($stats['published']) ?></b><span>Publicados</span></div>
    <div class="ls-stat"><b><?= esc($stats['rejected']) ?></b><span>Rechazados</span></div>
    <div class="ls-stat"><b><?= $stats['average'] > 0 ? esc($stats['average']) : '—' ?></b><span>Media publicada</span></div>
</div>

<nav class="ls-filters">
    <a href="<?= base_url('dashboard/reviews') ?>" class="<?= $status === null ? 'is-on' : '' ?>">Todos <b><?= esc($stats['total']) ?></b></a>
    <?php foreach ($statuses as $key => $label): ?>
        <a href="<?= base_url('dashboard/reviews?status=' . $key) ?>" class="<?= $status === $key ? 'is-on' : '' ?>">
            <?= esc($label) ?> <b><?= esc($stats[$key] ?? 0) ?></b>
        </a>
    <?php endforeach; ?>
</nav>

<div class="ls-card">
    <div class="ls-card__head">
        <h2>Comentarios de /reviews-score</h2>
        <div class="ls-actions" style="margin-left:auto">
            <a class="ls-btn ls-btn--ghost ls-btn--sm" href="<?= base_url('api/reviews') ?>" target="_blank" rel="noopener">Ver API</a>
        </div>
    </div>

    <div class="ls-card__body" style="padding:0">
        <?php if ($reviews === []): ?>
            <p class="ls-muted" style="padding:22px;margin:0">
                <?php if ($status === null): ?>
                    Todavia no ha llegado ningun comentario desde el formulario.
                <?php else: ?>
                    No hay comentarios en estado <?= esc($statuses[$status] ?? $status) ?>.
                <?php endif; ?>
            </p>
        <?php else: ?>
        <table class="ls-table">
            <thead>
            <tr>
                <th>Autor</th>
                <th>Comentario</th>
                <th>Puntaje</th>
                <th>Tratamiento</th>
                <th>Estado</th>
                <th>Recibido</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <?php foreach ($reviews as $r): ?>
                <tr>
                    <td class="ls-title-cell">
                        <b><?= esc($r['display_name']) ?></b>
                        <small><?= esc($r['location'] ?: '—') ?></small>
                    </td>
                    <td class="ls-title-cell">
                        <b><?= esc($r['title']) ?></b>
                        <small><?= esc(mb_strimwidth($r['body'], 0, 90, '…')) ?></small>
                    </td>
                    <td class="ls-nowrap"><b><?= esc(number_format((float) $r['score'], 1)) ?></b> / 5</td>
                    <td class="ls-nowrap"><?= esc($r['treatment'] ?: '—') ?></td>
                    <td>
                        <span class="ls-pill ls-pill--<?= esc($r['status']) ?>">
                            <?= esc($statuses[$r['status']] ?? $r['status']) ?>
                        </span>
                    </td>
                    <td class="ls-nowrap ls-muted"><?= esc($r['created_at'] ?? '—') ?></td>
                    <td>
                        <div class="ls-actions" style="flex-wrap:nowrap">
                            <a class="ls-btn ls-btn--primary ls-btn--sm" href="<?= base_url("dashboard/reviews/{$r['id']}") ?>">
                                <?= $r['status'] === 'pending' ? 'Revisar' : 'Ver' ?>
                            </a>
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
