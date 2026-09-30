<?php

namespace App\Controllers\Dashboard;

use App\Controllers\BaseController;
use App\Models\ReviewModel;
use CodeIgniter\HTTP\RedirectResponse;

/**
 * Moderacion de las resenas que llegan desde /reviews-score.
 *
 * El listado filtra por estado y cada decision se toma en la pantalla de
 * detalle, donde se ve el texto completo, la nota privada y las cinco
 * calificaciones antes de publicar.
 */
class Reviews extends BaseController
{
    private ReviewModel $reviews;

    public function __construct()
    {
        $this->reviews = new ReviewModel();
    }

    public function index()
    {
        $status = (string) $this->request->getGet('status');

        if (! in_array($status, ReviewModel::STATUSES, true)) {
            $status = null;
        }

        return view('dashboard/reviews/index', [
            'title'  => 'Comentarios — Luna Spa',
            'reviews' => $this->reviews->adminAll($status),
            'user'   => service('auth')->currentUser(),
            'stats'  => $this->reviews->stats(),
            'status' => $status,
            'statuses' => ReviewModel::STATUS_LABELS,
        ]);
    }

    public function show(int $id)
    {
        $review = $this->reviews->findFull($id);

        if ($review === null) {
            return redirect()->to(base_url('dashboard/reviews'))->with('error', 'La resena no existe.');
        }

        return view('dashboard/reviews/show', [
            'title'  => 'Resena de ' . $review['display_name'] . ' — Luna Spa',
            'review' => $review,
            'user'   => service('auth')->currentUser(),
            'rateLabels'  => ReviewModel::RATE_LABELS,
            'statusLabels' => ReviewModel::STATUS_LABELS,
            'treatments'  => ReviewModel::TREATMENTS,
            'treatmentLabels' => ReviewModel::TREATMENT_LABELS,
        ]);
    }

    public function moderate(int $id): RedirectResponse
    {
        $status = (string) $this->request->getPost('status');

        $treatment = (string) $this->request->getPost('treatment');
        if (! in_array($treatment, ReviewModel::TREATMENTS, true)) {
            $treatment = '';
        }

        $result = $this->reviews->moderate($id, $status, [
            'treatment'       => $treatment === '' ? null : $treatment,
            'moderation_note' => $this->clean($this->request->getPost('moderation_note')),
        ], service('auth')->id());

        if ($result['ok'] === false) {
            return redirect()->to(base_url('dashboard/reviews'))->with('error', $result['error']);
        }

        $label = ReviewModel::STATUS_LABELS[$status] ?? $status;

        return redirect()
            ->to(base_url("dashboard/reviews/{$id}"))
            ->with('success', 'Resena marcada como ' . lcfirst($label) . '.');
    }

    public function delete(int $id): RedirectResponse
    {
        if ($this->reviews->find($id) === null) {
            return redirect()->to(base_url('dashboard/reviews'))->with('error', 'La resena no existe.');
        }

        $this->reviews->delete($id);

        return redirect()->to(base_url('dashboard/reviews'))->with('success', 'Resena eliminada.');
    }

    private function clean($value): ?string
    {
        $value = trim((string) $value);

        return $value === '' ? null : $value;
    }
}
