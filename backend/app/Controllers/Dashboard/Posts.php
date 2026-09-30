<?php

namespace App\Controllers\Dashboard;

use App\Controllers\BaseController;
use App\Libraries\ImageUpload;
use App\Models\BlockModel;
use App\Models\InternalLinkModel;
use App\Models\PostModel;
use CodeIgniter\HTTP\RedirectResponse;

class Posts extends BaseController
{
    private PostModel $posts;

    public function __construct()
    {
        $this->posts = new PostModel();
    }

    public function index()
    {
        return view('dashboard/posts/index', [
            'title'     => 'Articulos — Luna Spa',
            'posts'     => $this->posts->adminAll(),
            'user'      => service('auth')->currentUser(),
            'counts'    => $this->counts(),
        ]);
    }

    public function new()
    {
        return view('dashboard/posts/form', [
            'title'   => 'Nuevo articulo — Luna Spa',
            'post'    => null,
            'blocks'  => [['type' => 'p', 'text' => '', 'items' => '']],
            'links'   => [],
            'user'    => service('auth')->currentUser(),
            'types'   => BlockModel::TYPES,
            'statuses'=> PostModel::STATUSES,
            'categories' => PostModel::CATEGORIES,
        ]);
    }

    public function edit(int $id)
    {
        $post = $this->posts->findFull($id);

        if ($post === null) {
            return redirect()->to(base_url('dashboard'))->with('error', 'El articulo no existe.');
        }

        $blocks = array_map(static function (array $b): array {
            return [
                'type'  => $b['type'],
                'text'  => $b['text'] ?? '',
                'items' => isset($b['items']) ? implode("\n", $b['items']) : '',
            ];
        }, $post['body']);

        // El modelo expone los enlaces con la clave 'to'; el formulario los
        // manda de vuelta con 'url', de ahi el renombrado.
        $links = array_map(
            static fn (array $l): array => [
                'label' => $l['label'] ?? '',
                'url'   => $l['to'] ?? '',
            ],
            $post['internal']['links'] ?? []
        );

        return view('dashboard/posts/form', [
            'title'      => 'Editar: ' . $post['title'] . ' — Luna Spa',
            'post'       => $post,
            'blocks'     => $blocks === [] ? [['type' => 'p', 'text' => '', 'items' => '']] : $blocks,
            'links'      => $links,
            'user'       => service('auth')->currentUser(),
            'types'      => BlockModel::TYPES,
            'statuses'   => PostModel::STATUSES,
            'categories' => PostModel::CATEGORIES,
        ]);
    }

    public function save(?int $id = null): RedirectResponse
    {
        $post = $id === null ? null : $this->posts->find($id);

        if ($id !== null && $post === null) {
            return redirect()->to(base_url('dashboard'))->with('error', 'El articulo no existe.');
        }

        $title = trim((string) $this->request->getPost('title'));
        $slug  = trim((string) $this->request->getPost('slug'));

        if ($title === '') {
            return redirect()->back()->withInput()->with('error', 'El titulo es obligatorio.');
        }

        if ($slug === '') {
            $slug = $this->posts->uniqueSlug($title, $id);
        } elseif ($this->posts->slugExists($slug, $id)) {
            $slug = $this->posts->uniqueSlug($slug, $id);
        }

        $status = (string) $this->request->getPost('status');
        if (! in_array($status, PostModel::STATUSES, true)) {
            $status = 'draft';
        }

        $category = (string) $this->request->getPost('category');
        if (! in_array($category, PostModel::CATEGORIES, true)) {
            $category = 'wellness';
        }

        $userId = service('auth')->id();

        $photo = $this->handlePhotoImage($post);

        if ($photo['error'] !== null) {
            return redirect()->back()->withInput()->with('error', $photo['error']);
        }

        $data = [
            'slug'             => $slug,
            'title'            => $title,
            'eyebrow'          => $this->clean($this->request->getPost('eyebrow')),
            'lead'             => $this->clean($this->request->getPost('lead')),
            'photo_label'      => $this->clean($this->request->getPost('photo_label')),
            'photo_image'      => $photo['file'],
            'category'         => $category,
            'card_title'       => $this->clean($this->request->getPost('card_title')),
            'card_text'        => $this->clean($this->request->getPost('card_text')),
            'card_img'         => $this->clean($this->request->getPost('card_img')),
            'is_featured'      => $this->request->getPost('is_featured') ? 1 : 0,
            'status'           => $status,
            'sort_order'       => (int) $this->request->getPost('sort_order'),
            'meta_title'       => $this->clean($this->request->getPost('meta_title')),
            'meta_description' => $this->clean($this->request->getPost('meta_description')),
            'og_image'         => $this->clean($this->request->getPost('og_image')),
            'author_name'      => $this->clean($this->request->getPost('author_name')),
            'author_role'      => $this->clean($this->request->getPost('author_role')),
            'internal_title'   => $this->clean($this->request->getPost('internal_title')),
            'internal_text'    => $this->clean($this->request->getPost('internal_text')),
            'cta_heading'      => $this->clean($this->request->getPost('cta_heading')),
            'cta_text'         => $this->clean($this->request->getPost('cta_text')),
            'cta_label'        => $this->clean($this->request->getPost('cta_label')),
            'cta_url'          => $this->clean($this->request->getPost('cta_url')),
            'updated_by'       => $userId,
        ];

        if ($status === 'published' && ($post['published_at'] ?? null) === null) {
            $data['published_at'] = date('Y-m-d H:i:s');
        }

        if ($post === null) {
            $data['created_by'] = $userId;
            $id = $this->posts->insert($data);
            $flash = 'Articulo creado.';
        } else {
            $this->posts->update($id, $data);
            $flash = 'Articulo actualizado.';
        }

        (new BlockModel())->replaceForPost((int) $id, $this->collectBlocks());
        (new InternalLinkModel())->replaceForPost((int) $id, $this->collectLinks());

        return redirect()->to(base_url("dashboard/posts/{$id}/edit"))
            ->with('success', $flash);
    }

