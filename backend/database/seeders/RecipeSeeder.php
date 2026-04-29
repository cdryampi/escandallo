<?php

namespace Database\Seeders;

use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\Unit;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    public function run(): void
    {
        $units = Unit::all()->pluck('id', 'symbol')->toArray();
        $g = $units['g'];
        $ml = $units['ml'];
        $ud = $units['ud'];

        $recipes = [
            [
                'name' => 'Salsa de Tomate Base',
                'slug' => 'salsa-tomate-base',
                'description' => 'Salsa básica para pastas y guisos.',
                'category' => 'Básicos',
                'yield_portions' => 10,
                'status' => 'active',
                'items' => [
                    ['name' => 'Tomate Triturado', 'qty' => 2000, 'unit' => $g],
                    ['name' => 'Cebolla Amarilla', 'qty' => 300, 'unit' => $g],
                    ['name' => 'Aceite de Oliva Virgen Extra', 'qty' => 100, 'unit' => $ml],
                    ['name' => 'Ajo Seco Morado', 'qty' => 20, 'unit' => $g],
                    ['name' => 'Sal Fina', 'qty' => 20, 'unit' => $g],
                ]
            ],
            [
                'name' => 'Bechamel Base',
                'slug' => 'bechamel-base',
                'description' => 'Bechamel clásica para lasaña.',
                'category' => 'Básicos',
                'yield_portions' => 1,
                'status' => 'active',
                'items' => [
                    ['name' => 'Mantequilla Sin Sal', 'qty' => 100, 'unit' => $g],
                    ['name' => 'Harina Panadera', 'qty' => 100, 'unit' => $g],
                    ['name' => 'Leche Entera', 'qty' => 1000, 'unit' => $ml],
                    ['name' => 'Sal Fina', 'qty' => 5, 'unit' => $g],
                ]
            ],
            [
                'name' => 'Vinagreta Clásica',
                'slug' => 'vinagreta-clasica',
                'description' => 'Vinagreta para ensaladas de la casa.',
                'category' => 'Básicos',
                'yield_portions' => 5,
                'status' => 'active',
                'items' => [
                    ['name' => 'Aceite de Oliva Virgen Extra', 'qty' => 300, 'unit' => $ml],
                    ['name' => 'Vinagre de Jerez', 'qty' => 100, 'unit' => $ml],
                    ['name' => 'Sal Fina', 'qty' => 10, 'unit' => $g],
                    ['name' => 'Mostaza Dijon', 'qty' => 20, 'unit' => $g],
                ]
            ],
            [
                'name' => 'Croquetas de Jamón Ibérico',
                'slug' => 'croquetas-jamon-iberico',
                'description' => 'Masa para croquetas de jamón (aprox 50 uds).',
                'category' => 'Entrantes',
                'yield_portions' => 50,
                'status' => 'active',
                'items' => [
                    ['name' => 'Mantequilla Sin Sal', 'qty' => 150, 'unit' => $g],
                    ['name' => 'Harina Panadera', 'qty' => 150, 'unit' => $g],
                    ['name' => 'Leche Entera', 'qty' => 1500, 'unit' => $ml],
                    ['name' => 'Jamón Ibérico de Bellota', 'qty' => 300, 'unit' => $g],
                    ['name' => 'Sal Fina', 'qty' => 5, 'unit' => $g],
                ]
            ],
            [
                'name' => 'Ensaladilla Rusa',
                'slug' => 'ensaladilla-rusa',
                'description' => 'Ensaladilla clásica con atún.',
                'category' => 'Entrantes',
                'yield_portions' => 8,
                'status' => 'active',
                'items' => [
                    ['name' => 'Atún en Aceite Girasol', 'qty' => 400, 'unit' => $g],
                    ['name' => 'Mayonesa Cubo 5L', 'qty' => 300, 'unit' => $ml],
                    ['name' => 'Huevo XL', 'qty' => 4, 'unit' => $ud],
                    ['name' => 'Aceitunas Manzanilla', 'qty' => 100, 'unit' => $g],
                    ['name' => 'Sal Fina', 'qty' => 5, 'unit' => $g],
                ]
            ],
            [
                'name' => 'Lasaña Boloñesa',
                'slug' => 'lasana-bolonesa',
                'description' => 'Lasaña artesana completa.',
                'category' => 'Principales',
                'yield_portions' => 12,
                'status' => 'active',
                'items' => [
                    ['name' => 'Harina Panadera', 'qty' => 500, 'unit' => $g],
                    ['name' => 'Huevo XL', 'qty' => 5, 'unit' => $ud],
                    ['name' => 'Cebolla Amarilla', 'qty' => 200, 'unit' => $g],
                    ['name' => 'Zanahoria', 'qty' => 100, 'unit' => $g],
                    ['name' => 'Parchís Reggiano', 'qty' => 150, 'unit' => $g], // Error intentional? No, use Parmesano
                    ['name' => 'Parmesano Reggiano', 'qty' => 150, 'unit' => $g],
                ]
            ],
            [
                'name' => 'Pechuga de Pollo al Limón',
                'slug' => 'pechuga-pollo-limon',
                'description' => 'Plato individual de pechuga.',
                'category' => 'Principales',
                'yield_portions' => 1,
                'status' => 'active',
                'items' => [
                    ['name' => 'Pechuga de Pollo', 'qty' => 220, 'unit' => $g],
                    ['name' => 'Limón', 'qty' => 50, 'unit' => $g],
                    ['name' => 'Aceite de Oliva Virgen Extra', 'qty' => 15, 'unit' => $ml],
                    ['name' => 'Perejil Fresco', 'qty' => 5, 'unit' => $g],
                    ['name' => 'Sal Fina', 'qty' => 2, 'unit' => $g],
                ]
            ],
            [
                'name' => 'Arroz Blanco de Guarnición',
                'slug' => 'arroz-blanco-guarnicion',
                'description' => 'Arroz neutro para acompañar.',
                'category' => 'Guarniciones',
                'yield_portions' => 4,
                'status' => 'active',
                'items' => [
                    ['name' => 'Arroz Bomba', 'qty' => 300, 'unit' => $g],
                    ['name' => 'Ajo Seco Morado', 'qty' => 10, 'unit' => $g],
                    ['name' => 'Aceite de Oliva Virgen Extra', 'qty' => 20, 'unit' => $ml],
                    ['name' => 'Sal Fina', 'qty' => 5, 'unit' => $g],
                ]
            ],
            [
                'name' => 'Receta Antigua (Borrada)',
                'slug' => 'receta-antigua',
                'description' => 'No usar.',
                'category' => 'Básicos',
                'yield_portions' => 1,
                'status' => 'archived',
                'items' => []
            ],
            [
                'name' => 'Prueba de Coste Alto',
                'slug' => 'prueba-coste-alto',
                'description' => 'Receta para probar márgenes bajos.',
                'category' => 'Principales',
                'yield_portions' => 1,
                'status' => 'draft',
                'items' => [
                    ['name' => 'Solomillo de Ternera', 'qty' => 200, 'unit' => $g],
                    ['name' => 'Jamón Ibérico de Bellota', 'qty' => 50, 'unit' => $g],
                ]
            ],
        ];

        foreach ($recipes as $data) {
            $items = $data['items'];
            unset($data['items']);
            
            $recipe = Recipe::updateOrCreate(['slug' => $data['slug']], $data);
            $recipe->items()->delete(); // Clear items for idempotency

            $sortOrder = 1;
            foreach ($items as $itemData) {
                $ingredient = Ingredient::where('name', $itemData['name'])->first();
                if ($ingredient) {
                    $recipe->items()->create([
                        'ingredient_id' => $ingredient->id,
                        'quantity' => $itemData['qty'],
                        'unit_id' => $itemData['unit'],
                        'sort_order' => $sortOrder++,
                    ]);
                }
            }
        }
    }
}
