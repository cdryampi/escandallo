<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadCmsMediaRequest;
use App\Models\Page;
use App\Services\ImageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;

class MediaController extends Controller
{
    public function __construct(protected ImageService $imageService) {}

    /**
     * List all CMS media.
     */
    public function index(): JsonResponse
    {
        Gate::authorize('viewAny', Page::class);

        $urls = $this->imageService->list('cms');

        return response()->json([
            'data' => array_map(fn ($url) => ['url' => $url], $urls),
        ]);
    }

    /**
     * Upload an image and return the URL.
     */
    public function upload(UploadCmsMediaRequest $request): JsonResponse
    {
        Gate::authorize('uploadMedia', Page::class);

        $url = $this->imageService->store($request->file('file'), 'cms');

        return response()->json([
            'message' => 'CMS media uploaded successfully.',
            'data' => [
                'url' => $url,
            ],
        ]);
    }
}
