<?php

namespace App\Database\Seeds;

use App\Models\BlockModel;
use App\Models\InternalLinkModel;
use App\Models\PostModel;
use App\Models\UserModel;
use CodeIgniter\Database\Seeder;

/**
 * Vuelca a MySQL el contenido que estaba hardcodeado en el frontend React
 * (react/src/pages/WellnessGuide.jsx) mas el usuario administrador inicial.
 *
 * Es idempotente: si un slug ya existe, actualiza el post en lugar de duplicarlo.
 */
class LunaSpaContentSeeder extends Seeder
{
    private const ADMIN_USERNAME = 'admin';
    private const ADMIN_PASSWORD = 'LunaSpa2026!';
    private const ADMIN_EMAIL    = 'admin@lunaspa.local';

    public function run()
    {
        $this->seedAdmin();

        foreach ($this->posts() as $data) {
            $this->seedPost($data);
        }
    }

    private function seedAdmin(): void
    {
        $users = new UserModel();

        $existing = $users->findActiveBy(self::ADMIN_USERNAME);

        if ($existing !== null) {
            return;
        }

        $users->insert([
            'username'      => self::ADMIN_USERNAME,
            'email'         => self::ADMIN_EMAIL,
            'password_hash' => password_hash(self::ADMIN_PASSWORD, PASSWORD_DEFAULT),
            'full_name'     => 'Administrador Luna Spa',
            'role'          => 'admin',
            'is_active'     => 1,
        ]);

        $this->db->query('SET FOREIGN_KEY_CHECKS=0');
        echo "  Usuario creado: " . self::ADMIN_USERNAME . "\n";
    }

    private function seedPost(array $data): void
    {
        $posts     = new PostModel();
        $blocks    = new BlockModel();
        $links     = new InternalLinkModel();
        $timestamp = date('Y-m-d H:i:s');

        $internal   = $data['internal'];
        $signature  = $data['signature'];
        $cta        = $data['cta'];
        $card       = $data['card'];

        $fields = [
            'slug'             => $data['slug'],
            'title'            => $data['title'],
            'eyebrow'          => $data['eyebrow'],
            'lead'             => $data['lead'],
            'photo_label'      => $data['photo'],
            'category'         => $card['cat'],
            'card_title'       => $card['title'],
            'card_text'        => $card['text'],
            'card_img'         => $card['img'],
            'is_featured'      => $card['featured'] ? 1 : 0,
            'status'           => 'published',
            'sort_order'       => $data['sort_order'],
            'published_at'     => $timestamp,
            'meta_title'       => $data['title'] . ' — Luna Spa',
            'meta_description' => $data['lead'],
            'og_image'         => null,
            'author_name'      => $signature['name'],
            'author_role'      => $signature['role'],
            'internal_title'   => $internal['title'],
            'internal_text'    => $internal['text'],
            'cta_heading'      => $cta['heading'],
            'cta_text'         => $cta['text'],
            'cta_label'        => $cta['label'],
            'cta_url'          => $cta['to'],
            'created_at'       => $timestamp,
            'updated_at'       => $timestamp,
        ];

        $existing = $posts->where('slug', $data['slug'])->first();

        if ($existing === null) {
            $postId = $posts->insert($fields);
            echo "  Articulo creado: {$data['slug']}\n";
        } else {
            $postId = (int) $existing['id'];
            $posts->update($postId, $fields);
            echo "  Articulo actualizado: {$data['slug']}\n";
        }

        $blocks->replaceForPost($postId, $data['body']);

        // El contenido usa la clave 'to' (igual que el frontend); la tabla usa 'url'.
        $links->replaceForPost($postId, array_map(
            static fn (array $l): array => ['label' => $l['label'], 'url' => $l['to']],
            $internal['links']
        ));
    }

