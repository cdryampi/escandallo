<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecipeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'code' => null, // Not in schema yet
            'description' => $this->description,
            'category' => $this->category,
            'yield_portions' => $this->yield_portions,
            'status' => $this->status,
            'image_url' => $this->image_url,
            'is_subrecipe' => false, // Not in schema yet
            'selling_price' => null, // Not in schema yet
            'estimated_cost' => null, // Requires unit conversion system
            'items_count' => $this->whenCounted('items'),
            'items' => RecipeItemResource::collection($this->whenLoaded('items')),
        ];
    }
}
