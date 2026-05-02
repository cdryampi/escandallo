<?php

use App\Models\LandingSetting;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $settings = LandingSetting::find(1);
        
        if ($settings) {
            $modules = $settings->modules;
            
            if (!isset($modules['branding'])) {
                $modules['branding'] = [
                    'name' => 'Nuestro Restaurante',
                    'tagline' => 'Una experiencia gastronómica única'
                ];
            }
            
            if (!isset($modules['footer'])) {
                $modules['footer'] = [
                    'address' => 'Calle Principal 123, Ciudad',
                    'email' => 'contacto@restaurante.test',
                    'phone' => '+34 900 000 000',
                    'social_links' => [
                        'instagram' => '#',
                        'facebook' => '#'
                    ]
                ];
            }

            $settings->modules = $modules;
            $settings->save();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No revert needed for data update
    }
};
