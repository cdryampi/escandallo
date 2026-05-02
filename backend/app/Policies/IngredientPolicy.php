<?php

namespace App\Policies;

use App\Models\Ingredient;
use App\Models\User;

class IngredientPolicy
{
    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Ingredient $ingredient): bool
    {
        return $user->is_admin;
    }

    /**
     * Determine whether the user can delete the model image.
     */
    public function deleteImage(User $user, Ingredient $ingredient): bool
    {
        return $user->is_admin;
    }
}
