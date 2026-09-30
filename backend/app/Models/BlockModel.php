<?php

namespace App\Models;

use CodeIgniter\Model;

/**
 * Bloques de cuerpo de un articulo. Solo 'p', 'h2' y 'ul' existen hoy en el
 * frontend; el resto se soportan para que el editor pueda ampliar el formato.
 */
class BlockModel extends Model
{
    protected $table           = 'blog_blocks';
    protected $returnType       = 'array';
    protected $useTimestamps    = true;
    protected $createdField     = 'created_at';
    protected $updatedField     = 'updated_at';
    protected $allowedFields    = ['post_id', 'position', 'type', 'text', 'items'];

    public const TYPES = ['p', 'h2', 'h3', 'ul', 'ol', 'quote'];

    public const LIST_TYPES = ['ul', 'ol'];

    /**
     * Convierte una fila de la BD al formato que espera el frontend.
     */
    public function toArray(array $row): array
    {
        if (in_array($row['type'], self::LIST_TYPES, true)) {
            $items = json_decode((string) $row['items'], true);

            return [
                'type'  => $row['type'],
                'items' => is_array($items) ? array_values($items) : [],
            ];
        }

        return [
            'type' => $row['type'],
            'text' => (string) $row['text'],
        ];
    }

    /**
     * Reemplaza todos los bloques de un post de forma atomica.
     *
     * @param list<array{type:string,text?:?string,items?:?list<string>}> $blocks
     */
    public function replaceForPost(int $postId, array $blocks): void
    {
        $this->db->transStart();
        $this->where('post_id', $postId)->delete();

        $position = 0;

        foreach ($blocks as $block) {
            $type = strtolower(trim((string) ($block['type'] ?? 'p')));

            if (! in_array($type, self::TYPES, true)) {
                $type = 'p';
            }

            $isList = in_array($type, self::LIST_TYPES, true);

            $text  = $isList ? null : trim((string) ($block['text'] ?? ''));
            $items = null;

            if ($isList) {
                $clean = [];

                foreach ((array) ($block['items'] ?? []) as $item) {
                    $item = trim((string) $item);

                    if ($item !== '') {
                        $clean[] = $item;
                    }
                }

                $items = json_encode($clean, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            }

            if (($isList && $items === null) || (! $isList && $text === '')) {
                continue;
            }

            $this->insert([
                'post_id'  => $postId,
                'position' => $position,
                'type'     => $type,
                'text'     => $text,
                'items'    => $items,
            ]);

            $position++;
        }

        $this->db->transComplete();
    }
}
