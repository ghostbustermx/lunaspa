<?= $this->extend('dashboard/layout') ?>

<?= $this->section('content') ?>

<div class="ls-card__head" style="margin-bottom:18px">
    <h2>Comentario de <?= esc($review['display_name']) ?></h2>
    <div class="ls-actions" style="margin-left:auto">
        <a class="ls-btn ls-btn--ghost ls-btn--sm" href="<?= base_url('dashboard/reviews') ?>">← Volver</a>
    </div>
</div>

<div class="ls-stats">
    <div class="ls-stat">
        <b><?= esc(number_format((float) $review['score'], 1)) ?></b><span>Puntaje general</span>
    </div>
    <div class="ls-stat">
        <b><?= esc($statusLabels[$review['status']] ?? $review['status']) ?></b><span>Estado</span>
    </div>
    <div class="ls-stat">
        <b><?= esc($review['created_at'] ? date('d/m/Y', strtotime($review['created_at'])) : '—') ?></b>
        <span>Recibido</span>
    </div>
</div>

<div class="ls-card">
    <div class="ls-card__head">
        <h2><?= esc($review['title']) ?></h2>
        <div class="ls-actions" style="margin-left:auto">
            <span class="ls-pill ls-pill--<?= esc($review['status']) ?>">
                <?= esc($statusLabels[$review['status']] ?? $review['status']) ?>
            </span>
        </div>
    </div>
    <div class="ls-card__body">

        <p class="ls-quote"><?= esc($review['body']) ?></p>

        <div class="ls-meta">
            <span><b>Autor:</b> <?= esc($review['display_name']) ?></span>
            <span><b>Vive en:</b> <?= esc($review['location'] ?: 'no indicado') ?></span>
            <span><b>Correo:</b> <?= esc($review['email']) ?></span>
            <span><b>Fecha de la experiencia:</b> <?= esc($review['experience_date'] ?: '—') ?></span>
            <?php if (! empty($review['moderator_username'])): ?>
                <span><b>Moderado por:</b> <?= esc($review['moderator_username']) ?></span>
            <?php endif; ?>
        </div>

        <h3 style="font-size:14px;color:var(--ls-muted);text-transform:uppercase;letter-spacing:.1em">Calificaciones</h3>
        <?php foreach ($rateLabels as $field => $label): ?>
            <div class="ls-rate">
                <span><?= esc($label) ?></span>
                <b><?= str_repeat('★', (int) $review[$field]) ?><?= str_repeat('☆', 5 - (int) $review[$field]) ?></b>
            </div>
        <?php endforeach; ?>

        <?php if (! empty($review['private_note'])): ?>
            <div class="ls-hint-box" style="margin-top:18px">
                <b>Nota privada para el equipo</b> — nunca se publica.
                <div style="white-space:pre-wrap;margin-top:8px"><?= esc($review['private_note']) ?></div>
            </div>
        <?php endif; ?>

    </div>
</div>

<div class="ls-card" style="margin-top:20px">
    <div class="ls-card__head">
        <h2>Decision</h2>
    </div>
    <div class="ls-card__body">
        <form action="<?= base_url("dashboard/reviews/{$review['id']}/moderate") ?>" method="post">
            <?= csrf_field() ?>

            <label class="ls-field">
                <b>Estado</b>
                <select name="status">
                    <?php foreach ($statusLabels as $key => $label): ?>
                        <option value="<?= esc($key) ?>" <?= $review['status'] === $key ? 'selected' : '' ?>>
                            <?= esc($label) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </label>

            <label class="ls-field" style="display:block;margin-bottom:16px">
                <b>Filtrar en /reviews como</b>
                <select name="treatment">
                    <option value="">— Sin filtro (aparece en “Todos”) —</option>
                    <?php foreach ($treatments as $key): ?>
                        <option value="<?= esc($key) ?>" <?= $review['treatment'] === $key ? 'selected' : '' ?>>
                            <?= esc($treatmentLabels[$key]) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </label>

            <label class="ls-field" style="display:block;margin-bottom:18px">
                <b>Nota interna <small>(opcional)</small></b>
                <textarea name="moderation_note" rows="3" style="width:100%"><?= esc($review['moderation_note'] ?? '') ?></textarea>
            </label>

            <div class="ls-actions">
                <button class="ls-btn ls-btn--primary" type="submit">Guardar decision</button>
            </div>
        </form>

        <form action="<?= base_url("dashboard/reviews/{$review['id']}/delete") ?>" method="post" style="margin-top:18px"
              onsubmit="return confirm('Eliminar este comentario de forma permanente?')">
            <?= csrf_field() ?>
            <button class="ls-btn ls-btn--danger ls-btn--sm" type="submit">Eliminar comentario</button>
        </form>
    </div>
</div>

<?= $this->endSection() ?>
