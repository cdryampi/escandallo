<?php

namespace App\Services;

use App\Models\LandingSetting;

class LandingService
{
    /**
     * Get the landing settings singleton.
     */
    public function getSettings(): LandingSetting
    {
        return LandingSetting::current();
    }

    /**
     * Get the emulated page object for compatibility.
     * 
     * @return array<string, mixed>
     */
    public function getPageObject(): array
    {
        $settings = $this->getSettings();
        $blocks = $settings->modules['draft_blocks'] ?? $settings->modules['blocks'] ?? [];
        $branding = $settings->modules['branding'] ?? [];

        $draftVersion = [
            'id' => 1,
            'page_id' => 1,
            'status' => 'draft',
            'version_number' => 1,
            'blocks' => $blocks,
            'meta_title' => $branding['name'] ?? 'Inicio',
            'meta_description' => $branding['tagline'] ?? '',
            'meta_image_url' => null,
            'show_in_menu' => true,
            'created_at' => $settings->created_at->toIso8601String(),
            'updated_at' => $settings->updated_at->toIso8601String(),
        ];

        return [
            'id' => 1,
            'name' => 'Pagina de Inicio',
            'slug' => 'home',
            'is_active' => true,
            'show_in_menu' => true,
            'meta_title' => $branding['name'] ?? 'Inicio',
            'meta_description' => $branding['tagline'] ?? '',
            'meta_image_url' => null,
            'blocks' => $blocks,
            'draft_version' => $draftVersion,
            'published_version' => array_merge($draftVersion, ['id' => 2, 'status' => 'published']),
            'versions' => [],
            'created_at' => $settings->created_at->toIso8601String(),
            'updated_at' => $settings->updated_at->toIso8601String(),
        ];
    }

    /**
     * Update a specific module.
     * 
     * @param string $module
     * @param array<string, mixed> $data
     * @return array<string, mixed>
     */
    public function updateModule(string $module, array $data): array
    {
        $settings = $this->getSettings();
        $modules = $settings->modules;
        $modules[$module] = $data;
        $settings->modules = $modules;
        $settings->save();

        return $modules[$module];
    }

    /**
     * Save a draft version of blocks.
     * 
     * @param array<int, array<string, mixed>> $blocks
     * @return array<string, mixed>
     */
    public function saveDraft(array $blocks): array
    {
        $settings = $this->getSettings();
        $modules = $settings->modules;
        $modules['draft_blocks'] = $blocks;
        $settings->modules = $modules;
        $settings->save();

        $page = $this->getPageObject();
        return $page['draft_version'];
    }

    /**
     * Publish the current draft.
     * 
     * @return array<string, mixed>
     */
    public function publish(): array
    {
        $settings = $this->getSettings();
        $modules = $settings->modules;
        $modules['blocks'] = $modules['draft_blocks'] ?? [];
        $settings->modules = $modules;
        $settings->save();

        $page = $this->getPageObject();
        return $page['published_version'];
    }
}
