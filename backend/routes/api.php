<?php

use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Api\V1\DashboardController;
use App\Http\Controllers\Api\V1\IngredientController;
use App\Http\Controllers\Api\V1\PublicRecipeController;
use App\Http\Controllers\Api\V1\RecipeController;
use App\Http\Controllers\PageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'data' => [
            'name' => config('app.name'),
            'version' => 'v1',
            'status' => 'ok',
        ],
        'message' => 'Escandallo API base ready.',
    ]);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/dashboard', DashboardController::class);

    Route::apiResource('ingredients', IngredientController::class)->only(['index', 'show']);
    Route::post('ingredients/{ingredient}/image', [IngredientController::class, 'updateImage']);
    Route::delete('ingredients/{ingredient}/image', [IngredientController::class, 'deleteImage']);

    Route::apiResource('recipes', RecipeController::class)->only(['index', 'show']);
    Route::post('recipes/{recipe}/image', [RecipeController::class, 'updateImage']);
    Route::delete('recipes/{recipe}/image', [RecipeController::class, 'deleteImage']);

    // Admin CMS
    Route::prefix('admin')->group(function () {
        Route::get('pages', [App\Http\Controllers\Admin\PageController::class, 'index']);
        Route::get('pages/{page}', [App\Http\Controllers\Admin\PageController::class, 'show']);
        Route::post('pages/{page}/draft', [App\Http\Controllers\Admin\PageController::class, 'getDraft']);
        Route::put('pages/versions/{version}', [App\Http\Controllers\Admin\PageController::class, 'updateVersion']);
        Route::post('pages/versions/{version}/publish', [App\Http\Controllers\Admin\PageController::class, 'publish']);
        Route::get('media', [MediaController::class, 'index']);
        Route::post('media/upload', [MediaController::class, 'upload']);
    });
});

// Public CMS
Route::get('cms/menu', [PageController::class, 'menu']);
Route::get('pages/{slug}', [PageController::class, 'show']);
Route::get('public/recipes', [PublicRecipeController::class, 'index']);
