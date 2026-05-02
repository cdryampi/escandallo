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
     * Update a model's image atomically.
     *
     * @param \Illuminate\Database\Eloquent\Model $model
     * @param \Illuminate\Http\UploadedFile $file
     * @param string $directory
     * @param string $column
     * @return string
     * @throws \Exception
     */
    public function updateModelImage(\Illuminate\Database\Eloquent\Model $model, UploadedFile $file, string $directory, string $column = 'image_url'): string
    {
        $oldUrl = $model->{$column};
        $newUrl = $this->store($file, $directory);

        try {
            \Illuminate\Support\Facades\DB::transaction(function () use ($model, $newUrl, $column) {
                $model->update([$column => $newUrl]);
            });

            if ($oldUrl) {
                $this->delete($oldUrl);
            }

            return $newUrl;
        } catch (\Exception $e) {
            $this->delete($newUrl);
            throw $e;
        }
    }

    /**
     * Delete a model's image atomically.
     *
     * @param \Illuminate\Database\Eloquent\Model $model
     * @param string $column
     * @return void
     */
    public function deleteModelImage(\Illuminate\Database\Eloquent\Model $model, string $column = 'image_url'): void
    {
        $url = $model->{$column};

        if ($url) {
            \Illuminate\Support\Facades\DB::transaction(function () use ($model, $column) {
                $model->update([$column => null]);
            });

            $this->delete($url);
        }
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
