<?php

namespace App\Observers;

use App\Models\Ingredient;
use App\Services\ImageService;

class IngredientObserver
{
    public function __construct(protected ImageService $imageService) {}

    /**
     * Handle the Ingredient "deleted" event.
     */
    public function deleted(Ingredient $ingredient): void
    {
        if ($ingredient->image_url) {
            $this->imageService->delete($ingredient->image_url);
        }
    }
}
