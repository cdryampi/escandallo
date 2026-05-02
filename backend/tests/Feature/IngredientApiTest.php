<?php

namespace Tests\Feature;

use App\Models\Ingredient;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class IngredientApiTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_guest_cannot_list_ingredients(): void
    {
        $this->getJson('/api/v1/ingredients')
            ->assertStatus(401);
    }

    public function test_user_can_list_ingredients(): void
    {
        $unit = Unit::create(['name' => 'Gramo', 'symbol' => 'g']);
        Ingredient::factory()->count(3)->create(['unit_id' => $unit->id]);

        $this->actingAs($this->user)
            ->getJson('/api/v1/ingredients')
            ->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_user_can_search_ingredients(): void
    {
        $unit = Unit::create(['name' => 'Gramo', 'symbol' => 'g']);
        Ingredient::factory()->create(['name' => 'Cebolla', 'unit_id' => $unit->id]);
        Ingredient::factory()->create(['name' => 'Ajo', 'unit_id' => $unit->id]);

        $this->actingAs($this->user)
            ->getJson('/api/v1/ingredients?search=Cebolla')
            ->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Cebolla');
    }

    public function test_user_can_view_ingredient(): void
    {
        $unit = Unit::create(['name' => 'Gramo', 'symbol' => 'g']);
        $ingredient = Ingredient::factory()->create(['unit_id' => $unit->id]);

        $this->actingAs($this->user)
            ->getJson("/api/v1/ingredients/{$ingredient->id}")
            ->assertStatus(200)
            ->assertJsonPath('data.id', $ingredient->id);
    }

    public function test_user_gets_404_for_non_existent_ingredient(): void
    {
        $this->actingAs($this->user)
            ->getJson('/api/v1/ingredients/999')
            ->assertStatus(404);
    }
}
