<?php

namespace App\Models;

use CodeIgniter\Model;

/**
 * Articulos del blog. Cada post tiene bloques de cuerpo (blog_blocks) y
 * enlaces internos (blog_internal_links) que se cargan bajo demanda.
 */
class PostModel extends Model
{
    protected $table           = 'blog_posts';
    protected $returnType       = 'array';
    protected $useTimestamps    = true;
    protected $createdField     = 'created_at';
    protected $updatedField     = 'updated_at';
    protected $allowedFields    = [
        'slug', 'title', 'eyebrow', 'lead', 'photo_label', 'photo_image',
        'category', 'card_title', 'card_text', 'card_img', 'is_featured',
        'status', 'sort_order', 'published_at', 'meta_title',
        'meta_description', 'og_image', 'author_name', 'author_role',
        'internal_title', 'internal_text', 'cta_heading', 'cta_text',
        'cta_label', 'cta_url', 'published_at', 'created_by', 'updated_by',
    ];

    public const STATUSES   = ['draft', 'published'];
    public const CATEGORIES = ['wellness', 'sayulita', 'massage'];

    /**
     * Posts publicados ordenados como en el listado del frontend.
     */
    public function publishedAll(): array
    {
        return $this
            ->select('id, slug, title, eyebrow, lead, photo_label, photo_image,
                      category, card_title, card_text, card_img, is_featured,
                      sort_order, published_at, meta_title, meta_description,
                      og_image, author_name, author_role, internal_title,
                      internal_text, cta_heading, cta_text, cta_label, cta_url,
                      updated_at')
            ->where('status', 'published')
            ->orderBy('sort_order', 'ASC')
            ->orderBy('published_at', 'DESC')
            ->findAll();
    }

    /**
     * Todos los estados, para el dashboard.
     */
    public function adminAll(): array
    {
        return $this
            ->select('blog_posts.*, users.username AS updated_by_username')
            ->join('users', 'users.id = blog_posts.updated_by', 'left')
            ->orderBy('sort_order', 'ASC')
            ->orderBy('id', 'DESC')
            ->findAll();
    }

    public function findBySlug(string $slug, bool $publishedOnly = true): ?array
    {
        $builder = $this->where('slug', $slug);

        if ($publishedOnly) {
            $builder->where('status', 'published');
        }

        $post = $builder->first();

        if ($post === null) {
            return null;
        }

        return $this->hydrate($post);
    }

    public function findFull(int $id): ?array
    {
        $post = $this->find($id);

        return $post === null ? null : $this->hydrate($post);
    }

    /**
     * Adjunta bloques y enlaces internos, y normaliza al formato que consume
     * el frontend React.
     */
    public function hydrate(array $post): array
    {
        $blocks = (new BlockModel())->where('post_id', $post['id'])->orderBy('position', 'ASC')->findAll();
        $links  = (new InternalLinkModel())->where('post_id', $post['id'])->orderBy('position', 'ASC')->findAll();

        $body = [];
        foreach ($blocks as $block) {
            $body[] = (new BlockModel())->toArray($block);
        }

        $post['body']     = $body;
        $post['internal'] = [
            'title' => $post['internal_title'] ?? null,
            'text'  => $post['internal_text'] ?? null,
            'links' => array_map(
                static fn (array $l): array => ['label' => $l['label'], 'to' => $l['url']],
                $links
            ),
        ];

        return $post;
    }

    /**
     * Comprueba que el slug no este en uso por otro post.
     */
    public function slugExists(string $slug, ?int $ignoreId = null): bool
    {
        $builder = $this->where('slug', $slug);

        if ($ignoreId !== null) {
            $builder->where('id !=', $ignoreId);
        }

        return $builder->countAllResults() > 0;
    }

    /**
     * Genera un slug unico a partir de un titulo.
     */
    public function uniqueSlug(string $source, ?int $ignoreId = null): string
    {
        $base = strtolower(trim($source));
        $base = preg_replace('/[^a-z0-9]+/', '-', $base) ?? '';
        $base = trim($base, '-');

        if ($base === '') {
            $base = 'post';
        }

        $slug  = substr($base, 0, 180);
        $index = 2;

        while ($this->slugExists($slug, $ignoreId)) {
            $slug = substr($base, 0, 176) . '-' . $index;
            $index++;
        }

        return $slug;
    }
}
