<?php

namespace App\Models;

use CodeIgniter\Model;

/**
 * Enlaces internos del bloque final de un articulo.
 */
class InternalLinkModel extends Model
{
    protected $table           = 'blog_internal_links';
    protected $returnType       = 'array';
    protected $useTimestamps    = true;
    protected $createdField     = 'created_at';
    protected $updatedField     = 'updated_at';
    protected $allowedFields    = ['post_id', 'position', 'label', 'url'];

    /**
     * @param list<array{label:string,url:string}> $links
     */
    public function replaceForPost(int $postId, array $links): void
    {
        $this->db->transStart();
        $this->where('post_id', $postId)->delete();

        $position = 0;

        foreach ($links as $link) {
            $label = trim((string) ($link['label'] ?? ''));
            $url   = trim((string) ($link['url'] ?? ''));

            if ($label === '' || $url === '') {
                continue;
            }

            $this->insert([
                'post_id'  => $postId,
                'position' => $position,
                'label'    => $label,
                'url'      => $url,
            ]);

            $position++;
        }

        $this->db->transComplete();
    }
}