    /**
     * Contenido exacto que estaba en WellnessGuide.jsx (ARTICLES) y CARDS.
     *
     * @return list<array<string,mixed>>
     */
    private function posts(): array
    {
        $signature = [
            'name' => 'Written by Luna Spa',
            'role' => 'Wellness & massage experiences in Sayulita, Mexico.',
        ];

        $cta = [
            'heading' => 'Ready to slow down?',
            'text'    => 'Explore your Luna Spa experience.',
            'label'   => 'Explore Treatments →',
            'to'      => '/#treatments',
        ];

        return [
            [
                'sort_order' => 1,
                'slug'       => 'how-to-relax-after-traveling-to-sayulita',
                'eyebrow'    => 'Wellness · Travel',
                'title'      => 'How to Relax After Traveling to Sayulita',
                'lead'       => 'Simple ways to help your body slow down after a long journey and begin your stay feeling refreshed.',
                'photo'      => 'Wellness in Sayulita',
                'body'       => [
                    [
                        'type' => 'p',
                        'text' => 'Arriving in Sayulita can be exciting, but a long journey can leave your body feeling different from how you imagined the beginning of your vacation.',
                    ],
                    ['type' => 'h2', 'text' => 'Give yourself a real transition into vacation mode'],
                    [
                        'type' => 'p',
                        'text' => 'Hydrate, take a quiet walk, spend time near the ocean and leave enough space for your body to catch up with the change of pace.',
                    ],
                    ['type' => 'h2', 'text' => 'Listen to what your body needs'],
                    [
                        'type'  => 'ul',
                        'items' => [
                            'Gentle relaxation if you feel tired from travel.',
                            'Focused bodywork if sitting for hours has left you tense.',
                            'An in-home experience if you would rather stay at your villa or Airbnb.',
                        ],
                    ],
                ],
                'internal'  => [
                    'title' => 'Looking for a massage in Sayulita?',
                    'text'  => 'Explore the experience that fits your stay.',
                    'links' => [
                        ['label' => 'Explore Massage →', 'to' => '/#treatments'],
                        ['label' => 'In-Home Massage →', 'to' => '/in-home-massage'],
                    ],
                ],
                'signature' => $signature,
                'cta'       => $cta,
                'card'      => [
                    'cat'      => 'wellness',
                    'featured' => true,
                    'img'      => 'Sayulita · Wellness',
                    'title'    => 'How to Relax After Traveling to Sayulita',
                    'text'     => 'Simple ways to help your body slow down after a long journey and begin your stay feeling refreshed.',
                ],
            ],
            [
                'sort_order' => 2,
                'slug'       => 'a-wellness-day-in-sayulita',
                'eyebrow'    => 'Sayulita · Wellness',
                'title'      => 'A Wellness Day in Sayulita',
                'lead'       => 'A thoughtful way to combine beach time, movement, relaxation and massage during your stay.',
                'photo'      => 'Slow moments',
                'body'       => [
                    [
                        'type' => 'p',
                        'text' => 'A wellness day does not need to be complicated. In Sayulita, the best moments often come from leaving enough room in your schedule to enjoy them without rushing.',
                    ],
                    ['type' => 'h2', 'text' => 'Start slowly'],
                    [
                        'type' => 'p',
                        'text' => 'Begin with hydration, a calm breakfast and some time outside. Let the morning establish the rhythm for the rest of the day.',
                    ],
                    ['type' => 'h2', 'text' => 'Make room for recovery'],
                    [
                        'type' => 'p',
                        'text' => 'After beach time, movement or exploring town, a massage can become the moment that helps you shift from activity into deeper relaxation.',
                    ],
                    ['type' => 'h2', 'text' => 'Choose an experience that fits your stay'],
                    [
                        'type' => 'p',
                        'text' => 'An in-home massage can keep the experience simple at a villa, Airbnb or hotel. For couples, a shared treatment can turn the afternoon into a private ritual.',
                    ],
                ],
                'internal'  => [
                    'title' => 'Continue your wellness experience',
                    'text'  => 'Explore the Luna Spa experiences that connect naturally with this guide.',
                    'links' => [
                        ['label' => 'In-Home Massage →', 'to' => '/in-home-massage'],
                        ['label' => 'Couples Massage →', 'to' => '/couples-massage'],
                    ],
                ],
                'signature' => $signature,
                'cta'       => $cta,
                'card'      => [
                    'cat'      => 'sayulita',
                    'featured' => false,
                    'img'      => 'A Wellness Day in Sayulita',
                    'title'    => 'A Wellness Day in Sayulita',
                    'text'     => 'How to combine beach time, movement, relaxation and massage.',
                ],
            ],
            [
                'sort_order' => 3,
                'slug'       => 'which-massage-is-right-for-your-vacation-in-sayulita',
                'eyebrow'    => 'Massage · Consideration',
                'title'      => 'Which Massage Is Right for Your Vacation in Sayulita?',
                'lead'       => 'Deep tissue, relaxing, couples and in-home massage — a simple guide to choosing your experience.',
                'photo'      => 'Massage & Wellness',
                'body'       => [
                    [
                        'type' => 'p',
                        'text' => 'The best massage for your vacation depends less on a label and more on what you want to feel when the treatment is over.',
                    ],
                    ['type' => 'h2', 'text' => 'If you want to fully unwind'],
                    [
                        'type' => 'p',
                        'text' => 'A relaxing massage can be a natural choice when your priority is slowing down and letting go of everyday tension.',
                    ],
                    ['type' => 'h2', 'text' => 'If you want focused bodywork'],
                    [
                        'type' => 'p',
                        'text' => 'Deep tissue or therapeutic approaches may be appropriate when you want focused pressure and attention to areas that feel particularly tense.',
                    ],
                    ['type' => 'h2', 'text' => 'If you want to share the experience'],
                    [
                        'type' => 'p',
                        'text' => 'A couples massage creates a shared moment for two and can work especially well around anniversaries, honeymoons or a quiet afternoon together.',
                    ],
                    ['type' => 'h2', 'text' => 'If you do not want to leave your accommodation'],
                    [
                        'type' => 'p',
                        'text' => 'An in-home massage brings the experience to your villa, Airbnb, hotel or home.',
                    ],
                ],
                'internal'  => [
                    'title' => 'Explore Luna Spa treatments',
                    'text'  => 'Go from consideration to the experience that fits your needs.',
                    'links' => [
                        ['label' => 'Massage →', 'to' => '/#treatments'],
                        ['label' => 'Couples Massage →', 'to' => '/couples-massage'],
                        ['label' => 'In-Home Massage →', 'to' => '/in-home-massage'],
                    ],
                ],
                'signature' => $signature,
                'cta'       => $cta,
                'card'      => [
                    'cat'      => 'massage',
                    'featured' => false,
                    'img'      => 'Massage · Luna Spa',
                    'title'    => 'Which Massage Is Right for Your Vacation?',
                    'text'     => 'Deep tissue, relaxing, couples and in-home massage — a simple guide.',
                ],
            ],
        ];
    }
}
