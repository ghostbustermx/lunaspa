<?= $this->extend('dashboard/layout') ?>
<?php
    $isNew  = $post === null;
    $action = $isNew
        ? base_url('dashboard/posts/save')
        : base_url("dashboard/posts/{$post['id']}/save");
    $listTypes = ['ul', 'ol'];
?>

<?= $this->section('content') ?>

<div class="ls-card__head" style="border:0;padding:0 0 18px">
    <h2 style="margin:0;font-size:21px"><?= $isNew ? 'Nuevo articulo' : 'Editando articulo' ?></h2>
    <div class="ls-actions" style="margin-left:auto">
        <?php if (! $isNew): ?>
            <a class="ls-btn ls-btn--ghost ls-btn--sm" target="_blank" rel="noopener"
               href="<?= base_url("dashboard/posts/{$post['id']}/preview") ?>">Vista previa</a>
        <?php endif; ?>
        <a class="ls-btn ls-btn--ghost ls-btn--sm" href="<?= base_url('dashboard') ?>">Cancelar</a>
    </div>
</div>

<form action="<?= $action ?>" method="post" enctype="multipart/form-data" id="postForm">
    <?= csrf_field() ?>

    <?php if (! $isNew): ?>
        <input type="hidden" name="id" value="<?= esc($post['id']) ?>">
    <?php endif; ?>

    <div class="ls-card">
        <div class="ls-card__head"><h2>Contenido principal</h2></div>
        <div class="ls-card__body">

            <div class="ls-field">
                <label for="title">Titulo (H1)</label>
                <input type="text" id="title" name="title" required
                       value="<?= esc(old('title') ?? $post['title'] ?? '') ?>">
            </div>

            <div class="ls-grid-2">
                <div class="ls-field">
                    <label for="slug">Slug (URL)</label>
                    <input type="text" id="slug" name="slug"
                           value="<?= esc(old('slug') ?? $post['slug'] ?? '') ?>">
                    <small>Se genera solo si lo dejas vacio. Debe ser unico.</small>
                </div>
                <div class="ls-field">
                    <label for="eyebrow">Antetitulo (eyebrow)</label>
                    <input type="text" id="eyebrow" name="eyebrow"
                           value="<?= esc(old('eyebrow') ?? $post['eyebrow'] ?? '') ?>">
                    <small>Ej.: Wellness · Travel</small>
                </div>
            </div>

            <div class="ls-field">
                <label for="lead">Entradilla</label>
                <textarea id="lead" name="lead" style="min-height:80px"><?= esc(old('lead') ?? $post['lead'] ?? '') ?></textarea>
                <small>Se usa como descripcion SEO cuando el campo de SEO esta vacio.</small>
            </div>

            <div class="ls-field">
                <label for="photo_image">Imagen de la portada</label>
                <?php $photoUrl = \App\Libraries\ImageUpload::url($post['photo_image'] ?? null); ?>
                <?php if ($photoUrl !== null): ?>
                    <div class="ls-thumb">
                        <img src="<?= esc($photoUrl) ?>" alt="Imagen de portada actual">
                    </div>
                <?php endif; ?>
                <input type="file" id="photo_image" name="photo_image"
                       accept="image/jpeg,image/png,image/webp">
                <small>JPG, PNG o WEBP hasta 8 MB. Se convierte a WEBP, se reescala a 2000 px y se optimifica automaticamente. Reemplaza el degradado de la portada.</small>
                <?php if ($photoUrl !== null): ?>
                    <div class="ls-check ls-check--tight">
                        <input type="checkbox" id="photo_image_remove" name="photo_image_remove" value="1">
                        <label for="photo_image_remove">Quitar la imagen actual</label>
                    </div>
                <?php endif; ?>
            </div>

            <div class="ls-field">
                <label for="photo_label">Texto de la imagen decorativa</label>
                <input type="text" id="photo_label" name="photo_label"
                       value="<?= esc(old('photo_label') ?? $post['photo_label'] ?? '') ?>">
                <small>Se muestra sobre el degradado de la portada. Ej.: Wellness in Sayulita</small>
            </div>

        </div>
    </div>

    <div class="ls-spacer"></div>

    <div class="ls-card">
        <div class="ls-card__head"><h2>Cuerpo del articulo</h2></div>
        <div class="ls-card__body">

            <p class="ls-muted" style="margin-top:0">
                Los bloques se guardan en el orden en que aparecen. En las listas escribe
                <b>un elemento por linea</b>.
            </p>

            <div id="blocks">
                <?php foreach ($blocks as $i => $b): ?>
                    <div class="ls-block" data-block>
                        <div class="ls-block__bar">
                            <span class="ls-block__idx">Bloque <?= $i + 1 ?></span>
                            <select name="blocks[<?= $i ?>][type]" data-type>
                                <?php foreach ($types as $t): ?>
                                    <option value="<?= esc($t) ?>" <?= $b['type'] === $t ? 'selected' : '' ?>>
                                        <?= esc(strtoupper($t)) ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                            <button class="ls-btn ls-btn--danger ls-btn--sm" type="button" data-remove
                                    style="margin-left:auto">Quitar</button>
                        </div>
                        <div data-text-wrap>
                            <textarea name="blocks[<?= $i ?>][text]"
                                      placeholder="Texto del bloque"><?= esc($b['text'] ?? '') ?></textarea>
                        </div>
                        <div data-items-wrap hidden>
                            <textarea name="blocks[<?= $i ?>][items]"
                                      placeholder="Un elemento por linea"><?= esc($b['items'] ?? '') ?></textarea>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

            <button class="ls-btn ls-btn--ghost ls-btn--sm" type="button" data-add>+ Anadir bloque</button>
        </div>
    </div>

    <div class="ls-spacer"></div>

    <div class="ls-card">
        <div class="ls-card__head"><h2>Bloque de enlaces internos</h2></div>
        <div class="ls-card__body">

            <div class="ls-grid-2">
                <div class="ls-field">
                    <label for="internal_title">Titulo</label>
                    <input type="text" id="internal_title" name="internal_title"
                           value="<?= esc(old('internal_title') ?? $post['internal_title'] ?? '') ?>">
                </div>
                <div class="ls-field">
                    <label for="internal_text">Texto</label>
                    <input type="text" id="internal_text" name="internal_text"
                           value="<?= esc(old('internal_text') ?? $post['internal_text'] ?? '') ?>">
                </div>
            </div>

            <div id="links">
                <?php foreach ($links as $i => $l): ?>
                    <div class="ls-rowflex" data-link>
                        <input type="text" name="links[<?= $i ?>][label]" placeholder="Texto del enlace"
                               value="<?= esc($l['label']) ?>">
                        <input type="text" name="links[<?= $i ?>][url]" placeholder="/in-home-massage"
                               value="<?= esc($l['url']) ?>">
                        <button class="ls-btn ls-btn--danger ls-btn--sm" type="button" data-remove>Quitar</button>
                    </div>
                <?php endforeach; ?>
            </div>

            <button class="ls-btn ls-btn--ghost ls-btn--sm" type="button" data-add>+ Anadir enlace</button>
        </div>
    </div>

    <div class="ls-spacer"></div>

    <div class="ls-card">
        <div class="ls-card__head"><h2>Tarjeta del listado</h2></div>
        <div class="ls-card__body">

            <div class="ls-field">
                <label for="card_title">Titulo de la tarjeta</label>
                <input type="text" id="card_title" name="card_title"
                       value="<?= esc(old('card_title') ?? $post['card_title'] ?? '') ?>">
                <small>Si lo dejas vacio se usa el titulo del articulo.</small>
            </div>

            <div class="ls-field">
                <label for="card_text">Texto de la tarjeta</label>
                <input type="text" id="card_text" name="card_text"
                       value="<?= esc(old('card_text') ?? $post['card_text'] ?? '') ?>">
                <small>Si lo dejas vacio se usa la entradilla.</small>
            </div>

            <div class="ls-field">
                <label for="card_img">Texto de imagen de la tarjeta</label>
                <input type="text" id="card_img" name="card_img"
                       value="<?= esc(old('card_img') ?? $post['card_img'] ?? '') ?>">
            </div>

            <div class="ls-grid-2">
                <div class="ls-field">
                    <label for="category">Categoria (filtro)</label>
                    <select id="category" name="category">
                        <?php foreach ($categories as $c): ?>
                            <option value="<?= esc($c) ?>"
                                <?= (old('category') ?? $post['category'] ?? 'wellness') === $c ? 'selected' : '' ?>>
                                <?= esc($c) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="ls-field">
                    <label for="sort_order">Orden</label>
                    <input type="number" id="sort_order" name="sort_order" min="0"
                           value="<?= esc(old('sort_order') ?? $post['sort_order'] ?? 0) ?>">
                    <small>Menor numero aparece primero.</small>
                </div>
            </div>

            <div class="ls-field ls-check">
                <input type="checkbox" id="is_featured" name="is_featured" value="1"
                    <?= (int) (old('is_featured') ?? $post['is_featured'] ?? 0) === 1 ? 'checked' : '' ?>>
                <label for="is_featured">Mostrar como tarjeta destacada (grande)</label>
            </div>
        </div>
    </div>

    <div class="ls-spacer"></div>

    <div class="ls-card">
        <div class="ls-card__head"><h2>Firma, CTA y SEO</h2></div>
        <div class="ls-card__body">

            <div class="ls-grid-2">
                <div class="ls-field">
                    <label for="author_name">Firma — nombre</label>
                    <input type="text" id="author_name" name="author_name"
                           value="<?= esc(old('author_name') ?? $post['author_name'] ?? 'Luna Spa') ?>">
                </div>
                <div class="ls-field">
                    <label for="author_role">Firma — descripcion</label>
                    <input type="text" id="author_role" name="author_role"
                           value="<?= esc(old('author_role') ?? $post['author_role'] ?? '') ?>">
                </div>
            </div>

            <div class="ls-grid-2">
                <div class="ls-field">
                    <label for="cta_heading">CTA — titulo</label>
                    <input type="text" id="cta_heading" name="cta_heading"
                           value="<?= esc(old('cta_heading') ?? $post['cta_heading'] ?? '') ?>">
                </div>
                <div class="ls-field">
                    <label for="cta_text">CTA — texto</label>
                    <input type="text" id="cta_text" name="cta_text"
                           value="<?= esc(old('cta_text') ?? $post['cta_text'] ?? '') ?>">
                </div>
            </div>

            <div class="ls-grid-2">
                <div class="ls-field">
                    <label for="cta_label">CTA — texto del boton</label>
                    <input type="text" id="cta_label" name="cta_label"
                           value="<?= esc(old('cta_label') ?? $post['cta_label'] ?? '') ?>">
                </div>
                <div class="ls-field">
                    <label for="cta_url">CTA — destino</label>
                    <input type="text" id="cta_url" name="cta_url"
                           value="<?= esc(old('cta_url') ?? $post['cta_url'] ?? '') ?>">
                </div>
            </div>

            <div class="ls-grid-2">
                <div class="ls-field">
                    <label for="meta_title">Titulo SEO</label>
                    <input type="text" id="meta_title" name="meta_title"
                           value="<?= esc(old('meta_title') ?? $post['meta_title'] ?? '') ?>">
                </div>
                <div class="ls-field">
                    <label for="og_image">Imagen para redes (og:image)</label>
                    <input type="text" id="og_image" name="og_image"
                           value="<?= esc(old('og_image') ?? $post['og_image'] ?? '') ?>">
                </div>
            </div>

            <div class="ls-field">
                <label for="meta_description">Descripcion SEO</label>
                <input type="text" id="meta_description" name="meta_description"
                       value="<?= esc(old('meta_description') ?? $post['meta_description'] ?? '') ?>">
            </div>

            <div class="ls-grid-2">
                <div class="ls-field">
                    <label for="status">Estado</label>
                    <select id="status" name="status">
                        <?php foreach ($statuses as $s): ?>
                            <option value="<?= esc($s) ?>"
                                <?= (old('status') ?? $post['status'] ?? 'published') === $s ? 'selected' : '' ?>>
                                <?= esc($s) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="ls-field">
                    <label>&nbsp;</label>
                    <div class="ls-actions">
                        <button class="ls-btn ls-btn--primary" type="submit">Guardar articulo</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</form>

