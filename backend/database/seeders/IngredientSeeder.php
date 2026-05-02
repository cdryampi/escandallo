<?php

namespace Database\Seeders;

use App\Models\Allergen;
use App\Models\Ingredient;
use App\Models\Supplier;
use App\Models\Unit;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class IngredientSeeder extends Seeder
{
    public function run(): void
    {
        $units = Unit::all()->pluck('id', 'symbol')->toArray();
        $suppliers = Supplier::all()->pluck('id', 'name')->toArray();
        $allergens = Allergen::all()->pluck('id', 'code')->toArray();

        $kg = $units['kg'];
        $g = $units['g'];
        $l = $units['l'];
        $ml = $units['ml'];
        $ud = $units['ud'];
        $lata = $units['lata'];

        $ingredientsData = [
            // Secos
            ['name' => 'Harina Panadera', 'sku' => 'ING-001', 'unit_id' => $kg, 'supplier_id' => $suppliers['Mercamadrid Central'], 'cost_per_unit' => 0.85, 'waste_percentage' => 2, 'allergens' => ['gluten']],
            ['name' => 'Arroz Bomba', 'sku' => 'ING-011', 'unit_id' => $kg, 'supplier_id' => $suppliers['Mercamadrid Central'], 'cost_per_unit' => 2.40, 'waste_percentage' => 1, 'allergens' => []],
            ['name' => 'Sal Fina', 'sku' => 'ING-007', 'unit_id' => $kg, 'supplier_id' => $suppliers['Mercamadrid Central'], 'cost_per_unit' => 0.45, 'waste_percentage' => 0, 'allergens' => []],
            ['name' => 'Azúcar Blanquilla', 'sku' => 'ING-012', 'unit_id' => $kg, 'supplier_id' => $suppliers['Mercamadrid Central'], 'cost_per_unit' => 1.10, 'waste_percentage' => 0, 'allergens' => []],
            ['name' => 'Pimienta Negra', 'sku' => 'ING-013', 'unit_id' => $kg, 'supplier_id' => $suppliers['Gourmet Mediterráneo'], 'cost_per_unit' => 14.20, 'waste_percentage' => 0, 'allergens' => []],
            ['name' => 'Pimentón de la Vera', 'sku' => 'ING-014', 'unit_id' => $kg, 'supplier_id' => $suppliers['Gourmet Mediterráneo'], 'cost_per_unit' => 12.50, 'waste_percentage' => 0, 'allergens' => []],

            // Frescos
            ['name' => 'Cebolla Amarilla', 'sku' => 'ING-009', 'unit_id' => $kg, 'supplier_id' => $suppliers['Frutas Doña Ana'], 'cost_per_unit' => 1.10, 'waste_percentage' => 15, 'allergens' => []],
            ['name' => 'Ajo Seco Morado', 'sku' => 'ING-015', 'unit_id' => $kg, 'supplier_id' => $suppliers['Huerta de Aranjuez'], 'cost_per_unit' => 3.80, 'waste_percentage' => 20, 'allergens' => []],
            ['name' => 'Tomate Rama', 'sku' => 'ING-016', 'unit_id' => $kg, 'supplier_id' => $suppliers['Huerta de Aranjuez'], 'cost_per_unit' => 2.20, 'waste_percentage' => 5, 'allergens' => []],
            ['name' => 'Zanahoria', 'sku' => 'ING-017', 'unit_id' => $kg, 'supplier_id' => $suppliers['Huerta de Aranjuez'], 'cost_per_unit' => 0.95, 'waste_percentage' => 25, 'allergens' => []],
            ['name' => 'Limón', 'sku' => 'ING-018', 'unit_id' => $kg, 'supplier_id' => $suppliers['Frutas Doña Ana'], 'cost_per_unit' => 1.80, 'waste_percentage' => 40, 'allergens' => []],
            ['name' => 'Perejil Fresco', 'sku' => 'ING-019', 'unit_id' => $kg, 'supplier_id' => $suppliers['Frutas Doña Ana'], 'cost_per_unit' => 4.50, 'waste_percentage' => 30, 'allergens' => []],

            // Proteínas
            ['name' => 'Pechuga de Pollo', 'sku' => 'ING-002', 'unit_id' => $kg, 'supplier_id' => $suppliers['Carnes Sierra Madrid'], 'cost_per_unit' => 6.50, 'waste_percentage' => 5, 'allergens' => []],
            ['name' => 'Solomillo de Ternera', 'sku' => 'ING-020', 'unit_id' => $kg, 'supplier_id' => $suppliers['Carnes Sierra Madrid'], 'cost_per_unit' => 28.00, 'waste_percentage' => 10, 'allergens' => []],
            ['name' => 'Secreto Ibérico', 'sku' => 'ING-021', 'unit_id' => $kg, 'supplier_id' => $suppliers['Carnes Sierra Madrid'], 'cost_per_unit' => 14.50, 'waste_percentage' => 8, 'allergens' => []],
            ['name' => 'Salmón Fresco', 'sku' => 'ING-022', 'unit_id' => $kg, 'supplier_id' => $suppliers['Pescados del Cantábrico'], 'cost_per_unit' => 16.80, 'waste_percentage' => 25, 'allergens' => ['pescado']],
            ['name' => 'Gamba Blanca', 'sku' => 'ING-023', 'unit_id' => $kg, 'supplier_id' => $suppliers['Pescados del Cantábrico'], 'cost_per_unit' => 32.00, 'waste_percentage' => 45, 'allergens' => ['crustaceos']],
            ['name' => 'Huevo XL', 'sku' => 'ING-008', 'unit_id' => $ud, 'supplier_id' => $suppliers['Mercamadrid Central'], 'cost_per_unit' => 0.18, 'waste_percentage' => 10, 'allergens' => ['huevo']],
            ['name' => 'Jamón Ibérico de Bellota', 'sku' => 'ING-024', 'unit_id' => $kg, 'supplier_id' => $suppliers['Gourmet Mediterráneo'], 'cost_per_unit' => 85.00, 'waste_percentage' => 35, 'allergens' => []],

            // Lácteos
            ['name' => 'Leche Entera', 'sku' => 'ING-004', 'unit_id' => $l, 'supplier_id' => $suppliers['Lácteos la Granja'], 'cost_per_unit' => 0.95, 'waste_percentage' => 0, 'allergens' => ['lacteos']],
            ['name' => 'Nata Cocina 35%', 'sku' => 'ING-025', 'unit_id' => $l, 'supplier_id' => $suppliers['Lácteos la Granja'], 'cost_per_unit' => 3.80, 'waste_percentage' => 0, 'allergens' => ['lacteos']],
            ['name' => 'Mantequilla Sin Sal', 'sku' => 'ING-010', 'unit_id' => $kg, 'supplier_id' => $suppliers['Lácteos la Granja'], 'cost_per_unit' => 7.20, 'waste_percentage' => 0, 'allergens' => ['lacteos']],
            ['name' => 'Mozzarella Fresca', 'sku' => 'ING-026', 'unit_id' => $kg, 'supplier_id' => $suppliers['Lácteos la Granja'], 'cost_per_unit' => 8.50, 'waste_percentage' => 0, 'allergens' => ['lacteos']],
            ['name' => 'Parmesano Reggiano', 'sku' => 'ING-006', 'unit_id' => $kg, 'supplier_id' => $suppliers['Gourmet Mediterráneo'], 'cost_per_unit' => 18.50, 'waste_percentage' => 3, 'allergens' => ['lacteos']],
            ['name' => 'Yogur Griego Nat.', 'sku' => 'ING-027', 'unit_id' => $kg, 'supplier_id' => $suppliers['Lácteos la Granja'], 'cost_per_unit' => 4.20, 'waste_percentage' => 0, 'allergens' => ['lacteos']],

            // Conservas / Básicos
            ['name' => 'Tomate Triturado', 'sku' => 'ING-003', 'unit_id' => $kg, 'supplier_id' => $suppliers['Mercamadrid Central'], 'cost_per_unit' => 1.20, 'waste_percentage' => 0, 'allergens' => []],
            ['name' => 'Atún en Aceite Girasol', 'sku' => 'ING-028', 'unit_id' => $kg, 'supplier_id' => $suppliers['Congelados Ártico'], 'cost_per_unit' => 9.50, 'waste_percentage' => 0, 'allergens' => ['pescado']],
            ['name' => 'Aceitunas Manzanilla', 'sku' => 'ING-029', 'unit_id' => $kg, 'supplier_id' => $suppliers['Distribuciones El Cortijo'], 'cost_per_unit' => 4.80, 'waste_percentage' => 30, 'allergens' => []],
            ['name' => 'Caldo de Pollo Tetra', 'sku' => 'ING-030', 'unit_id' => $l, 'supplier_id' => $suppliers['Mercamadrid Central'], 'cost_per_unit' => 1.50, 'waste_percentage' => 0, 'allergens' => []],

            // Aceites / Salsas
            ['name' => 'Aceite de Oliva Virgen Extra', 'sku' => 'ING-005', 'unit_id' => $l, 'supplier_id' => $suppliers['Distribuciones El Cortijo'], 'cost_per_unit' => 8.40, 'waste_percentage' => 0, 'allergens' => []],
            ['name' => 'Aceite Girasol', 'sku' => 'ING-031', 'unit_id' => $l, 'supplier_id' => $suppliers['Distribuciones El Cortijo'], 'cost_per_unit' => 1.60, 'waste_percentage' => 0, 'allergens' => []],
            ['name' => 'Vinagre de Jerez', 'sku' => 'ING-032', 'unit_id' => $l, 'supplier_id' => $suppliers['Gourmet Mediterráneo'], 'cost_per_unit' => 5.20, 'waste_percentage' => 0, 'allergens' => ['sulfitos']],
            ['name' => 'Salsa de Soja', 'sku' => 'ING-033', 'unit_id' => $l, 'supplier_id' => $suppliers['Especialidades de Oriente'], 'cost_per_unit' => 6.80, 'waste_percentage' => 0, 'allergens' => ['soja', 'gluten']],
            ['name' => 'Mostaza Dijon', 'sku' => 'ING-034', 'unit_id' => $kg, 'supplier_id' => $suppliers['Gourmet Mediterráneo'], 'cost_per_unit' => 9.40, 'waste_percentage' => 0, 'allergens' => ['mostaza']],
            ['name' => 'Mayonesa Cubo 5L', 'sku' => 'ING-035', 'unit_id' => $l, 'supplier_id' => $suppliers['Distribuciones El Cortijo'], 'cost_per_unit' => 3.20, 'waste_percentage' => 0, 'allergens' => ['huevo']],

            // Panadería
            ['name' => 'Pan Brioche Hamburguesa', 'sku' => 'ING-036', 'unit_id' => $ud, 'supplier_id' => $suppliers['Panadería Artesana Ovidio'], 'cost_per_unit' => 0.65, 'waste_percentage' => 0, 'allergens' => ['gluten', 'huevo', 'lacteos', 'sesamo']],
            ['name' => 'Baguette Tradición', 'sku' => 'ING-037', 'unit_id' => $ud, 'supplier_id' => $suppliers['Panadería Artesana Ovidio'], 'cost_per_unit' => 0.45, 'waste_percentage' => 5, 'allergens' => ['gluten']],

            // Otros / Inactivos
            ['name' => 'Vino Blanco Cocina', 'sku' => 'ING-038', 'unit_id' => $l, 'supplier_id' => $suppliers['Bodegas Velázquez'], 'cost_per_unit' => 2.50, 'waste_percentage' => 0, 'allergens' => ['sulfitos']],
            ['name' => 'Cerveza Lager Barril', 'sku' => 'ING-039', 'unit_id' => $l, 'supplier_id' => $suppliers['Bebidas Mundiales'], 'cost_per_unit' => 1.85, 'waste_percentage' => 2, 'allergens' => ['gluten']],
            ['name' => 'Ingrediente Descatalogado', 'sku' => 'OLD-999', 'unit_id' => $kg, 'supplier_id' => $suppliers['Proveedor Inactivo Antiguo'], 'cost_per_unit' => 5.00, 'waste_percentage' => 0, 'is_active' => false, 'allergens' => []],
        ];

        foreach ($ingredientsData as $data) {
            $allergenCodes = $data['allergens'] ?? [];
            unset($data['allergens']);

            $slug = Str::slug($data['name']);
            $sourceFile = __DIR__."/data/{$slug}.png";

            if (file_exists($sourceFile)) {
                $path = "images/ingredients/{$slug}.png";
                Storage::disk('public')->put($path, file_get_contents($sourceFile));
                $data['image_url'] = '/storage/'.$path;
            } else {
                $data['image_url'] = null;
            }

            $ingredient = Ingredient::updateOrCreate(['sku' => $data['sku']], $data);

            $allergenIds = array_map(fn ($code) => $allergens[$code], $allergenCodes);
            $ingredient->allergens()->sync($allergenIds);
        }
    }
}
