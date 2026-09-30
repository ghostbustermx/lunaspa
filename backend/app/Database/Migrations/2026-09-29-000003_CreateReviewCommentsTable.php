<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

/**
 * Reseñas enviadas desde /reviews-score.
 *
 * El formulario público no decide nada: todo entra con status 'pending' y el
 * equipo lo publica o lo rechaza desde el dashboard. La nota privada y el
 * correo se guardan para moderación y nunca se exponen en la API pública.
 */
class CreateReviewCommentsTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            // Una calificacion por area, de 1 a 5. Se guardan por separado para
            // poder mostrarlas desglosadas aunque el promedio se rederive.
            'rate_value' => ['type' => 'TINYINT', 'constraint' => 3, 'unsigned' => true, 'default' => 0],
            'rate_service' => ['type' => 'TINYINT', 'constraint' => 3, 'unsigned' => true, 'default' => 0],
            'rate_staff' => ['type' => 'TINYINT', 'constraint' => 3, 'unsigned' => true, 'default' => 0],
            'rate_karma' => ['type' => 'TINYINT', 'constraint' => 3, 'unsigned' => true, 'default' => 0],
            'rate_vibes' => ['type' => 'TINYINT', 'constraint' => 3, 'unsigned' => true, 'default' => 0],
            'score' => ['type' => 'DECIMAL', 'constraint' => [3, 1], 'default' => 0],
            'title' => ['type' => 'VARCHAR', 'constraint' => 90],
            'body' => ['type' => 'TEXT'],
            // Solo para el equipo. No sale nunca en la API publica.
            'private_note' => ['type' => 'TEXT', 'null' => true],
            'email' => ['type' => 'VARCHAR', 'constraint' => 190],
            'display_name' => ['type' => 'VARCHAR', 'constraint' => 50],
            'location' => ['type' => 'VARCHAR', 'constraint' => 80, 'null' => true],
            'experience_date' => ['type' => 'DATE', 'null' => true],
            // Lo asigna el moderador al publicar, para que la pagina de reviews
            // pueda filtrar por tipo de tratamiento.
            'treatment' => ['type' => 'VARCHAR', 'constraint' => 20, 'null' => true],
            'status' => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'pending'],
            'moderation_note' => ['type' => 'VARCHAR', 'constraint' => 400, 'null' => true],
            'published_at' => ['type' => 'DATETIME', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
            'moderated_by' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'null' => true],
            'moderated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);

        $this->forge->addKey('id', true);
        $this->forge->addKey(['status', 'created_at']);
        $this->forge->addKey('treatment');
        $this->forge->addKey('published_at');

        $this->forge->createTable('review_comments', true);
    }

    public function down()
    {
        $this->forge->dropTable('review_comments', true);
    }
}
