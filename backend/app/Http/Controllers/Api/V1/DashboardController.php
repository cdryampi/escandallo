<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use App\Models\Ingredient;
use App\Models\Page;
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

        // Simple mock calculations for now as we don't have price history/margins stored
        $avgCost = Recipe::count() > 0 ? 5.25 : 0; // Mock average cost
        $avgMargin = Recipe::count() > 0 ? 72.4 : 0; // Mock average margin
        $ingredientsInAlert = Ingredient::where('is_active', true)->limit(3)->count(); // Mock alert count

        $latestRecipes = Recipe::query()
            ->latest('updated_at')
            ->limit(5)
            ->get()
            ->map(function ($recipe) {
                return [
                    'id' => $recipe->id,
                    'name' => $recipe->name,
                    'updated_at' => $recipe->updated_at,
                    'cost' => 12.50, // Mock
                    'margin' => 75, // Mock
                    'status' => $recipe->status,
                ];
            });

        $contactCounts = [
            'new' => ContactSubmission::query()->where('status', 'new')->count(),
            'read' => ContactSubmission::query()->where('status', 'read')->count(),
            'resolved' => ContactSubmission::query()->where('status', 'resolved')->count(),
        ];

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
                'avg_cost_per_plate' => $avgCost,
                'avg_profit_margin' => $avgMargin,
                'ingredients_in_alert_count' => $ingredientsInAlert,
                'latest_recipes' => $latestRecipes,
                'cms' => [
                    'total_pages' => Page::query()->count(),
                    'active_pages' => Page::query()->where('is_active', true)->count(),
                    'pages_with_draft' => Page::query()->whereHas('draftVersion')->count(),
                    'published_pages' => Page::query()->whereHas('publishedVersion')->count(),
                    'contact_submissions' => $contactCounts,
                ],
            ],
        ]);
    }
}
