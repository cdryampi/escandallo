<?php

namespace Tests\Feature;

use App\Models\Page;
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
