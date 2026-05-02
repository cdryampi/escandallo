<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('pages')) {
            Schema::create('pages', function (Blueprint $table) {
                $table->id();
                $table->string('slug')->unique();
                $table->string('name');
                $table->boolean('is_active')->default(true);
                $table->boolean('show_in_menu')->default(false);
                $table->string('meta_title')->nullable();
                $table->text('meta_description')->nullable();
                $table->string('meta_image_url')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('page_versions')) {
            Schema::create('page_versions', function (Blueprint $table) {
                $table->id();
                $table->foreignId('page_id')->constrained()->onDelete('cascade');
                $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
                $table->integer('version_number')->default(1);
                $table->json('blocks')->nullable();
                $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamp('published_at')->nullable();
                $table->timestamps();
            });
        }

        $pages = $this->seedPages();

        foreach ($pages as $page) {
            $existingPage = DB::table('pages')->where('slug', $page['slug'])->first();

            $pageId = $existingPage?->id ?? DB::table('pages')->insertGetId([
                'slug' => $page['slug'],
                'name' => $page['name'],
                'is_active' => $page['is_active'],
                'show_in_menu' => $page['show_in_menu'],
                'meta_title' => $page['meta_title'],
                'meta_description' => $page['meta_description'],
                'meta_image_url' => $page['meta_image_url'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            if ($existingPage !== null) {
                DB::table('pages')
                    ->where('id', $pageId)
                    ->update([
                        'name' => $page['name'],
                        'is_active' => $page['is_active'],
                        'show_in_menu' => $page['show_in_menu'],
                        'meta_title' => $page['meta_title'],
                        'meta_description' => $page['meta_description'],
                        'meta_image_url' => $page['meta_image_url'],
                        'updated_at' => now(),
                    ]);
            }

            $publishedVersion = DB::table('page_versions')
                ->where('page_id', $pageId)
                ->where('status', 'published')
                ->first();

            if ($publishedVersion === null) {
                DB::table('page_versions')->insert([
                    'page_id' => $pageId,
                    'status' => 'published',
                    'version_number' => 1,
                    'blocks' => json_encode($page['published_blocks'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                    'created_by' => null,
                    'published_at' => now(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            if ($page['draft_blocks'] === null || $page['draft_blocks'] === $page['published_blocks']) {
                continue;
            }

            $draftVersion = DB::table('page_versions')
                ->where('page_id', $pageId)
                ->where('status', 'draft')
                ->first();

            if ($draftVersion === null) {
                DB::table('page_versions')->insert([
                    'page_id' => $pageId,
                    'status' => 'draft',
                    'version_number' => 2,
                    'blocks' => json_encode($page['draft_blocks'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                    'created_by' => null,
                    'published_at' => null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('page_versions');
        Schema::dropIfExists('pages');
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function seedPages(): array
    {
        $landingModules = [];

        if (Schema::hasTable('landing_settings')) {
            $landing = DB::table('landing_settings')->where('id', 1)->first();
            $landingModules = is_string($landing?->modules)
                ? json_decode($landing->modules, true) ?? []
                : [];
        }

        $branding = is_array($landingModules['branding'] ?? null) ? $landingModules['branding'] : [];
        $homePublishedBlocks = $this->normalizeBlocks($landingModules['blocks'] ?? $this->defaultHomeBlocks());
        $homeDraftBlocks = array_key_exists('draft_blocks', $landingModules)
            ? $this->normalizeBlocks($landingModules['draft_blocks'])
            : null;

        return [
            [
                'slug' => 'home',
                'name' => 'Inicio',
                'is_active' => true,
                'show_in_menu' => true,
                'meta_title' => $branding['name'] ?? 'Inicio',
                'meta_description' => $branding['tagline'] ?? 'Gestión profesional de escandallos y costes gastronómicos.',
                'meta_image_url' => null,
                'published_blocks' => $homePublishedBlocks,
                'draft_blocks' => $homeDraftBlocks,
            ],
            [
                'slug' => 'carta',
                'name' => 'Carta',
                'is_active' => true,
                'show_in_menu' => true,
                'meta_title' => 'Carta',
                'meta_description' => 'Descubre una selección de platos y propuestas destacadas.',
                'meta_image_url' => null,
                'published_blocks' => [
                    $this->richTextBlock('carta-intro', '<h1>Nuestra Carta</h1><p>Consulta aquí propuestas destacadas, sugerencias de temporada y contenido editorial de la carta.</p>'),
                ],
                'draft_blocks' => null,
            ],
            [
                'slug' => 'contacto',
                'name' => 'Contacto',
                'is_active' => true,
                'show_in_menu' => true,
                'meta_title' => 'Contacto',
                'meta_description' => 'Habla con nuestro equipo y envíanos tu consulta.',
                'meta_image_url' => null,
                'published_blocks' => [
                    $this->richTextBlock('contacto-intro', '<h1>Contacto</h1><p>Comparte tu consulta y nuestro equipo te responderá lo antes posible.</p>'),
                    [
                        'id' => 'contacto-form',
                        'type' => 'ContactFormBlock',
                        'is_visible' => true,
                        'data' => [
                            'heading' => 'Escríbenos',
                            'recipient_email' => 'info@escandallo.test',
                            'success_message' => 'Gracias. Hemos recibido tu mensaje.',
                        ],
                    ],
                ],
                'draft_blocks' => null,
            ],
            [
                'slug' => 'legal',
                'name' => 'Aviso Legal',
                'is_active' => true,
                'show_in_menu' => false,
                'meta_title' => 'Aviso Legal',
                'meta_description' => 'Información legal del sitio.',
                'meta_image_url' => null,
                'published_blocks' => [
                    $this->richTextBlock('legal-body', '<h1>Aviso Legal</h1><p>Este espacio queda preparado para contenido legal editable desde el CMS.</p>'),
                ],
                'draft_blocks' => null,
            ],
            [
                'slug' => 'privacidad',
                'name' => 'Privacidad',
                'is_active' => true,
                'show_in_menu' => false,
                'meta_title' => 'Privacidad',
                'meta_description' => 'Política de privacidad del sitio.',
                'meta_image_url' => null,
                'published_blocks' => [
                    $this->richTextBlock('privacidad-body', '<h1>Privacidad</h1><p>Este espacio queda preparado para la política de privacidad editable desde el CMS.</p>'),
                ],
                'draft_blocks' => null,
            ],
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function defaultHomeBlocks(): array
    {
        return [
            [
                'id' => 'home-hero',
                'type' => 'HeroBlock',
                'is_visible' => true,
                'data' => [
                    'title' => 'Gestión de escandallos con precisión',
                    'subtitle' => 'Controla costes, recetas y márgenes desde una base operativa clara.',
                    'image_url' => '',
                    'cta_text' => 'Acceso staff',
                    'cta_url' => '/login',
                ],
            ],
            $this->richTextBlock('home-intro', '<h2>CMS multi-página preparado</h2><p>Este contenido inicial sirve como base editable para la portada pública del proyecto.</p>'),
        ];
    }

    /**
     * @param mixed $blocks
     * @return array<int, array<string, mixed>>
     */
    private function normalizeBlocks(mixed $blocks): array
    {
        return is_array($blocks) ? $blocks : [];
    }

    /**
     * @return array<string, mixed>
     */
    private function richTextBlock(string $id, string $content): array
    {
        return [
            'id' => $id,
            'type' => 'RichTextBlock',
            'is_visible' => true,
            'data' => [
                'content' => $content,
            ],
        ];
    }
};
