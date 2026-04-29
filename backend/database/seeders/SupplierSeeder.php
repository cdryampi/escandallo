<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    public function run(): void
    {
        $suppliers = [
            ['name' => 'Mercamadrid Central', 'contact_name' => 'Juan Pérez', 'email' => 'juan@mercamadrid.test', 'phone' => '912345678', 'is_active' => true],
            ['name' => 'Carnes Sierra Madrid', 'contact_name' => 'Luis García', 'email' => 'pedidos@sierramadrid.test', 'phone' => '913456789', 'is_active' => true],
            ['name' => 'Pescados del Cantábrico', 'contact_name' => 'Marta Cantos', 'email' => 'marta@cantabrico.test', 'phone' => '942123456', 'is_active' => true],
            ['name' => 'Lácteos la Granja', 'contact_name' => 'Antonio Ruíz', 'email' => 'ventas@lagranja.test', 'phone' => '914567890', 'is_active' => true],
            ['name' => 'Bebidas Mundiales', 'contact_name' => 'Sonia Soler', 'email' => 'sonia@bebidas.test', 'phone' => '915678901', 'is_active' => true],
            ['name' => 'Suministros Limpieza S.L.', 'contact_name' => 'Pedro Sánchez', 'email' => 'pedro@limpieza.test', 'phone' => '916789012', 'is_active' => false],
            ['name' => 'Frutas Doña Ana', 'contact_name' => 'Ana Belén', 'email' => 'ana@frutasana.test', 'phone' => '917890123', 'is_active' => true],
            ['name' => 'Congelados Ártico', 'contact_name' => 'Roberto Carlos', 'email' => 'r.carlos@artico.test', 'phone' => '918901234', 'is_active' => true],
            ['name' => 'Panadería Artesana Ovidio', 'contact_name' => 'Ovidio Peris', 'email' => 'ovidio@panartesana.test', 'phone' => '919012345', 'is_active' => true],
            ['name' => 'Gourmet Mediterráneo', 'contact_name' => 'Elena Nito', 'email' => 'elena@gourmetmed.test', 'phone' => '910123456', 'is_active' => true],
            ['name' => 'Especialidades de Oriente', 'contact_name' => 'Lee Sun', 'email' => 'lee@especialidades.test', 'phone' => '911234567', 'is_active' => true],
            ['name' => 'Distribuciones El Cortijo', 'contact_name' => 'Manolo Escobar', 'email' => 'manolo@cortijo.test', 'phone' => '912234567', 'is_active' => true],
            ['name' => 'Bodegas Velázquez', 'contact_name' => 'Diego Silva', 'email' => 'diego@bodegasvel.test', 'phone' => '913345678', 'is_active' => true],
            ['name' => 'Huerta de Aranjuez', 'contact_name' => 'Francisco Lara', 'email' => 'paco@huertaaranjuez.test', 'phone' => '914456789', 'is_active' => true],
            ['name' => 'Proveedor Inactivo Antiguo', 'contact_name' => 'Nadie', 'email' => 'old@inactive.test', 'phone' => '915567890', 'is_active' => false],
        ];

        foreach ($suppliers as $supplier) {
            Supplier::updateOrCreate(['name' => $supplier['name']], $supplier);
        }
    }
}
