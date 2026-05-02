<?php

namespace Tests\Feature;

use App\Models\Page;
use App\Models\Recipe;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CmsPublicTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed', ['--class' => 'PageSeeder']);
    }

    public function test_guest_can_view_published_page(): void
    {
        $this->getJson('/api/v1/pages/home')
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'id', 'slug', 'name', 'meta_title', 'meta_description', 'meta_image_url', 'blocks', 'published_at',
                ],
            ]);
    }

    public function test_guest_gets_404_if_page_does_not_exist(): void
    {
        $this->getJson('/api/v1/pages/non-existent')
            ->assertNotFound();
    }

    public function test_guest_gets_404_if_page_is_inactive(): void
    {
        $page = Page::where('slug', 'home')->first();
        $page->update(['is_active' => false]);

        $this->getJson('/api/v1/pages/home')
            ->assertNotFound();
    }

    public function test_guest_gets_404_if_no_published_version(): void
    {
        $page = Page::create(['slug' => 'no-version', 'name' => 'No Version']);

        $this->getJson('/api/v1/pages/no-version')
            ->assertNotFound();
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
