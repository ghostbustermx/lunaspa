<?php

use CodeIgniter\Database\Migration;

/**
 * Esquema del Dashboard de Luna Spa.
 *
 * users               -> operadores con acceso al dashboard
 * blog_posts          -> cabecera de cada articulo (metadatos, SEO, tarjeta, firma, CTA)
 * blog_blocks         -> bloques de cuerpo ordenados (p, h2, h3, ul, ol, quote)
 * blog_internal_links -> enlaces internos del bloque final de cada articulo
 */
class CreateLunaSpaTables extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'            => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'username'      => ['type' => 'VARCHAR', 'constraint' => 60],
            'email'         => ['type' => 'VARCHAR', 'constraint' => 190],
            'password_hash' => ['type' => 'VARCHAR', 'constraint' => 255],
            'full_name'     => ['type' => 'VARCHAR', 'constraint' => 120, 'null' => true],
            'role'          => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'editor'],
            'is_active'     => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 1],
            'last_login_at' => ['type' => 'DATETIME', 'null' => true],
            'created_at'    => ['type' => 'DATETIME', 'null' => true],
            'updated_at'    => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('username');
        $this->forge->addUniqueKey('email');
        $this->forge->createTable('users', true);

        $this->forge->addField([
            'id'               => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'slug'             => ['type' => 'VARCHAR', 'constraint' => 190],
            'title'            => ['type' => 'VARCHAR', 'constraint' => 255],
            'eyebrow'          => ['type' => 'VARCHAR', 'constraint' => 120, 'null' => true],
            'lead'             => ['type' => 'TEXT', 'null' => true],
            'photo_label'      => ['type' => 'VARCHAR', 'constraint' => 120, 'null' => true],
            'category'         => ['type' => 'VARCHAR', 'constraint' => 40, 'default' => 'wellness'],
            'card_title'       => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'card_text'        => ['type' => 'VARCHAR', 'constraint' => 400, 'null' => true],
            'card_img'         => ['type' => 'VARCHAR', 'constraint' => 120, 'null' => true],
            'is_featured'      => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 0],
            'status'           => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'published'],
            'sort_order'       => ['type' => 'INT', 'constraint' => 11, 'default' => 0],
            'published_at'     => ['type' => 'DATETIME', 'null' => true],
            'meta_title'       => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'meta_description' => ['type' => 'VARCHAR', 'constraint' => 400, 'null' => true],
            'og_image'         => ['type' => 'VARCHAR', 'constraint' => 400, 'null' => true],
            'author_name'      => ['type' => 'VARCHAR', 'constraint' => 120, 'null' => true],
            'author_role'      => ['type' => 'VARCHAR', 'constraint' => 190, 'null' => true],
            'internal_title'   => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'internal_text'    => ['type' => 'VARCHAR', 'constraint' => 400, 'null' => true],
            'cta_heading'      => ['type' => 'VARCHAR', 'constraint' => 190, 'null' => true],            'cta_text'         => ['type' => 'VARCHAR', 'constraint' => 400, 'null' => true],
            'cta_label'        => ['type' => 'VARCHAR', 'constraint' => 120, 'null' => true],
            'cta_url'          => ['type' => 'VARCHAR', 'constraint' => 400, 'null' => true],
            'created_at'       => ['type' => 'DATETIME', 'null' => true],
            'updated_at'       => ['type' => 'DATETIME', 'null' => true],
            'created_by'       => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'null' => true],
            'updated_by'       => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('slug');
        $this->forge->addKey(['status', 'sort_order']);
        $this->forge->createTable('blog_posts', true);

        $this->forge->addField([
            'id'         => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'post_id'    => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true],
            'position'   => ['type' => 'INT', 'constraint' => 11, 'default' => 0],
            'type'       => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'p'],
            'text'       => ['type' => 'TEXT', 'null' => true],
            'items'      => ['type' => 'TEXT', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey(['post_id', 'position']);
        $this->forge->addForeignKey('post_id', 'blog_posts', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('blog_blocks', true);

        $this->forge->addField([
            'id'         => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'post_id'    => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true],
            'position'   => ['type' => 'INT', 'constraint' => 11, 'default' => 0],
            'label'      => ['type' => 'VARCHAR', 'constraint' => 190],
            'url'        => ['type' => 'VARCHAR', 'constraint' => 400],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey(['post_id', 'position']);
        $this->forge->addForeignKey('post_id', 'blog_posts', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('blog_internal_links', true);
    }

    public function down()
    {
        $this->forge->dropTable('blog_internal_links', true);
        $this->forge->dropTable('blog_blocks', true);
        $this->forge->dropTable('blog_posts', true);
        $this->forge->dropTable('users', true);
    }
}