<template id="tpl-block">
    <div class="ls-block" data-block>
        <div class="ls-block__bar">
            <span class="ls-block__idx">Bloque N</span>
            <select name="blocks[__I__][type]" data-type>
                <?php foreach ($types as $t): ?>
                    <option value="<?= esc($t) ?>"><?= esc(strtoupper($t)) ?></option>
                <?php endforeach; ?>
            </select>
            <button class="ls-btn ls-btn--danger ls-btn--sm" type="button" data-remove
                    style="margin-left:auto">Quitar</button>
        </div>
        <div data-text-wrap>
            <textarea name="blocks[__I__][text]" placeholder="Texto del bloque"></textarea>
        </div>
        <div data-items-wrap hidden>
            <textarea name="blocks[__I__][items]" placeholder="Un elemento por linea"></textarea>
        </div>
    </div>
</template>

<template id="tpl-link">
    <div class="ls-rowflex" data-link>
        <input type="text" name="links[__I__][label]" placeholder="Texto del enlace">
        <input type="text" name="links[__I__][url]" placeholder="/in-home-massage">
        <button class="ls-btn ls-btn--danger ls-btn--sm" type="button" data-remove>Quitar</button>
    </div>
</template>

<script>
(function () {
    var LIST = ['ul', 'ol'];

    function syncBlock(block) {
        var type = block.querySelector('[data-type]').value;
        var text = block.querySelector('[data-text-wrap]');
        var items = block.querySelector('[data-items-wrap]');
        var isList = LIST.indexOf(type) !== -1;
        text.hidden = isList;
        items.hidden = !isList;
    }

    function renumber(container, itemAttr, labelSelector) {
        var nodes = container.querySelectorAll('[' + itemAttr + ']');
        nodes.forEach(function (node, i) {
            node.querySelectorAll('input, select, textarea').forEach(function (field) {
                field.name = field.name.replace(/\[\d+\]/, '[' + i + ']');
            });
            var label = node.querySelector(labelSelector);
            if (label) { label.textContent = 'Bloque ' + (i + 1); }
        });
    }

    function wire(container, itemAttr, tplId, labelSelector) {
        var add = container.parentElement.querySelector('[data-add]');
        var tpl = document.getElementById(tplId);
        var next = container.querySelectorAll('[' + itemAttr + ']').length;

        add.addEventListener('click', function () {
            var html = tpl.innerHTML.replace(/__I__/g, String(next));
            var temp = document.createElement('div');
            temp.innerHTML = html.trim();
            var node = temp.firstElementChild;
            container.appendChild(node);
            next++;
            if (node.querySelector('[data-type]')) { syncBlock(node); }
        });

        container.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-remove]');
            if (!btn) { return; }
            e.preventDefault();
            var node = btn.closest('[' + itemAttr + ']');
            if (container.querySelectorAll('[' + itemAttr + ']').length <= 1) { return; }
            node.remove();
            renumber(container, itemAttr, labelSelector);
        });

        if (itemAttr === 'data-block') {
            container.addEventListener('change', function (e) {
                if (e.target.matches('[data-type]')) { syncBlock(e.target.closest('[data-block]')); }
            });
        }
    }

    var blocks = document.getElementById('blocks');
    var links  = document.getElementById('links');

    blocks.querySelectorAll('[data-block]').forEach(syncBlock);
    wire(blocks, 'data-block', 'tpl-block', '.ls-block__idx');
    wire(links,  'data-link',  'tpl-link',  null);
})();
</script>

<?= $this->endSection() ?>
