<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'is_active' => $this->is_active,
            'show_in_menu' => $this->show_in_menu,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'meta_image_url' => $this->meta_image_url,
            'blocks' => $this->draftVersion?->blocks
                ?? $this->publishedVersion?->blocks
                ?? [],
            'published_version' => new PageVersionResource($this->whenLoaded('publishedVersion')),
            'draft_version' => new PageVersionResource($this->whenLoaded('draftVersion')),
            'versions' => PageVersionResource::collection($this->whenLoaded('versions')),
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
