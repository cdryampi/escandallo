<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactSubmissionRequest;
use App\Http\Resources\ContactSubmissionResource;
use App\Models\ContactSubmission;
use Illuminate\Http\JsonResponse;

class PublicContactSubmissionController extends Controller
{
    public function store(StoreContactSubmissionRequest $request): JsonResponse
    {
        $submission = ContactSubmission::create([
            ...$request->validated(),
            'status' => 'new',
        ]);

        return response()->json([
            'message' => 'Consulta enviada correctamente.',
            'data' => new ContactSubmissionResource($submission->load('page')),
        ], 201);
    }
}
