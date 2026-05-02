<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateContactSubmissionRequest;
use App\Http\Resources\ContactSubmissionResource;
use App\Models\ContactSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ContactSubmissionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        Gate::authorize('viewAny', ContactSubmission::class);

        $status = $request->query('status');

        $query = ContactSubmission::query()
            ->with('page')
            ->latest();

        if (is_string($status) && in_array($status, ['new', 'read', 'resolved'], true)) {
            $query->where('status', $status);
        }

        $submissions = $query->get();

        return response()->json([
            'data' => ContactSubmissionResource::collection($submissions),
            'meta' => [
                'counts' => [
                    'new' => ContactSubmission::query()->where('status', 'new')->count(),
                    'read' => ContactSubmission::query()->where('status', 'read')->count(),
                    'resolved' => ContactSubmission::query()->where('status', 'resolved')->count(),
                ],
            ],
        ]);
    }

    public function show(ContactSubmission $contactSubmission): JsonResponse
    {
        Gate::authorize('view', $contactSubmission);

        return response()->json([
            'data' => new ContactSubmissionResource($contactSubmission->load('page')),
        ]);
    }

    public function update(UpdateContactSubmissionRequest $request, ContactSubmission $contactSubmission): JsonResponse
    {
        Gate::authorize('update', $contactSubmission);

        $status = $request->validated()['status'];

        $contactSubmission->fill([
            'status' => $status,
            'read_at' => in_array($status, ['read', 'resolved'], true)
                ? ($contactSubmission->read_at ?? now())
                : null,
            'resolved_at' => $status === 'resolved' ? now() : null,
        ])->save();

        return response()->json([
            'data' => new ContactSubmissionResource($contactSubmission->fresh()->load('page')),
        ]);
    }
}
