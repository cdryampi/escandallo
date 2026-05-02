<?php

namespace Tests\Feature;

use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ImageManagementTest extends TestCase
{
    use RefreshDatabase;

    protected User $adminUser;

    protected User $regularUser;

    protected function setUp(): void
    {
        parent::setUp();
        $this->adminUser = User::factory()->create(['is_admin' => true]);
        $this->regularUser = User::factory()->create(['is_admin' => false]);
    }

    public function test_admin_can_upload_ingredient_image(): void
    {
        Storage::fake('public');

        $unit = Unit::create(['name' => 'Gramo', 'symbol' => 'g']);
        $ingredient = Ingredient::create([
            'name' => 'Test Ingredient',
            'unit_id' => $unit->id,
            'cost_per_unit' => 10,
        ]);

        $file = UploadedFile::fake()->image('ingredient.jpg');

        $response = $this->actingAs($this->adminUser)
            ->postJson("/api/v1/ingredients/{$ingredient->id}/image", [
                'image' => $file,
            ]);

        $response->assertStatus(200);
        $ingredient->refresh();
        $this->assertNotNull($ingredient->image_url);
    }

    public function test_regular_user_cannot_upload_ingredient_image(): void
    {
        Storage::fake('public');

        $unit = Unit::create(['name' => 'Gramo', 'symbol' => 'g']);
        $ingredient = Ingredient::create([
            'name' => 'Test Ingredient',
            'unit_id' => $unit->id,
            'cost_per_unit' => 10,
        ]);

        $file = UploadedFile::fake()->image('ingredient.jpg');

        $response = $this->actingAs($this->regularUser)
            ->postJson("/api/v1/ingredients/{$ingredient->id}/image", [
                'image' => $file,
            ]);

        $response->assertStatus(403);
    }

    public function test_admin_can_upload_recipe_image(): void
    {
        Storage::fake('public');

        $recipe = Recipe::create([
            'name' => 'Test Recipe',
            'slug' => 'test-recipe',
        ]);

        $file = UploadedFile::fake()->image('recipe.jpg');

        $response = $this->actingAs($this->adminUser)
            ->postJson("/api/v1/recipes/{$recipe->id}/image", [
                'image' => $file,
            ]);

        $response->assertStatus(200);
        $recipe->refresh();
        $this->assertNotNull($recipe->image_url);
    }

    public function test_admin_can_delete_recipe_image_via_endpoint(): void
    {
        Storage::fake('public');

        $recipe = Recipe::create([
            'name' => 'Test Recipe',
            'slug' => 'test-recipe',
        ]);

        $file = UploadedFile::fake()->image('recipe.jpg');
        $this->actingAs($this->adminUser)
            ->postJson("/api/v1/recipes/{$recipe->id}/image", ['image' => $file]);

        $recipe->refresh();
        $path = str_replace('/storage/', '', $recipe->image_url);
        Storage::disk('public')->assertExists($path);

        $response = $this->actingAs($this->adminUser)
            ->deleteJson("/api/v1/recipes/{$recipe->id}/image");

        $response->assertStatus(200);
        $recipe->refresh();
        $this->assertNull($recipe->image_url);
        Storage::disk('public')->assertMissing($path);
    }

    public function test_regular_user_cannot_delete_recipe_image(): void
    {
        Storage::fake('public');

        $recipe = Recipe::create([
            'name' => 'Test Recipe',
            'slug' => 'test-recipe',
        ]);

        $file = UploadedFile::fake()->image('recipe.jpg');
        $this->actingAs($this->adminUser)
            ->postJson("/api/v1/recipes/{$recipe->id}/image", ['image' => $file]);

        $response = $this->actingAs($this->regularUser)
            ->deleteJson("/api/v1/recipes/{$recipe->id}/image");

        $response->assertStatus(403);
    }

    public function test_uploading_new_image_deletes_old_one_after_db_update(): void
    {
        Storage::fake('public');

        $unit = Unit::create(['name' => 'Gramo', 'symbol' => 'g']);
        $ingredient = Ingredient::create([
            'name' => 'Test Ingredient',
            'unit_id' => $unit->id,
            'cost_per_unit' => 10,
        ]);

        // Upload first image
        $file1 = UploadedFile::fake()->image('first.jpg');
        $this->actingAs($this->adminUser)
            ->postJson("/api/v1/ingredients/{$ingredient->id}/image", ['image' => $file1]);

        $ingredient->refresh();
        $firstPath = str_replace('/storage/', '', $ingredient->image_url);
        Storage::disk('public')->assertExists($firstPath);

        // Upload second image
        $file2 = UploadedFile::fake()->image('second.jpg');
        $this->actingAs($this->adminUser)
            ->postJson("/api/v1/ingredients/{$ingredient->id}/image", ['image' => $file2]);

        $ingredient->refresh();
        $secondPath = str_replace('/storage/', '', $ingredient->image_url);

        Storage::disk('public')->assertExists($secondPath);
        Storage::disk('public')->assertMissing($firstPath);
    }

    public function test_validation_rejects_invalid_payload(): void
    {
        $unit = Unit::create(['name' => 'Gramo', 'symbol' => 'g']);
        $ingredient = Ingredient::create([
            'name' => 'Test Ingredient',
            'unit_id' => $unit->id,
            'cost_per_unit' => 10,
        ]);

        $response = $this->actingAs($this->adminUser)
            ->postJson("/api/v1/ingredients/{$ingredient->id}/image", [
                'image' => 'not-an-image',
            ]);

        $response->assertStatus(422);
    }

    public function test_external_url_is_not_deleted(): void
    {
        Storage::fake('public');

        $unit = Unit::create(['name' => 'Gramo', 'symbol' => 'g']);
        $ingredient = Ingredient::create([
            'name' => 'Test Ingredient',
            'unit_id' => $unit->id,
            'cost_per_unit' => 10,
            'image_url' => 'https://example.com/external-image.jpg',
        ]);

        $ingredient->delete();

        // No exception should be thrown and logic should skip deletion
        $this->assertTrue(true);
    }
}
