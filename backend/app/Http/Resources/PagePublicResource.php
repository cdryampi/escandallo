<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PagePublicResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $publishedVersion = $this->publishedVersion;

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'meta_image_url' => $this->meta_image_url,
            'blocks' => $publishedVersion ? $publishedVersion->blocks : [],
            'published_at' => $publishedVersion?->published_at?->toIso8601String(),
        ];
    }
}
