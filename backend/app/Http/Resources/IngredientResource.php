<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IngredientResource extends JsonResource
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
            'sku' => $this->sku,
            'image_url' => $this->image_url,
            'is_active' => (bool) $this->is_active,
            'cost_per_unit' => $this->cost_per_unit,
            'default_waste_percentage' => $this->waste_percentage,
            'default_yield_percentage' => $this->yield_percentage,
            'notes' => $this->notes,
            'base_unit' => new UnitResource($this->whenLoaded('unit')),
            'supplier' => new SupplierResource($this->whenLoaded('supplier')),
            'allergens' => JsonResource::collection($this->whenLoaded('allergens')),
        ];
    }
}
