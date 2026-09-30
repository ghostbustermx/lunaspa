<?= $this->extend('dashboard/layout') ?>

<?= $this->section('content') ?>

<div class="ls-card__head" style="border:0;padding:0 0 18px">
    <h2 style="margin:0;font-size:21px">Vista previa</h2>
    <div class="ls-actions" style="margin-left:auto">
        <span class="ls-pill ls-pill--<?= esc($post['status']) ?>"><?= esc($post['status']) ?></span>
        <a class="ls-btn ls-btn--ghost ls-btn--sm" href="<?= base_url("dashboard/posts/{$post['id']}/edit") ?>">Editar</a>
        <?php if (($user['is_admin'] ?? false) === true): ?>
            <a class="ls-btn ls-btn--ghost ls-btn--sm" href="<?= base_url("api/posts/{$post['slug']}") ?>"
               target="_blank" rel="noopener">Ver como JSON</a>
        <?php endif; ?>
    </div>
</div>

<div class="ls-hint-box">
    Asi se vera el articulo en el blog. El contenido sale de la base de datos, exactamente
    como lo consumira el frontend React en <code>/blog/<?= esc($post['slug']) ?></code>.
</div>

<div class="ls-card">
    <div class="ls-card__body">
        <article class="wg-article">
            <section>
                <div class="wg-article-hero">
                    <div>
                        <div class="wg-eyebrow"><?= esc($post['eyebrow'] ?? '') ?></div>
                        <h1><?= esc($post['title']) ?></h1>
                        <p><?= esc($post['lead'] ?? '') ?></p>
                    </div>
                    <div class="wg-photo">
                        <?php $previewPhoto = \App\Libraries\ImageUpload::url($post['photo_image'] ?? null); ?>
                        <?php if ($previewPhoto !== null): ?>
                            <img class="wg-photo-img" src="<?= esc($previewPhoto) ?>"
                                 alt="<?= esc($post['photo_label'] ?? $post['title']) ?>">
                        <?php else: ?>
                            <?= esc($post['photo_label'] ?? '') ?>
                        <?php endif; ?>
                    </div>
                </div>

                <div class="wg-body">
                    <?php foreach ($post['body'] as $block): ?>
                        <?php if ($block['type'] === 'ul'): ?>
                            <ul><?php foreach ($block['items'] as $item): ?><li><?= esc($item) ?></li><?php endforeach; ?></ul>
                        <?php elseif ($block['type'] === 'ol'): ?>
                            <ol><?php foreach ($block['items'] as $item): ?><li><?= esc($item) ?></li><?php endforeach; ?></ol>
                        <?php elseif ($block['type'] === 'h2'): ?>
                            <h2><?= esc($block['text']) ?></h2>
                        <?php elseif ($block['type'] === 'h3'): ?>
                            <h3><?= esc($block['text']) ?></h3>
                        <?php elseif ($block['type'] === 'quote'): ?>
                            <blockquote><?= esc($block['text']) ?></blockquote>
                        <?php else: ?>
                            <p><?= esc($block['text']) ?></p>
                        <?php endif; ?>
                    <?php endforeach; ?>

                    <?php if (($post['internal_title'] ?? '') !== '' || $post['internal']['links'] !== []): ?>
                        <div class="wg-internal">
                            <h3><?= esc($post['internal_title'] ?? '') ?></h3>
                            <p><?= esc($post['internal_text'] ?? '') ?></p>
                            <?php foreach ($post['internal']['links'] as $link): ?>
                                <a href="<?= esc($link['to']) ?>"><?= esc($link['label']) ?></a>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>

                <div class="wg-signature">
                    <strong><?= esc($post['author_name'] ?? 'Luna Spa') ?></strong>
                    <em><?= esc($post['author_role'] ?? '') ?></em>
                </div>

                <?php if (($post['cta_heading'] ?? '') !== ''): ?>
                    <div class="wg-article-cta">
                        <h3><?= esc($post['cta_heading']) ?></h3>
                        <p><?= esc($post['cta_text'] ?? '') ?></p>
                        <a class="wg-btn wg-btn-primary" href="<?= esc($post['cta_url'] ?? '#') ?>">
                            <?= esc($post['cta_label'] ?? '') ?>
                        </a>
                    </div>
                <?php endif; ?>
            </section>
        </article>
    </div>
</div>

<?= $this->endSection() ?>
