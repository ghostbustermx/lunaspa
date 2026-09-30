<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Libraries\ImageUpload;
use App\Models\PostModel;
use CodeIgniter\API\RESTResponse;
use CodeIgniter\HTTP\ResponseInterface;

/**
 * API publica que alimenta el frontend React.
 *
 * GET /api/posts              -> tarjetas del listado + filtros disponibles
 * GET /api/posts/{slug}       -> articulo completo con bloques y enlaces
 */
class Posts extends BaseController
{
    public function index(): ResponseInterface
    {
        $posts = (new PostModel())->publishedAll();

        $cards = array_map(static function (array $p): array {
            return [
                'id'       => (int) $p['id'],
                'slug'     => $p['slug'],
                'cat'      => $p['category'],
                'featured' => (bool) $p['is_featured'],
                'img'      => $p['card_img'] ?: $p['photo_label'] ?: '',
                'photoImage' => ImageUpload::url($p['photo_image'] ?? null),
                'catLabel' => $p['eyebrow'] ?: '',
                'title'    => $p['card_title'] ?: $p['title'],
                'text'     => $p['card_text'] ?: $p['lead'],
                // El frontend ordena y recorta el listado por fecha, asi que la
                // tarjeta la necesita. Es un campo nuevo: los consumidores
                // actuales lo ignoran sin romperse.
                'publishedAt' => $p['published_at'],
                'to'       => '/blog/' . $p['slug'],
            ];
        }, $posts);

        return $this->response->setJSON([
            'data' => $cards,
            'meta' => [
                'total'      => count($cards),
                'filters'    => PostModel::CATEGORIES,
                'generated'  => date('c'),
            ],
        ]);
    }

    public function show(string $slug): ResponseInterface
    {
        $post = (new PostModel())->findBySlug($slug);

        if ($post === null) {
            return $this->response->setStatusCode(404)->setJSON([
                'error'  => 'Articulo no encontrado.',
                'slug'   => $slug,
            ]);
        }

        return $this->response->setJSON(['data' => $this->present($post)]);
    }

    /**
     * Normaliza una fila de la BD al contrato que consume el frontend.
     */
    private function present(array $p): array
    {
        $title = (string) $p['title'];

        return [
            'id'        => (int) $p['id'],
            'slug'      => $p['slug'],
            'eyebrow'   => $p['eyebrow'] ?? '',
            'title'     => $title,
            'lead'      => $p['lead'] ?? '',
            'photo'     => $p['photo_label'] ?? '',
            // URL completa de la imagen de portada, o null si el articulo no
            // tiene una. El frontend cae en 'photo' cuando llega vacio.
            'photoImage' => ImageUpload::url($p['photo_image'] ?? null),
            'body'      => $p['body'] ?? [],
            'internal'  => [
                'title' => $p['internal_title'] ?? '',
                'text'  => $p['internal_text'] ?? '',
                'links' => $p['internal']['links'] ?? [],
            ],
            'signature' => [
                'name' => $p['author_name'] ?? 'Luna Spa',
                'role' => $p['author_role'] ?? '',
            ],
            'cta'       => [
                'heading' => $p['cta_heading'] ?? '',
                'text'    => $p['cta_text'] ?? '',
                'label'   => $p['cta_label'] ?? '',
                'to'      => $p['cta_url'] ?? '',
            ],
            'seo'       => [
                'title'       => $p['meta_title'] ?: ($title . ' — Luna Spa'),
                'description' => $p['meta_description'] ?: ($p['lead'] ?? ''),
                'ogImage'     => $p['og_image'] ?? null,
            ],
            'card'      => [
                'cat'      => $p['category'],
                'featured' => (bool) $p['is_featured'],
                'img'      => $p['card_img'] ?? '',
                'catLabel' => $p['eyebrow'] ?? '',
                'title'    => $p['card_title'] ?: $title,
                'text'     => $p['card_text'] ?? ($p['lead'] ?? ''),
            ],
            'publishedAt' => $p['published_at'],
            'updatedAt'   => $p['updated_at'],
        ];
    }
}
