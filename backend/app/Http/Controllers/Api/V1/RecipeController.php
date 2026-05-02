<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateImageRequest;
use App\Http\Resources\RecipeResource;
use App\Models\Recipe;
use App\Services\ImageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class RecipeController extends Controller
{
    public function __construct(protected ImageService $imageService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        $recipes = Recipe::withCount('items')
            ->when(request('search'), function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%");
                });
            })
            ->when(request('status'), function ($query, $status) {
                $query->where('status', $status);
            })
            ->when(request('category'), function ($query, $category) {
                $query->where('category', $category);
            })
            ->orderBy(request('sort', 'created_at'), request('direction', 'desc'))
            ->paginate(request('per_page', 15));

        return RecipeResource::collection($recipes);
    }

    /**
     * Display the specified resource.
     */
    public function show(Recipe $recipe): RecipeResource
    {
        return new RecipeResource($recipe->load(['items.ingredient', 'items.unit']));
    }

    /**
     * Update the image for a specific recipe.
     */
    public function updateImage(UpdateImageRequest $request, Recipe $recipe): JsonResponse
    {
        $newUrl = $this->imageService->updateModelImage($recipe, $request->file('image'), 'recipes');

        return response()->json([
            'message' => 'Recipe image updated successfully.',
            'data' => [
                'image_url' => $newUrl,
            ],
        ]);
    }

    /**
     * Remove the image for a specific recipe.
     */
    public function deleteImage(Recipe $recipe): JsonResponse
    {
        Gate::authorize('deleteImage', $recipe);

        $this->imageService->deleteModelImage($recipe);

        return response()->json([
            'message' => 'Recipe image deleted successfully.',
        ]);
    }
}
