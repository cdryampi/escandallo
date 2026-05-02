<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdatePageVersionRequest;
use App\Http\Resources\PageResource;
use App\Http\Resources\PageVersionResource;
use App\Models\Page;
use App\Models\PageVersion;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class PageController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        Gate::authorize('viewAny', Page::class);

        $pages = Page::query()
            ->with(['publishedVersion', 'draftVersion'])
            ->orderBy('id')
            ->get();

        return PageResource::collection($pages);
    }

    public function show(Page $page): PageResource
    {
        Gate::authorize('view', $page);

        return new PageResource($page->load([
            'publishedVersion',
            'draftVersion',
            'versions' => fn ($query) => $query->orderByDesc('version_number'),
        ]));
    }

    public function getDraft(Page $page): JsonResponse
    {
        Gate::authorize('update', $page);

        $draft = $page->draftVersion;

        if (! $draft) {
            $lastPublished = $page->publishedVersion;

            $draft = PageVersion::create([
                'page_id' => $page->id,
                'status' => 'draft',
                'version_number' => ($lastPublished?->version_number ?? 0) + 1,
                'blocks' => $lastPublished?->blocks ?? [],
                'created_by' => auth()->id(),
            ]);
        }

        return response()->json([
            'data' => new PageVersionResource($draft->loadMissing('page')),
        ]);
    }

    public function updateVersion(UpdatePageVersionRequest $request, PageVersion $version): JsonResponse
    {
        Gate::authorize('update', $version->page);

        $validated = $request->validated();

        DB::transaction(function () use ($validated, $version): void {
            if (array_key_exists('blocks', $validated)) {
                $version->update(['blocks' => $validated['blocks']]);
            }

            $pageData = [];

            foreach (['meta_title', 'meta_description', 'meta_image_url', 'show_in_menu', 'is_active'] as $field) {
                if (! array_key_exists($field, $validated)) {
                    continue;
                }

                $pageData[$field] = match ($field) {
                    'show_in_menu', 'is_active' => (bool) $validated[$field],
                    default => ($validated[$field] !== '' && $validated[$field] !== null) ? $validated[$field] : null,
                };
            }

            if ($pageData !== []) {
                $version->page->update($pageData);
            }
        });

        return response()->json([
            'data' => new PageVersionResource($version->fresh()->load('page')),
        ]);
    }

    public function publish(PageVersion $version): JsonResponse
    {
        Gate::authorize('publish', $version->page);

        DB::transaction(function () use ($version): void {
            PageVersion::query()
                ->where('page_id', $version->page_id)
                ->where('status', 'published')
                ->update(['status' => 'archived']);

            PageVersion::query()
                ->where('page_id', $version->page_id)
                ->where('status', 'draft')
                ->where('id', '!=', $version->id)
                ->update(['status' => 'archived']);

            $version->update([
                'status' => 'published',
                'published_at' => now(),
            ]);
        });

        return response()->json([
            'data' => new PageVersionResource($version->fresh()->load('page')),
        ]);
    }
}
