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
        $this->admin = User::factory()->create(['is_admin' => true, 'role' => 'admin']);
        $this->user = User::factory()->create(['is_admin' => false, 'role' => 'user']);

        // Seed initial pages
        $this->artisan('db:seed', ['--class' => 'PageSeeder']);
    }

    public function test_only_admins_can_list_pages(): void
    {
        $this->actingAs($this->admin)
            ->getJson('/api/v1/admin/pages')
            ->assertOk()
            ->assertJsonCount(5, 'data');

        $this->actingAs($this->user)
            ->getJson('/api/v1/admin/pages')
            ->assertForbidden();
    }

    public function test_admin_can_get_draft_for_a_page(): void
    {
        $page = Page::where('slug', 'home')->first();

        $this->actingAs($this->admin)
            ->postJson("/api/v1/admin/pages/{$page->id}/draft")
            ->assertCreated()
            ->assertJsonPath('data.status', 'draft');

        $this->assertDatabaseHas('page_versions', [
            'page_id' => $page->id,
            'status' => 'draft',
        ]);
    }

    public function test_admin_can_update_a_version(): void
    {
        $page = Page::where('slug', 'home')->first();
        $draft = PageVersion::create([
            'page_id' => $page->id,
            'status' => 'draft',
            'blocks' => [],
        ]);

        $blocks = [
            ['id' => '1', 'type' => 'HeroBlock', 'is_visible' => true, 'data' => ['title' => 'Updated']],
        ];

        $this->actingAs($this->admin)
            ->putJson("/api/v1/admin/pages/versions/{$draft->id}", [
                'blocks' => $blocks,
                'meta_title' => 'New SEO Title',
            ])
            ->assertOk();

        $this->assertDatabaseHas('page_versions', [
            'id' => $draft->id,
            'blocks' => json_encode($blocks),
        ]);

        $this->assertDatabaseHas('pages', [
            'id' => $page->id,
            'meta_title' => 'New SEO Title',
        ]);
    }

    public function test_admin_update_validates_block_payload_shape(): void
    {
        $page = Page::where('slug', 'home')->first();
        $draft = PageVersion::create([
            'page_id' => $page->id,
            'status' => 'draft',
            'blocks' => [],
        ]);

        $this->actingAs($this->admin)
            ->putJson("/api/v1/admin/pages/versions/{$draft->id}", [
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

    public function test_admin_can_clear_page_seo_fields_when_saving_draft(): void
    {
        $page = Page::where('slug', 'home')->first();
        $page->update([
            'meta_title' => 'Old title',
            'meta_description' => 'Old description',
        ]);

        $draft = PageVersion::create([
            'page_id' => $page->id,
            'status' => 'draft',
            'blocks' => [
                ['id' => '1', 'type' => 'RichTextBlock', 'is_visible' => true, 'data' => ['content' => '<p>Body</p>']],
            ],
        ]);

        $this->actingAs($this->admin)
            ->putJson("/api/v1/admin/pages/versions/{$draft->id}", [
                'blocks' => [
                    ['id' => '1', 'type' => 'RichTextBlock', 'is_visible' => true, 'data' => ['content' => '<p>Body</p>']],
                ],
                'meta_title' => '',
                'meta_description' => '',
            ])
            ->assertOk();

        $this->assertDatabaseHas('pages', [
            'id' => $page->id,
            'meta_title' => null,
            'meta_description' => null,
        ]);
    }

    public function test_admin_can_publish_a_version(): void
    {
        $page = Page::where('slug', 'home')->first();
        $draft = PageVersion::create([
            'page_id' => $page->id,
            'status' => 'draft',
            'blocks' => [['id' => '1', 'type' => 'HeroBlock', 'is_visible' => true, 'data' => ['title' => 'To Publish']]],
        ]);

        $this->actingAs($this->admin)
            ->postJson("/api/v1/admin/pages/versions/{$draft->id}/publish")
            ->assertOk();

        $this->assertDatabaseHas('page_versions', [
            'id' => $draft->id,
            'status' => 'published',
        ]);

        // Old published should be archived
        $this->assertDatabaseHas('page_versions', [
            'page_id' => $page->id,
            'status' => 'archived',
        ]);
    }
}