    public function delete(int $id): RedirectResponse
    {
        $post = $this->posts->find($id);

        if ($post === null) {
            return redirect()->to(base_url('dashboard'))->with('error', 'El articulo no existe.');
        }

        $this->posts->delete($id);

        return redirect()->to(base_url('dashboard'))->with('success', 'Articulo eliminado.');
    }

    /**
     * Vista previa con el mismo marcado que el frontend.
     */
    public function preview(int $id)
    {
        $post = $this->posts->findFull($id);

        if ($post === null) {
            return redirect()->to(base_url('dashboard'))->with('error', 'El articulo no existe.');
        }

        return view('dashboard/posts/preview', [
            'title' => 'Vista previa: ' . $post['title'],
            'post'  => $post,
            'user'  => service('auth')->currentUser(),
        ]);
    }

    /**
     * Resuelve la imagen de portada: guarda la nueva si se subio alguna, borra
     * la anterior si se pidio quitarla y conserva la actual si no se toco nada.
     *
     * El archivo recien subido se mueve antes de validar el resto del
     * formulario, asi que un fallo de validacion de la imagen no deja el
     * articulo a medias.
     *
     * @param  array<string,mixed>|null $post Post actual, null si es nuevo.
     * @return array{file:?string,error:?string}
     */
    private function handlePhotoImage(?array $post): array
    {
        $upload  = $this->request->getFile('photo_image');
        $current = $post['photo_image'] ?? null;
        $dropped = $this->request->getPost('photo_image_remove') !== null;

        if ($upload !== null && $upload->isFile() && ! $upload->hasMoved()) {
            $stored = ImageUpload::store($upload);

            if ($stored['ok'] === false) {
                return ['file' => null, 'error' => $stored['error']];
            }

            if ($current !== null) {
                ImageUpload::delete($current);
            }

            return ['file' => $stored['file'], 'error' => null];
        }

        // Sin marcar la casilla y sin subir archivo, la imagen actual se
        // conserva. La casilla solo aparece cuando hay algo que quitar.
        if ($dropped && $current !== null) {
            ImageUpload::delete($current);

            return ['file' => null, 'error' => null];
        }

        return ['file' => $current, 'error' => null];
    }

    /**
     * @return list<array{type:string,text:string,items:list<string>}>
     */
    private function collectBlocks(): array
    {
        $raw = (array) $this->request->getPost('blocks');
        $out = [];

        foreach ($raw as $block) {
            if (! is_array($block)) {
                continue;
            }

            $type = strtolower(trim((string) ($block['type'] ?? 'p')));

            $entry = ['type' => $type, 'text' => '', 'items' => []];

            if (in_array($type, BlockModel::LIST_TYPES, true)) {
                $entry['items'] = $this->splitLines((string) ($block['items'] ?? ''));
            } else {
                $entry['text'] = trim((string) ($block['text'] ?? ''));
            }

            $out[] = $entry;
        }

        return $out;
    }

    /**
     * @return list<array{label:string,url:string}>
     */
    private function collectLinks(): array
    {
        $raw = (array) $this->request->getPost('links');
        $out = [];

        foreach ($raw as $link) {
            if (! is_array($link)) {
                continue;
            }

            $out[] = [
                'label' => trim((string) ($link['label'] ?? '')),
                'url'   => trim((string) ($link['url'] ?? '')),
            ];
        }

        return $out;
    }

    /**
     * @return list<string>
     */
    private function splitLines(string $value): array
    {
        $lines = preg_split('/\r\n|\r|\n/', $value) ?: [];

        return array_values(array_filter(array_map('trim', $lines), static fn (string $l): bool => $l !== ''));
    }

    private function clean($value): ?string
    {
        $value = trim((string) $value);

        return $value === '' ? null : $value;
    }

    private function counts(): array
    {
        $all = $this->posts->findAll();

        return [
            'total'     => count($all),
            'published' => count(array_filter($all, static fn ($p) => $p['status'] === 'published')),
            'draft'     => count(array_filter($all, static fn ($p) => $p['status'] === 'draft')),
        ];
    }
}
