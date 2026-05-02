<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PublicRecipeResource;
use App\Models\Recipe;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Collection;

class PublicRecipeController extends Controller
{
    /**
     * Return public recipe summaries for CMS highlight blocks.
     */
    public function index(): AnonymousResourceCollection
    {
        $recipeIds = $this->parseRecipeIds(request()->input('ids', []));

        if ($recipeIds->isEmpty()) {
            return PublicRecipeResource::collection(collect());
        }

        $recipes = Recipe::query()
            ->where('status', 'active')
            ->whereIn('id', $recipeIds->all())
            ->get()
            ->sortBy(fn (Recipe $recipe) => $recipeIds->search($recipe->id))
            ->values();

        return PublicRecipeResource::collection($recipes);
    }

    /**
     * Normalize ids query param from arrays or comma-separated strings.
     */
    protected function parseRecipeIds(mixed $rawIds): Collection
    {
        if (is_string($rawIds)) {
            $rawIds = explode(',', $rawIds);
        }

        if (! is_array($rawIds)) {
            return collect();
        }

        return collect($rawIds)
            ->map(fn (mixed $value) => (int) $value)
            ->filter(fn (int $value) => $value > 0)
            ->unique()
            ->values();
    }
}
