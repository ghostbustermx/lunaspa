<?php

use CodeIgniter\Database\Migration;

/**
 * Imagen decorativa de la portada de cada articulo.
 *
 * Se guarda separada de `photo_label` (el texto que se ve sobre el degradado)
 * para no cambiar el significado de los datos ya guardados: si no hay imagen,
 * el frontend sigue mostrando el texto como hasta ahora.
 */
class AddPostPhotoImage extends Migration
{
    public function up()
    {
        $this->forge->addColumn('blog_posts', [
            'photo_image' => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
        ]);
    }

    public function down()
    {
        $this->forge->dropColumn('blog_posts', 'photo_image');
    }
}
