<?php

use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\ContactSubmissionController as AdminContactSubmissionController;
use App\Http\Controllers\Admin\PageController as AdminPageController;
use App\Http\Controllers\Api\V1\DashboardController;
use App\Http\Controllers\Api\V1\PublicContactSubmissionController;
use App\Http\Controllers\Api\V1\IngredientController;
use App\Http\Controllers\Api\V1\PublicRecipeController;
use App\Http\Controllers\Api\V1\RecipeController;
use App\Http\Controllers\PageController as PublicPageController;
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
        Route::get('pages', [AdminPageController::class, 'index']);
        Route::get('pages/{page}', [AdminPageController::class, 'show']);
        Route::post('pages/{page}/draft', [AdminPageController::class, 'getDraft']);
        Route::put('pages/versions/{version}', [AdminPageController::class, 'updateVersion']);
        Route::post('pages/versions/{version}/publish', [AdminPageController::class, 'publish']);
        Route::get('contact-submissions', [AdminContactSubmissionController::class, 'index']);
        Route::get('contact-submissions/{contactSubmission}', [AdminContactSubmissionController::class, 'show']);
        Route::patch('contact-submissions/{contactSubmission}', [AdminContactSubmissionController::class, 'update']);
        Route::patch('landing/{module}', [App\Http\Controllers\Api\V1\LandingController::class, 'update']);
        Route::get('media', [MediaController::class, 'index']);
        Route::post('media/upload', [MediaController::class, 'upload']);
    });
});

// Public CMS
Route::get('landing', [App\Http\Controllers\Api\V1\LandingController::class, 'show']);
Route::get('pages/{slug}', [PublicPageController::class, 'show']);
Route::get('cms/menu', [PublicPageController::class, 'menu']);
Route::get('public/recipes', [PublicRecipeController::class, 'index']);
Route::post('contact-submissions', [PublicContactSubmissionController::class, 'store'])->middleware('throttle:5,1');
