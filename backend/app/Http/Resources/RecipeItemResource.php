<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecipeItemResource extends JsonResource
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
            'ingredient_id' => $this->ingredient_id,
            'ingredient_name' => $this->whenLoaded('ingredient', fn () => $this->ingredient->name),
            'quantity' => $this->quantity,
            'unit' => new UnitResource($this->whenLoaded('unit')),
            'notes' => $this->notes,
            'sort_order' => $this->sort_order,
        ];
    }
}
