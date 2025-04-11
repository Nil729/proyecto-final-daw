<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Viatge;
use Illuminate\Auth\Access\Response;

class ViatgePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // Replace this with your logic
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Viatge $viatge): bool
    {
        return true; // Replace this with your logic
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true; // Replace this with your logic
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Viatge $viatge): bool
    {
        return $viatge->usuari()->is($user); // mirem si l'usuari que vol fer l'acció és el mateix que l'usuari que ha creat el viatge
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Viatge $viatge): bool
    {
        return $viatge->usuari()->is($user);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Viatge $viatge): bool
    {
        return true; // Replace this with your logic
    }

}
