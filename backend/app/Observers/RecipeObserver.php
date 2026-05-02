<?php

namespace App\Observers;

use App\Models\Recipe;
use App\Services\ImageService;

class RecipeObserver
{
    public function __construct(protected ImageService $imageService) {}

    /**
     * Handle the Recipe "deleted" event.
     */
    public function deleted(Recipe $recipe): void
    {
        if ($recipe->image_url) {
            $this->imageService->delete($recipe->image_url);
        }
    }
}
