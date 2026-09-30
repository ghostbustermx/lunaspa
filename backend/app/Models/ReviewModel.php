<?php

namespace App\Models;

use CodeIgniter\Model;

/**
 * Reseñas de /reviews-score.
 *
 * Toda alta entra como 'pending'. El dashboard decide si pasa a 'published'
 * (aparece en la página de reviews) o a 'rejected' (se conserva para poder
 * recuperarla, no se borra).
 */
class ReviewModel extends Model
{
    protected $table           = 'review_comments';
    protected $returnType       = 'array';
    protected $useTimestamps    = true;
    protected $createdField     = 'created_at';
    protected $updatedField     = 'updated_at';
    protected $allowedFields    = [
        'rate_value', 'rate_service', 'rate_staff', 'rate_karma', 'rate_vibes',
        'score', 'title', 'body', 'private_note', 'email', 'display_name',
        'location', 'experience_date', 'treatment', 'status',
        'moderation_note', 'published_at', 'moderated_by', 'moderated_at',
    ];

    public const STATUSES = ['pending', 'published', 'rejected'];

    public const STATUS_LABELS = [
        'pending'   => 'Pendiente',
        'published' => 'Publicada',
        'rejected'  => 'Rechazada',
    ];

    /** Los mismos filtros que usa la página pública de reviews. */
    public const TREATMENTS = ['home', 'couples', 'deep', 'group'];

    public const TREATMENT_LABELS = [
        'home'    => 'In-Home',
        'couples' => 'Couples',
        'deep'    => 'Deep Tissue',
        'group'   => 'Grupos',
    ];

    /** Etiquetas de las cinco areas del formulario, en el orden del prototipo. */
    public const RATE_LABELS = [
        'rate_value'   => 'Value for Money',
        'rate_service' => 'Service',
        'rate_staff'   => 'Staff',
        'rate_karma'   => 'Karma Points',
        'rate_vibes'   => 'Good Vibes',
    ];

    /**
     * Listado del dashboard, del mas reciente al mas antiguo.
     */
    public function adminAll(?string $status = null): array
    {
        $builder = $this->select('review_comments.*, users.username AS moderator_username')
            ->join('users', 'users.id = review_comments.moderated_by', 'left')
            ->orderBy('review_comments.id', 'DESC');

        if ($status !== null && in_array($status, self::STATUSES, true)) {
            $builder->where('review_comments.status', $status);
        }

        return $builder->findAll();
    }

    /**
     * Reseñas publicadas para la API publica.
     *
     * La seleccion es explicita: el correo, la nota privada y las notas de
     * moderacion se quedan en la base de datos. Asi no dependen de que alguien
     * recuerde quitar un campo del array.
     */
    public function publishedAll(): array
    {
        return $this
            ->select('id, rate_value, rate_service, rate_staff, rate_karma,
                      rate_vibes, score, title, body, display_name, location,
                      experience_date, treatment, published_at')
            ->where('status', 'published')
            ->orderBy('published_at', 'DESC')
            ->orderBy('id', 'DESC')
            ->findAll();
    }

    /**
     * Una reseña con el nombre de quien la moderó, para la pantalla de detalle.
     */
    public function findFull(int $id): ?array
    {
        return $this
            ->select('review_comments.*, users.username AS moderator_username')
            ->join('users', 'users.id = review_comments.moderated_by', 'left')
            ->find($id);
    }

    /**
     * Totales por estado para las tarjetas de resumen.
     *
     * @return array{total:int,pending:int,published:int,rejected:int,average:float}
     */
    public function stats(): array
    {
        $rows = $this->select('status, COUNT(*) AS total, AVG(score) AS average')
            ->groupBy('status')
            ->findAll();

        $stats = ['total' => 0, 'pending' => 0, 'published' => 0, 'rejected' => 0, 'average' => 0.0];

        foreach ($rows as $row) {
            $count = (int) $row['total'];
            $stats['total'] += $count;

            if (isset($stats[$row['status']])) {
                $stats[$row['status']] = $count;
            }
        }

        $published = $this->select('AVG(score) AS average')->where('status', 'published')->first();
        $stats['average'] = $published === null ? 0.0 : round((float) $published['average'], 1);

        return $stats;
    }

    /**
     * Promedio de las areas calificadas, redondeado a un decimal.
     *
     * @param list<int|string> $ratings
     */
    public function averageFrom(array $ratings): float
    {
        $values = array_values(array_filter(
            array_map(static fn ($v): int => (int) $v, $ratings),
            static fn (int $v): bool => $v > 0
        ));

        if ($values === []) {
            return 0.0;
        }

        return round(array_sum($values) / count($values), 1);
    }

    /**
     * Aplica una decision de moderacion.
     *
     * published_at marca la ultima vez que la resena se approve, asi que se
     * limpia al dejarla en pendiente o rechazada: una resena no publicada no
     * debe arrastrar una fecha de salida vieja.
     *
     * @return array{ok:bool,error:?string}
     */
    public function moderate(int $id, string $status, array $data, ?int $userId): array
    {
        if (! in_array($status, self::STATUSES, true)) {
            return ['ok' => false, 'error' => 'Estado de moderacion no valido.'];
        }

        $review = $this->find($id);

        if ($review === null) {
            return ['ok' => false, 'error' => 'La resena no existe.'];
        }

        $update = [
            'status'          => $status,
            'treatment'       => $data['treatment'] ?? null,
            'moderation_note' => $data['moderation_note'] ?? null,
            'moderated_by'    => $userId,
            'moderated_at'    => date('Y-m-d H:i:s'),
        ];

        if ($status === 'published') {
            // Si venia de pendiente se sella con la fecha de aprobacion; si se
            // estaba retocando sin salir, se conserva la que ya tenia.
            $update['published_at'] = $review['published_at'] ?? date('Y-m-d H:i:s');
        } else {
            $update['published_at'] = null;
        }

        $this->update($id, $update);

        return ['ok' => true, 'error' => null];
    }
}
