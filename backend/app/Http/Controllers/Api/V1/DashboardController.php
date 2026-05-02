<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\Supplier;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $recipesByStatus = Recipe::query()
            ->selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        return response()->json([
            'data' => [
                'total_ingredients' => Ingredient::count(),
                'active_ingredients' => Ingredient::where('is_active', true)->count(),
                'inactive_ingredients' => Ingredient::where('is_active', false)->count(),
                'total_recipes' => Recipe::count(),
                'recipes_by_status' => [
                    'draft' => $recipesByStatus->get('draft', 0),
                    'active' => $recipesByStatus->get('active', 0),
                    'archived' => $recipesByStatus->get('archived', 0),
                ],
                'total_suppliers' => Supplier::count(),
                'active_suppliers' => Supplier::where('is_active', true)->count(),
                'ingredients_with_images' => Ingredient::whereNotNull('image_url')->count(),
                'recipes_with_images' => Recipe::whereNotNull('image_url')->count(),
            ],
        ]);
    }
}
