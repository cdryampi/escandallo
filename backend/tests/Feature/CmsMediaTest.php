<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class CmsMediaTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['is_admin' => true, 'role' => 'admin']);
    }

    public function test_admin_can_upload_cms_media(): void
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->image('test.jpg');

        $response = $this->actingAs($this->admin)
            ->postJson('/api/v1/admin/media/upload', [
                'file' => $file,
            ])
            ->assertOk()
            ->assertJsonStructure([
                'message',
                'data' => ['url'],
            ]);

        $url = $response->json('data.url');
        $filename = basename($url);

        Storage::disk('public')->assertExists('images/cms/'.$filename);
    }

    public function test_validation_errors_on_invalid_media(): void
    {
        $this->actingAs($this->admin)
            ->postJson('/api/v1/admin/media/upload', [
                'file' => 'not-an-image',
            ])
            ->assertStatus(422);
    }

    public function test_validation_rejects_unsupported_media_types(): void
    {
        $file = UploadedFile::fake()->create('brochure.pdf', 100, 'application/pdf');

        $this->actingAs($this->admin)
            ->postJson('/api/v1/admin/media/upload', [
                'file' => $file,
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['file']);
    }

    public function test_validation_rejects_files_larger_than_five_megabytes(): void
    {
        $file = UploadedFile::fake()->image('large.jpg')->size(6000);

        $this->actingAs($this->admin)
            ->postJson('/api/v1/admin/media/upload', [
                'file' => $file,
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['file']);
    }
}
