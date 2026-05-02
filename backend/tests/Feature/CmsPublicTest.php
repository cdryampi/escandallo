<?php

namespace Tests\Feature;

use App\Models\Page;
use App\Models\PageVersion;
use App\Models\Recipe;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CmsPublicTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_view_seeded_published_pages(): void
    {
        foreach (['home', 'carta', 'contacto', 'legal', 'privacidad'] as $slug) {
            $this->getJson("/api/v1/pages/{$slug}")
                ->assertOk()
                ->assertJsonPath('data.slug', $slug)
                ->assertJsonStructure([
                    'data' => [
                        'id', 'slug', 'name', 'meta_title', 'meta_description', 'meta_image_url', 'blocks',
                    ],
                ]);
        }
    }

    public function test_guest_gets_404_if_page_does_not_exist(): void
    {
        $this->getJson('/api/v1/pages/non-existent')
            ->assertNotFound();
    }

    public function test_guest_gets_404_if_page_is_inactive(): void
    {
        $page = Page::query()->where('slug', 'legal')->firstOrFail();
        $page->update(['is_active' => false]);

        $this->getJson('/api/v1/pages/legal')
            ->assertNotFound();
    }

    public function test_guest_gets_404_if_no_published_version(): void
    {
        $page = Page::query()->create([
            'slug' => 'draft-only',
            'name' => 'Draft only',
            'is_active' => true,
            'show_in_menu' => false,
        ]);

        PageVersion::query()->create([
            'page_id' => $page->id,
            'status' => 'draft',
            'version_number' => 1,
            'blocks' => [],
        ]);

        $this->getJson('/api/v1/pages/draft-only')
            ->assertNotFound();
    }

    public function test_guest_can_fetch_public_menu_from_active_pages(): void
    {
        $this->getJson('/api/v1/cms/menu')
            ->assertOk()
            ->assertJsonPath('data.0.slug', '/')
            ->assertJsonPath('data.1.slug', '/carta')
            ->assertJsonPath('data.2.slug', '/contacto');
    }

    public function test_guest_can_fetch_public_recipe_summaries_for_highlight_blocks(): void
    {
        $activeRecipe = Recipe::create([
            'name' => 'Arroz Meloso',
            'slug' => 'arroz-meloso',
            'description' => 'Arroz con fondo intenso.',
            'status' => 'active',
        ]);

        $archivedRecipe = Recipe::create([
            'name' => 'Receta Archivada',
            'slug' => 'receta-archivada',
            'status' => 'archived',
        ]);

        $this->getJson('/api/v1/public/recipes?ids[]='.$activeRecipe->id.'&ids[]='.$archivedRecipe->id)
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $activeRecipe->id)
            ->assertJsonMissing(['id' => $archivedRecipe->id]);
    }
}
