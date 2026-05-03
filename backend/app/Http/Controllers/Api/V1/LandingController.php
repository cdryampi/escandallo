<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateLandingModuleRequest;
use App\Http\Requests\UpdateLandingVersionRequest;
use App\Services\LandingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class LandingController extends Controller
{
    public function __construct(
        protected LandingService $landingService
    ) {}

    /**
     * Display a list of "pages" (compatibility with old CMS UI).
     */
    public function index(Request $request): JsonResponse
    {
        Gate::authorize('viewAny', \App\Models\LandingSetting::class);

        return response()->json([
            'data' => [$this->landingService->getPageObject()]
        ]);
    }

    /**
     * Display the CMS menu (compatibility).
     */
    public function menu(): JsonResponse
    {
        return response()->json([
            'data' => [['slug' => 'home', 'label' => 'Inicio']]
        ]);
    }

    /**
     * Display the landing modules.
     */
    public function show(): JsonResponse
    {
        return response()->json([
            'data' => $this->landingService->getSettings()->modules
        ]);
    }

    /**
     * Display a specific page by slug (public).
     */
    public function showPublic(Request $request, string $slug): JsonResponse
    {
        // For now, we only support the 'home' slug which maps to our singleton
        if ($slug !== 'home') {
            return response()->json(['message' => 'Page not found'], 404);
        }

        $page = $this->landingService->getPageObject();

        // If preview is not requested, we only show published blocks
        if ($request->query('preview') !== 'true') {
            $settings = $this->landingService->getSettings();
            $page['blocks'] = $settings->modules['blocks'] ?? [];
        }

        return response()->json([
            'data' => $page
        ]);
    }

    /**
     * Display the "page" details (compatibility with old CMS UI).
     */
    public function showAdmin(Request $request, string|int $id): JsonResponse
    {
        Gate::authorize('view', \App\Models\LandingSetting::class);

        return response()->json([
            'data' => $this->landingService->getPageObject()
        ]);
    }

    /**
     * Create a draft version (compatibility).
     */
    public function createDraft(Request $request, string|int $id): JsonResponse
    {
        Gate::authorize('update', \App\Models\LandingSetting::class);

        $page = $this->landingService->getPageObject();

        return response()->json($page['draft_version']);
    }

    /**
     * Update a specific module.
     */
    public function update(UpdateLandingModuleRequest $request, string $module): JsonResponse
    {
        Gate::authorize('update', \App\Models\LandingSetting::class);

        $data = $this->landingService->updateModule($module, $request->validated());

        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Update the draft version of the page blocks.
     */
    public function updateVersion(UpdateLandingVersionRequest $request, string|int $id): JsonResponse
    {
        $draft = $this->landingService->saveDraft($request->validated()['blocks']);

        return response()->json([
            'message' => 'Draft saved successfully',
            'data' => $draft
        ]);
    }

    /**
     * Publish the draft version to the live site.
     */
    public function publishVersion(Request $request, string|int $id): JsonResponse
    {
        Gate::authorize('update', \App\Models\LandingSetting::class);

        $published = $this->landingService->publish();

        return response()->json([
            'message' => 'Page published successfully',
            'data' => $published
        ]);
    }
}
