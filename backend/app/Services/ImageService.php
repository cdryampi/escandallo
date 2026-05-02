<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageService
{
    protected string $disk = 'public';

    /**
     * Store an uploaded image.
     */
    public function store(UploadedFile $file, string $directory): string
    {
        $filename = $this->generateFilename($file);
        $path = $file->storeAs("images/{$directory}", $filename, $this->disk);

        return '/storage/'.$path;
    }

    /**
     * List all images in a directory.
     */
    public function list(string $directory): array
    {
        $path = "images/{$directory}";
        $files = Storage::disk($this->disk)->files($path);

        return array_map(fn ($file) => '/storage/'.$file, $files);
    }

    /**
     * Delete a managed image from storage.
     */
    public function delete(?string $url): bool
    {
        if (! $url || ! $this->isManaged($url)) {
            return false;
        }

        $path = Str::after($url, '/storage/');

        if (Storage::disk($this->disk)->exists($path)) {
            return Storage::disk($this->disk)->delete($path);
        }

        return false;
    }

    /**
     * Check if the URL is managed by our local public storage.
     */
    public function isManaged(string $url): bool
    {
        return str_starts_with($url, '/storage/images/');
    }

    /**
     * Generate a safe, unique filename.
     */
    protected function generateFilename(UploadedFile $file): string
    {
        $extension = $file->getClientOriginalExtension() ?: $file->guessExtension();

        return Str::uuid().'.'.$extension;
    }
}
