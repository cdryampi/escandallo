<?php

namespace Tests\Feature;

use App\Models\ContactSubmission;
use App\Models\Page;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardMetricsTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_metrics_include_cms_and_contact_counts(): void
    {
        $admin = User::factory()->create(['is_admin' => true, 'role' => 'admin']);
        $page = Page::query()->where('slug', 'contacto')->firstOrFail();

        ContactSubmission::query()->create([
            'page_id' => $page->id,
            'name' => 'Unread',
            'email' => 'unread@example.com',
            'subject' => 'Subject',
            'message' => 'Message',
            'status' => 'new',
        ]);

        ContactSubmission::query()->create([
            'page_id' => $page->id,
            'name' => 'Resolved',
            'email' => 'resolved@example.com',
            'subject' => 'Subject',
            'message' => 'Message',
            'status' => 'resolved',
            'read_at' => now(),
            'resolved_at' => now(),
        ]);

        $this->actingAs($admin)
            ->getJson('/api/v1/dashboard')
            ->assertOk()
            ->assertJsonPath('data.cms.total_pages', 5)
            ->assertJsonPath('data.cms.active_pages', 5)
            ->assertJsonPath('data.cms.published_pages', 5)
            ->assertJsonPath('data.cms.contact_submissions.new', 1)
            ->assertJsonPath('data.cms.contact_submissions.resolved', 1);
    }
}
