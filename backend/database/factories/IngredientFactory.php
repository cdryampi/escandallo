<?php

namespace Database\Factories;

use App\Models\Ingredient;
use App\Models\Supplier;
use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ingredient>
 */
class IngredientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'sku' => $this->faker->unique()->bothify('ING-####'),
            'unit_id' => Unit::factory(),
            'supplier_id' => Supplier::factory(),
            'cost_per_unit' => $this->faker->randomFloat(4, 0.1, 100),
            'waste_percentage' => $this->faker->randomFloat(2, 0, 30),
            'yield_percentage' => $this->faker->randomFloat(2, 70, 100),
            'is_active' => true,
            'notes' => $this->faker->sentence(),
            'image_url' => null,
        ];
    }
}
