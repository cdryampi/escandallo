<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\PageVersion;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            [
                'slug' => 'home',
                'name' => 'Inicio',
                'blocks' => [
                    [
                        'id' => (string) Str::uuid(),
                        'type' => 'HeroBlock',
                        'is_visible' => true,
                        'data' => [
                            'title' => 'Bienvenido a Escandallo',
                            'subtitle' => 'La precisión culinaria que tu negocio necesita.',
                            'cta_text' => 'Ver Carta',
                            'cta_url' => '/carta',
                        ],
                    ],
                ],
            ],
            [
                'slug' => 'carta',
                'name' => 'Nuestra Carta',
                'blocks' => [
                    [
                        'id' => (string) Str::uuid(),
                        'type' => 'HeroBlock',
                        'is_visible' => true,
                        'data' => [
                            'title' => 'Nuestra Carta',
                            'subtitle' => 'Descubre nuestros platos seleccionados.',
                        ],
                    ],
                ],
            ],
            [
                'slug' => 'contacto',
                'name' => 'Contacto',
                'blocks' => [
                    [
                        'id' => (string) Str::uuid(),
                        'type' => 'ContactFormBlock',
                        'is_visible' => true,
                        'data' => [
                            'heading' => 'Ponte en contacto con nosotros',
                            'recipient_email' => 'info@escandallo.test',
                            'success_message' => '¡Mensaje enviado con éxito!',
                        ],
                    ],
                ],
            ],
            [
                'slug' => 'legal',
                'name' => 'Aviso Legal',
                'blocks' => [
                    [
                        'id' => (string) Str::uuid(),
                        'type' => 'RichTextBlock',
                        'is_visible' => true,
                        'data' => [
                            'content' => '<h1>Aviso Legal</h1><p>Contenido legal aquí...</p>',
                        ],
                    ],
                ],
            ],
            [
                'slug' => 'privacidad',
                'name' => 'Política de Privacidad',
                'blocks' => [
                    [
                        'id' => (string) Str::uuid(),
                        'type' => 'RichTextBlock',
                        'is_visible' => true,
                        'data' => [
                            'content' => '<h1>Política de Privacidad</h1><p>Contenido de privacidad aquí...</p>',
                        ],
                    ],
                ],
            ],
        ];

        foreach ($pages as $pageData) {
            $blocks = $pageData['blocks'];
            unset($pageData['blocks']);

            $page = Page::create($pageData);

            PageVersion::create([
                'page_id' => $page->id,
                'status' => 'published',
                'version_number' => 1,
                'blocks' => $blocks,
                'published_at' => now(),
            ]);
        }
    }
}
