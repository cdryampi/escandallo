<?php

namespace Tests\Feature;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RecipeApiTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_guest_cannot_list_recipes(): void
    {
        $this->getJson('/api/v1/recipes')
            ->assertStatus(401);
    }

    public function test_user_can_list_recipes(): void
    {
        Recipe::factory()->count(3)->create();

        $this->actingAs($this->user)
            ->getJson('/api/v1/recipes')
            ->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_user_can_search_recipes(): void
    {
        Recipe::factory()->create(['name' => 'Paella', 'slug' => 'paella']);
        Recipe::factory()->create(['name' => 'Tortilla', 'slug' => 'tortilla']);

        $this->actingAs($this->user)
            ->getJson('/api/v1/recipes?search=Paella')
            ->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Paella');
    }

    public function test_user_can_view_recipe(): void
    {
        $recipe = Recipe::factory()->create();

        $this->actingAs($this->user)
            ->getJson("/api/v1/recipes/{$recipe->id}")
            ->assertStatus(200)
            ->assertJsonPath('data.id', $recipe->id);
    }

    public function test_user_gets_404_for_non_existent_recipe(): void
    {
        $this->actingAs($this->user)
            ->getJson('/api/v1/recipes/999')
            ->assertStatus(404);
    }
}
