<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateImageRequest;
use App\Http\Resources\IngredientResource;
use App\Models\Ingredient;
use App\Services\ImageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class IngredientController extends Controller
{
    public function __construct(protected ImageService $imageService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        $ingredients = Ingredient::with(['unit', 'supplier'])
            ->when(request('search'), function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('sku', 'like', "%{$search}%");
                });
            })
            ->when(request('status'), function ($query, $status) {
                $query->where('is_active', $status === 'active');
            })
            ->orderBy(request('sort', 'created_at'), request('direction', 'desc'))
            ->paginate(request('per_page', 15));

        return IngredientResource::collection($ingredients);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ingredient $ingredient): IngredientResource
    {
        return new IngredientResource($ingredient->load(['unit', 'supplier', 'allergens']));
    }

    /**
     * Update the image for a specific ingredient.
     */
    public function updateImage(UpdateImageRequest $request, Ingredient $ingredient): JsonResponse
    {
        $oldUrl = $ingredient->image_url;
        $newUrl = $this->imageService->store($request->file('image'), 'ingredients');

        try {
            DB::transaction(function () use ($ingredient, $newUrl) {
                $ingredient->update(['image_url' => $newUrl]);
            });

            // Cleanup old file only after DB success
            if ($oldUrl) {
                $this->imageService->delete($oldUrl);
            }
        } catch (\Exception $e) {
            // Cleanup new file if DB failed
            $this->imageService->delete($newUrl);
            throw $e;
        }

        return response()->json([
            'message' => 'Ingredient image updated successfully.',
            'data' => [
                'image_url' => $newUrl,
            ],
        ]);
    }

    /**
     * Remove the image for a specific ingredient.
     */
    public function deleteImage(Ingredient $ingredient): JsonResponse
    {
        Gate::authorize('deleteImage', $ingredient);

        $oldUrl = $ingredient->image_url;
        if ($oldUrl) {
            DB::transaction(function () use ($ingredient) {
                $ingredient->update(['image_url' => null]);
            });

            $this->imageService->delete($oldUrl);
        }

        return response()->json([
            'message' => 'Ingredient image deleted successfully.',
        ]);
    }
}
