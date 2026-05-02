<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageVersionResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'page_id' => $this->page_id,
            'status' => $this->status,
            'version_number' => $this->version_number,
            'blocks' => $this->blocks ?? [],
            'created_by' => $this->created_by,
            'published_at' => $this->published_at?->toIso8601String(),
            'meta_title' => $this->page?->meta_title,
            'meta_description' => $this->page?->meta_description,
            'meta_image_url' => $this->page?->meta_image_url,
            'show_in_menu' => $this->page?->show_in_menu ?? false,
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
