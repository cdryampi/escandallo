<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdatePageVersionRequest;
use App\Http\Resources\PageResource;
use App\Http\Resources\PageVersionResource;
use App\Models\Page;
use App\Models\PageVersion;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class PageController extends Controller
{
    /**
     * List all pages.
     */
    public function index(): AnonymousResourceCollection
    {
        Gate::authorize('viewAny', Page::class);

        $pages = Page::with(['publishedVersion', 'draftVersion'])->get();

        return PageResource::collection($pages);
    }

    /**
     * Get a single page with its versions.
     */
    public function show(Page $page): PageResource
    {
        Gate::authorize('view', $page);

        return new PageResource($page->load(['versions' => function ($query) {
            $query->orderBy('version_number', 'desc');
        }]));
    }

    /**
     * Get or create a draft for the page.
     */
    public function getDraft(Page $page): PageVersionResource
    {
        Gate::authorize('update', $page);

        $draft = $page->draftVersion;

        if (! $draft) {
            $lastPublished = $page->publishedVersion;

            $draft = PageVersion::create([
                'page_id' => $page->id,
                'status' => 'draft',
                'version_number' => ($lastPublished ? $lastPublished->version_number : 0) + 1,
                'blocks' => $lastPublished ? $lastPublished->blocks : [],
                'created_by' => auth()->id(),
            ]);
        }

        return new PageVersionResource($draft);
    }

    /**
     * Update a version (usually a draft).
     */
    public function updateVersion(UpdatePageVersionRequest $request, PageVersion $version): PageVersionResource
    {
        Gate::authorize('update', $version->page);

        $validated = $request->validated();

        DB::transaction(function () use ($version, $validated) {
            if (isset($validated['blocks'])) {
                $version->update(['blocks' => $validated['blocks']]);
            }

            $pageData = [];

            foreach (['meta_title', 'meta_description', 'meta_image_url', 'show_in_menu'] as $field) {
                if (! array_key_exists($field, $validated)) {
                    continue;
                }

                $pageData[$field] = ($validated[$field] !== '' && $validated[$field] !== null) ? $validated[$field] : null;
            }

            if (! empty($pageData)) {
                $version->page->update($pageData);
            }
        });

        return new PageVersionResource($version->fresh());
    }

    /**
     * Publish a version.
     */
    public function publish(PageVersion $version): PageVersionResource
    {
        Gate::authorize('publish', $version->page);

        DB::transaction(function () use ($version) {
            // Archive current published version
            PageVersion::where('page_id', $version->page_id)
                ->where('status', 'published')
                ->update(['status' => 'archived']);

            // Publish this version
            $version->update([
                'status' => 'published',
                'published_at' => now(),
            ]);
        });

        return new PageVersionResource($version->fresh());
    }
}
