<?php

namespace App\Policies;

use App\Models\Page;
use App\Models\User;

class PagePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->is_admin === true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Page $page): bool
    {
        return $user->is_admin === true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Page $page): bool
    {
        return $user->is_admin === true;
    }

    /**
     * Determine whether the user can publish the page version.
     */
    public function publish(User $user, Page $page): bool
    {
        return $user->is_admin === true;
    }

    /**
     * Determine whether the user can upload media.
     */
    public function uploadMedia(User $user): bool
    {
        return $user->is_admin === true;
    }
}
