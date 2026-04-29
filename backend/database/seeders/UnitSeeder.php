<?php

namespace Database\Seeders;

use App\Models\Unit;
use Illuminate\Database\Seeder;

class UnitSeeder extends Seeder
{
    public function run(): void
    {
        $units = [
            ['name' => 'Kilogramo', 'symbol' => 'kg'],
            ['name' => 'Gramo', 'symbol' => 'g'],
            ['name' => 'Litro', 'symbol' => 'l'],
            ['name' => 'Mililitro', 'symbol' => 'ml'],
            ['name' => 'Unidad', 'symbol' => 'ud'],
            ['name' => 'Bandeja', 'symbol' => 'band'],
            ['name' => 'Botella', 'symbol' => 'bot'],
            ['name' => 'Lata', 'symbol' => 'lata'],
            ['name' => 'Caja', 'symbol' => 'caja'],
            ['name' => 'Ración', 'symbol' => 'rac'],
        ];

        foreach ($units as $unit) {
            Unit::firstOrCreate(['symbol' => $unit['symbol']], $unit);
        }
    }
}
