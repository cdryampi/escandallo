<?php

namespace App\Policies;

use App\Models\ContactSubmission;
use App\Models\User;

class ContactSubmissionPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->is_admin === true;
    }

    public function view(User $user, ContactSubmission $contactSubmission): bool
    {
        return $user->is_admin === true;
    }

    public function update(User $user, ContactSubmission $contactSubmission): bool
    {
        return $user->is_admin === true;
    }
}
