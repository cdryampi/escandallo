<?php

namespace App\Policies;

use App\Models\Recipe;
use App\Models\User;

class RecipePolicy
{
    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Recipe $recipe): bool
    {
        return $user->is_admin;
    }

    /**
     * Determine whether the user can delete the model image.
     */
    public function deleteImage(User $user, Recipe $recipe): bool
    {
        return $user->is_admin;
    }
}
