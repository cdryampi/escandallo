<?php

namespace App\Http\Controllers;

use App\Http\Resources\PagePublicResource;
use App\Models\Page;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class PageController extends Controller
{
    public function menu(): JsonResponse
    {
        $pages = Page::query()
            ->where('is_active', true)
            ->where('show_in_menu', true)
            ->orderBy('id')
            ->get(['slug', 'name']);

        return response()->json([
            'data' => $pages->map(fn (Page $page) => [
                'slug' => $page->slug === 'home' ? '/' : "/{$page->slug}",
                'label' => $page->name,
            ]),
        ]);
    }

    public function show(Request $request, string $slug): PagePublicResource
    {
        $preview = $request->boolean('preview');

        $query = Page::query()
            ->where('slug', $slug)
            ->with(['publishedVersion', 'draftVersion']);

        if (! $preview) {
            $query->where('is_active', true);
        }

        $page = $query->firstOrFail();

        if ($preview) {
            $user = auth('sanctum')->user();

            if ($user !== null) {
                Gate::forUser($user)->authorize('update', $page);
            }

            if ($user !== null && $page->draftVersion) {
                $page->setRelation('publishedVersion', $page->draftVersion);
            }
        } else {
            if (! $page->publishedVersion) {
                abort(404, 'Page has no published version');
            }
        }

        if (! $preview && ! $page->publishedVersion) {
            abort(404, 'Page has no published version');
        }

        return new PagePublicResource($page);
    }
}
