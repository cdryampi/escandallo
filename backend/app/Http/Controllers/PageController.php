<?php

namespace App\Http\Controllers;

use App\Http\Resources\PagePublicResource;
use App\Models\Page;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class PageController extends Controller
{
    /**
     * Get menu items for public site.
     */
    public function menu(): JsonResponse
    {
        $pages = Page::where('is_active', true)
            ->where('show_in_menu', true)
            ->orderBy('id')
            ->get(['slug', 'name']);

        return response()->json([
            'data' => $pages->map(fn ($page) => [
                'slug' => $page->slug === 'home' ? '/' : "/{$page->slug}",
                'label' => $page->name,
            ]),
        ]);
    }

    /**
     * Get the published version (or draft if preview) of a page by its slug.
     */
    public function show(Request $request, string $slug): PagePublicResource
    {
        $preview = $request->boolean('preview');

        $query = Page::where('slug', $slug);

        if (! $preview) {
            $query->where('is_active', true);
        }

        $page = $query->with(['publishedVersion', 'draftVersion'])->firstOrFail();

        if ($preview) {
            // Preview requires admin/editor permissions
            Gate::authorize('update', $page);

            if (! $page->draftVersion) {
                abort(404, 'Page has no draft version for preview');
            }

            // Temporary swap draft to published for the resource to work seamlessly
            $page->setRelation('publishedVersion', $page->draftVersion);
        } else {
            if (! $page->publishedVersion) {
                abort(404, 'Page has no published version');
            }
        }

        return new PagePublicResource($page);
    }
}
