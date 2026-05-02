<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadCmsMediaRequest;
use App\Services\ImageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    public function __construct(protected ImageService $imageService) {}

    /**
     * List all CMS media.
     */
    public function index(Request $request): JsonResponse
    {
        if (!$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

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
        if (!$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $url = $this->imageService->store($request->file('file'), 'cms');

        return response()->json([
            'message' => 'CMS media uploaded successfully.',
            'data' => [
                'url' => $url,
            ],
        ]);
    }
}
