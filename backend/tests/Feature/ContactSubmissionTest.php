<?php

namespace Tests\Feature;

use App\Models\ContactSubmission;
use App\Models\Page;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactSubmissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_contact_submission_validates_and_persists(): void
    {
        $page = Page::query()->where('slug', 'contacto')->firstOrFail();

        $this->postJson('/api/v1/contact-submissions', [
            'page_id' => $page->id,
            'name' => 'Ada Lovelace',
            'email' => 'ada@example.com',
            'subject' => 'Reservas',
            'message' => 'Necesito informacion para una reserva de grupo.',
        ])
            ->assertCreated()
            ->assertJsonPath('data.status', 'new')
            ->assertJsonPath('data.page.slug', 'contacto');

        $this->assertDatabaseHas('contact_submissions', [
            'page_id' => $page->id,
            'email' => 'ada@example.com',
            'status' => 'new',
        ]);
    }

    public function test_public_contact_submission_rejects_invalid_payload(): void
    {
        $this->postJson('/api/v1/contact-submissions', [
            'page_id' => 9999,
            'name' => '',
            'email' => 'bad-email',
            'subject' => '',
            'message' => '',
        ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['page_id', 'name', 'email', 'subject', 'message']);
    }

    public function test_public_contact_submission_is_rate_limited(): void
    {
        $page = Page::query()->where('slug', 'contacto')->firstOrFail();
        $payload = [
            'page_id' => $page->id,
            'name' => 'Grace Hopper',
            'email' => 'grace@example.com',
            'subject' => 'Consulta',
            'message' => 'Mensaje de prueba.',
        ];

        for ($attempt = 0; $attempt < 5; $attempt++) {
            $this->postJson('/api/v1/contact-submissions', $payload)->assertCreated();
        }

        $this->postJson('/api/v1/contact-submissions', $payload)->assertStatus(429);
    }

    public function test_admin_can_list_view_and_update_contact_submissions(): void
    {
        $admin = User::factory()->create(['is_admin' => true, 'role' => 'admin']);
        $user = User::factory()->create(['is_admin' => false, 'role' => 'user']);
        $page = Page::query()->where('slug', 'contacto')->firstOrFail();

        $newSubmission = ContactSubmission::query()->create([
            'page_id' => $page->id,
            'name' => 'New User',
            'email' => 'new@example.com',
            'subject' => 'Nueva consulta',
            'message' => 'Mensaje nuevo',
            'status' => 'new',
        ]);

        ContactSubmission::query()->create([
            'page_id' => $page->id,
            'name' => 'Read User',
            'email' => 'read@example.com',
            'subject' => 'Consulta leida',
            'message' => 'Mensaje leido',
            'status' => 'read',
            'read_at' => now(),
        ]);

        $this->actingAs($user)
            ->getJson('/api/v1/admin/contact-submissions')
            ->assertForbidden();

        $this->actingAs($admin)
            ->getJson('/api/v1/admin/contact-submissions')
            ->assertOk()
            ->assertJsonPath('meta.counts.new', 1)
            ->assertJsonPath('meta.counts.read', 1)
            ->assertJsonPath('data.0.page.slug', 'contacto');

        $this->actingAs($admin)
            ->getJson("/api/v1/admin/contact-submissions/{$newSubmission->id}")
            ->assertOk()
            ->assertJsonPath('data.id', $newSubmission->id);

        $this->actingAs($admin)
            ->patchJson("/api/v1/admin/contact-submissions/{$newSubmission->id}", [
                'status' => 'resolved',
            ])
            ->assertOk()
            ->assertJsonPath('data.status', 'resolved');

        $this->assertDatabaseHas('contact_submissions', [
            'id' => $newSubmission->id,
            'status' => 'resolved',
        ]);
    }
}
