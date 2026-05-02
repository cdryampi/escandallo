<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('page_versions');
        Schema::dropIfExists('pages');

        Schema::create('landing_settings', function (Blueprint $table) {
            $table->id();
            $table->json('modules');
            $table->timestamps();
        });

        DB::table('landing_settings')->insert([
            'id' => 1,
            'modules' => json_encode([
                'topbar' => [],
                'hero' => [],
                'menu' => [],
                'agenda' => [],
                'map' => []
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('landing_settings');
    }
};
