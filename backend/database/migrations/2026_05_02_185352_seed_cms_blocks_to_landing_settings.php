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
            
            // Seed a full set of blocks for the landing page
            $modules['blocks'] = [
                [
                    'id' => 'hero-1',
                    'type' => 'HeroBlock',
                    'is_visible' => true,
                    'data' => [
                        'title' => 'Gestión de Escandallos con Precisión',
                        'subtitle' => 'Optimiza tus costes, estandariza tus recetas y maximiza la rentabilidad de tu cocina con nuestra plataforma profesional.',
                        'image_url' => '/images/hero-home.jpg',
                        'cta_text' => 'Comenzar Ahora',
                        'cta_url' => '/login'
                    ]
                ],
                [
                    'id' => 'rich-text-1',
                    'type' => 'RichTextBlock',
                    'is_visible' => true,
                    'data' => [
                        'content' => '<h2>La herramienta definitiva para chefs y gestores</h2><p>Escandallo es una solución diseñada por y para profesionales de la hostelería. Olvídate de las hojas de cálculo inconexas y toma el control total de tu materia prima.</p>'
                    ]
                ],
                [
                    'id' => 'features-1',
                    'type' => 'FeatureListBlock',
                    'is_visible' => true,
                    'data' => [
                        'title' => '¿Por qué elegir nuestra plataforma?',
                        'features' => [
                            [
                                'title' => 'Cálculo de Mermas Real',
                                'description' => 'Ajusta tus costes según el rendimiento real de cada ingrediente procesado.',
                                'icon' => 'PieChart'
                            ],
                            [
                                'title' => 'Control de Alérgenos',
                                'description' => 'Genera fichas técnicas automáticas con toda la información de seguridad alimentaria.',
                                'icon' => 'ShieldCheck'
                            ],
                            [
                                'title' => 'Análisis de Márgenes',
                                'description' => 'Visualiza el beneficio real de cada plato comparando coste vs precio de venta.',
                                'icon' => 'TrendingUp'
                            ]
                        ]
                    ]
                ],
                [
                    'id' => 'highlights-1',
                    'type' => 'MenuHighlightsBlock',
                    'is_visible' => true,
                    'data' => [
                        'title' => 'Recetas Destacadas',
                        'recipe_ids' => [1, 2, 3] // IDs de ejemplo del seed de recetas
                    ]
                ],
                [
                    'id' => 'contact-1',
                    'type' => 'ContactFormBlock',
                    'is_visible' => true,
                    'data' => [
                        'heading' => '¿Necesitas una demo personalizada?',
                        'recipient_email' => 'ventas@escandallo.test',
                        'success_message' => '¡Gracias! Nos pondremos en contacto contigo pronto.'
                    ]
                ]
            ];

            // Initialize draft_blocks with the same content
            $modules['draft_blocks'] = $modules['blocks'];

            $settings->modules = $modules;
            $settings->save();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $settings = LandingSetting::find(1);
        if ($settings) {
            $modules = $settings->modules;
            unset($modules['blocks']);
            unset($modules['draft_blocks']);
            $settings->modules = $modules;
            $settings->save();
        }
    }
};
