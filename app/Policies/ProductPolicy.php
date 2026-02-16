<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Product;

class ProductPolicy
{
    /**
     * Determine whether the user can create products.
     */
    public function create(?User $user): bool
    {
        return $user !== null; // allow any authenticated user; refine as needed
    }
}
