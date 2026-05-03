<?php

namespace Tests\Feature;

use App\Models\Page;
use App\Models\PageVersion;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CmsAdminTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create([
            'is_admin' => true,
            'role' => 'admin',
        ]);

        $this->user = User::factory()->create([
            'is_admin' => false,
            'role' => 'user',
        ]);
    }

    public function test_only_admins_can_list_pages(): void
    {
        $this->actingAs($this->admin)
            ->getJson('/api/v1/admin/pages')
            ->assertOk()
            ->assertJsonCount(5, 'data')
            ->assertJsonPath('data.0.slug', 'home');

        $this->actingAs($this->user)
            ->getJson('/api/v1/admin/pages')
            ->assertForbidden();
    }

    public function test_admin_can_get_page_detail_with_versions(): void
    {
        $page = Page::query()->where('slug', 'home')->firstOrFail();

        $this->actingAs($this->admin)
            ->getJson("/api/v1/admin/pages/{$page->id}")
            ->assertOk()
            ->assertJsonPath('data.slug', 'home')
            ->assertJsonPath('data.published_version.status', 'published');
    }

    public function test_admin_can_get_or_create_draft_for_a_page(): void
    {
        $page = Page::query()->where('slug', 'home')->firstOrFail();

        $this->actingAs($this->admin)
            ->postJson("/api/v1/admin/pages/{$page->id}/draft")
            ->assertOk()
            ->assertJsonPath('data.page_id', $page->id)
            ->assertJsonPath('data.status', 'draft');

        $this->assertDatabaseHas('page_versions', [
            'page_id' => $page->id,
            'status' => 'draft',
        ]);
    }

    public function test_admin_can_update_a_version_and_page_seo(): void
    {
        $page = Page::query()->where('slug', 'home')->firstOrFail();

        $draftResponse = $this->actingAs($this->admin)
            ->postJson("/api/v1/admin/pages/{$page->id}/draft")
            ->assertOk();

        $versionId = (int) $draftResponse->json('data.id');
        $blocks = [
            [
                'id' => 'hero-1',
                'type' => 'HeroBlock',
                'is_visible' => true,
                'data' => [
                    'title' => 'Updated home',
                    'subtitle' => 'Subtitle',
                    'image_url' => '',
                    'cta_text' => 'Entrar',
                    'cta_url' => '/login',
                ],
            ],
        ];

        $this->actingAs($this->admin)
            ->putJson("/api/v1/admin/pages/versions/{$versionId}", [
                'blocks' => $blocks,
                'meta_title' => 'Inicio actualizado',
                'meta_description' => 'Nueva descripcion',
                'show_in_menu' => true,
                'is_active' => true,
            ])
            ->assertOk()
            ->assertJsonPath('data.blocks.0.data.title', 'Updated home')
            ->assertJsonPath('data.meta_title', 'Inicio actualizado');

        $page->refresh();

        $this->assertSame('Inicio actualizado', $page->meta_title);
        $this->assertSame('Nueva descripcion', $page->meta_description);
        $this->assertTrue($page->show_in_menu);
    }

    public function test_admin_update_validates_block_payload_shape(): void
    {
        $page = Page::query()->where('slug', 'home')->firstOrFail();
        $versionId = (int) $this->actingAs($this->admin)
            ->postJson("/api/v1/admin/pages/{$page->id}/draft")
            ->json('data.id');

        $this->actingAs($this->admin)
            ->putJson("/api/v1/admin/pages/versions/{$versionId}", [
                'blocks' => [
                    [
                        'id' => 'hero-1',
                        'type' => 'HeroBlock',
                        'is_visible' => true,
                        'data' => [
                            'subtitle' => 'Missing title should fail',
                        ],
                    ],
                ],
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['blocks.0.data.title']);
    }

    public function test_admin_can_update_versions_with_new_restaurant_landing_blocks(): void
    {
        $page = Page::query()->where('slug', 'home')->firstOrFail();
        $versionId = (int) $this->actingAs($this->admin)
            ->postJson("/api/v1/admin/pages/{$page->id}/draft")
            ->json('data.id');

        $this->actingAs($this->admin)
            ->putJson("/api/v1/admin/pages/versions/{$versionId}", [
                'blocks' => [
                    [
                        'id' => 'gallery-1',
                        'type' => 'GalleryBlock',
                        'is_visible' => true,
                        'data' => [
                            'title' => 'La casa',
                            'intro' => 'Sala y ambiente.',
                            'images' => [
                                ['image_url' => '/storage/uno.webp', 'alt' => 'Sala', 'caption' => 'Sala principal'],
                                ['image_url' => '/storage/dos.webp', 'alt' => 'Plato', 'caption' => 'Plato firma'],
                            ],
                        ],
                    ],
                    [
                        'id' => 'visit-1',
                        'type' => 'VisitInfoBlock',
                        'is_visible' => true,
                        'data' => [
                            'title' => 'Como visitarnos',
                            'intro' => 'Informacion util.',
                            'address' => 'Arenal 14',
                            'phone' => '+34 915',
                            'email' => 'info@test.dev',
                            'hours' => [
                                ['label' => 'Martes', 'value' => '13:30-16:00'],
                            ],
                            'map_url' => 'https://maps.google.com/example',
                            'primary_cta_text' => 'Reservar',
                            'primary_cta_url' => '/contacto',
                        ],
                    ],
                    [
                        'id' => 'cta-1',
                        'type' => 'ReservationCtaBlock',
                        'is_visible' => true,
                        'data' => [
                            'eyebrow' => 'Reservas',
                            'title' => 'Una mesa a tu medida',
                            'body' => 'Eventos y celebraciones.',
                            'primary_cta_text' => 'Reservar mesa',
                            'primary_cta_url' => '/contacto',
                            'secondary_cta_text' => 'Ver carta',
                            'secondary_cta_url' => '/carta',
                            'background_image_url' => '',
                        ],
                    ],
                ],
            ])
            ->assertOk()
            ->assertJsonPath('data.blocks.0.type', 'GalleryBlock')
            ->assertJsonPath('data.blocks.1.type', 'VisitInfoBlock')
            ->assertJsonPath('data.blocks.2.type', 'ReservationCtaBlock');
    }

    public function test_admin_can_update_landing_brand_palette(): void
    {
        $this->actingAs($this->admin)
            ->patchJson('/api/v1/admin/landing/branding', [
                'name' => 'Casa Escandallo',
                'tagline' => 'Control tecnico con hospitalidad.',
                'palette' => [
                    'brand' => '#7a2e1f',
                    'brand_strong' => '#4a170f',
                    'accent' => '#c48a2c',
                ],
            ])
            ->assertOk()
            ->assertJsonPath('data.name', 'Casa Escandallo')
            ->assertJsonPath('data.palette.brand', '#7a2e1f')
            ->assertJsonPath('data.palette.brand_strong', '#4a170f')
            ->assertJsonPath('data.palette.accent', '#c48a2c');

        $this->assertDatabaseHas('landing_settings', [
            'id' => 1,
        ]);

        $modules = \App\Models\LandingSetting::current()->modules;

        $this->assertSame('#7a2e1f', $modules['branding']['palette']['brand'] ?? null);
        $this->assertSame('#4a170f', $modules['branding']['palette']['brand_strong'] ?? null);
        $this->assertSame('#c48a2c', $modules['branding']['palette']['accent'] ?? null);
    }

    public function test_admin_update_rejects_invalid_landing_palette_hex_values(): void
    {
        $this->actingAs($this->admin)
            ->patchJson('/api/v1/admin/landing/branding', [
                'name' => 'Casa Escandallo',
                'palette' => [
                    'brand' => 'verde',
                    'brand_strong' => '#4a170f',
                    'accent' => '#c48a2c',
                ],
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['palette.brand']);
    }

    public function test_admin_can_remove_blocks_and_persist_nested_list_updates(): void
    {
        $page = Page::query()->where('slug', 'home')->firstOrFail();

        $draftResponse = $this->actingAs($this->admin)
            ->postJson("/api/v1/admin/pages/{$page->id}/draft")
            ->assertOk();

        $versionId = (int) $draftResponse->json('data.id');

        $initialBlocks = [
            [
                'id' => 'features-1',
                'type' => 'FeatureListBlock',
                'is_visible' => true,
                'data' => [
                    'title' => 'Capacidades',
                    'features' => [
                        [
                            'icon' => 'Star',
                            'title' => 'Base uno',
                            'description' => 'Descripcion uno.',
                        ],
                    ],
                ],
            ],
            [
                'id' => 'visit-1',
                'type' => 'VisitInfoBlock',
                'is_visible' => true,
                'data' => [
                    'title' => 'Como visitarnos',
                    'intro' => 'Informacion util.',
                    'address' => 'Arenal 14',
                    'phone' => '+34 915',
                    'email' => 'info@test.dev',
                    'hours' => [
                        ['label' => 'Martes', 'value' => '13:30-16:00'],
                    ],
                    'map_url' => 'https://maps.google.com/example',
                    'primary_cta_text' => 'Reservar',
                    'primary_cta_url' => '/contacto',
                ],
            ],
            [
                'id' => 'contact-1',
                'type' => 'ContactFormBlock',
                'is_visible' => true,
                'data' => [
                    'heading' => 'Contacto',
                    'recipient_email' => 'reservas@test.dev',
                    'success_message' => 'Gracias.',
                ],
            ],
        ];

        $this->actingAs($this->admin)
            ->putJson("/api/v1/admin/pages/versions/{$versionId}", [
                'blocks' => $initialBlocks,
            ])
            ->assertOk();

        $updatedBlocks = [
            [
                'id' => 'features-1',
                'type' => 'FeatureListBlock',
                'is_visible' => true,
                'data' => [
                    'title' => 'Capacidades',
                    'features' => [
                        [
                            'icon' => 'Star',
                            'title' => 'Base uno',
                            'description' => 'Descripcion uno.',
                        ],
                        [
                            'icon' => 'Heart',
                            'title' => 'Nuevo atributo',
                            'description' => 'Persistencia de listas verificada.',
                        ],
                    ],
                ],
            ],
            [
                'id' => 'visit-1',
                'type' => 'VisitInfoBlock',
                'is_visible' => true,
                'data' => [
                    'title' => 'Como visitarnos',
                    'intro' => 'Informacion util.',
                    'address' => 'Arenal 14',
                    'phone' => '+34 915',
                    'email' => 'info@test.dev',
                    'hours' => [
                        ['label' => 'Martes', 'value' => '13:30-16:00'],
                        ['label' => 'Domingo', 'value' => '13:00-16:00'],
                    ],
                    'map_url' => 'https://maps.google.com/example',
                    'primary_cta_text' => 'Reservar',
                    'primary_cta_url' => '/contacto',
                ],
            ],
        ];

        $this->actingAs($this->admin)
            ->putJson("/api/v1/admin/pages/versions/{$versionId}", [
                'blocks' => $updatedBlocks,
            ])
            ->assertOk()
            ->assertJsonCount(2, 'data.blocks')
            ->assertJsonMissingPath('data.blocks.2')
            ->assertJsonPath('data.blocks.0.data.features.1.title', 'Nuevo atributo')
            ->assertJsonPath('data.blocks.1.data.hours.1.label', 'Domingo');

        $version = PageVersion::query()->findOrFail($versionId);

        $this->assertCount(2, $version->blocks);
        $this->assertSame('Nuevo atributo', $version->blocks[0]['data']['features'][1]['title']);
        $this->assertSame('Domingo', $version->blocks[1]['data']['hours'][1]['label']);
    }

    public function test_admin_update_rejects_relative_map_urls_for_visit_info_blocks(): void
    {
        $page = Page::query()->where('slug', 'home')->firstOrFail();
        $versionId = (int) $this->actingAs($this->admin)
            ->postJson("/api/v1/admin/pages/{$page->id}/draft")
            ->json('data.id');

        $this->actingAs($this->admin)
            ->putJson("/api/v1/admin/pages/versions/{$versionId}", [
                'blocks' => [
                    [
                        'id' => 'visit-1',
                        'type' => 'VisitInfoBlock',
                        'is_visible' => true,
                        'data' => [
                            'title' => 'Como visitarnos',
                            'intro' => 'Informacion util.',
                            'address' => 'Arenal 14',
                            'phone' => '+34 915',
                            'email' => 'info@test.dev',
                            'hours' => [
                                ['label' => 'Martes', 'value' => '13:30-16:00'],
                            ],
                            'map_url' => '/mapa-local',
                            'primary_cta_text' => 'Reservar',
                            'primary_cta_url' => '/contacto',
                        ],
                    ],
                ],
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['blocks.0.data.map_url']);
    }

    public function test_admin_can_publish_a_version_and_archive_previous_publication(): void
    {
        $page = Page::query()->where('slug', 'home')->firstOrFail();

        $draftId = (int) $this->actingAs($this->admin)
            ->postJson("/api/v1/admin/pages/{$page->id}/draft")
            ->json('data.id');

        $blocks = [
            [
                'id' => 'hero-1',
                'type' => 'HeroBlock',
                'is_visible' => true,
                'data' => [
                    'title' => 'Publish me',
                    'subtitle' => '',
                    'image_url' => '',
                    'cta_text' => '',
                    'cta_url' => '',
                ],
            ],
        ];

        $this->actingAs($this->admin)
            ->putJson("/api/v1/admin/pages/versions/{$draftId}", [
                'blocks' => $blocks,
            ])
            ->assertOk();

        $this->actingAs($this->admin)
            ->postJson("/api/v1/admin/pages/versions/{$draftId}/publish")
            ->assertOk()
            ->assertJsonPath('data.id', $draftId)
            ->assertJsonPath('data.status', 'published');

        $this->assertDatabaseHas('page_versions', [
            'id' => $draftId,
            'status' => 'published',
        ]);

        $this->assertDatabaseHas('page_versions', [
            'page_id' => $page->id,
            'status' => 'archived',
        ]);
    }
}
