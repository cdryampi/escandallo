<?php

namespace Database\Seeders;

use App\Models\Allergen;
use Illuminate\Database\Seeder;

class AllergenSeeder extends Seeder
{
    public function run(): void
    {
        $allergens = [
            ['name' => 'Gluten', 'code' => 'gluten'],
            ['name' => 'Crustáceos', 'code' => 'crustaceos'],
            ['name' => 'Huevo', 'code' => 'huevo'],
            ['name' => 'Pescado', 'code' => 'pescado'],
            ['name' => 'Cacahuete', 'code' => 'cacahuete'],
            ['name' => 'Soja', 'code' => 'soja'],
            ['name' => 'Lácteos', 'code' => 'lacteos'],
            ['name' => 'Frutos de cáscara', 'code' => 'frutos-cascara'],
            ['name' => 'Apio', 'code' => 'apio'],
            ['name' => 'Mostaza', 'code' => 'mostaza'],
            ['name' => 'Sésamo', 'code' => 'sesamo'],
            ['name' => 'Sulfitos', 'code' => 'sulfitos'],
            ['name' => 'Altramuces', 'code' => 'altramuces'],
            ['name' => 'Moluscos', 'code' => 'moluscos'],
        ];

        foreach ($allergens as $allergen) {
            Allergen::firstOrCreate(['code' => $allergen['code']], $allergen);
        }
    }
}
