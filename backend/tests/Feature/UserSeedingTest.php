<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserSeedingTest extends TestCase
{
    use RefreshDatabase;

    public function test_database_seeder_creates_configured_privileged_users(): void
    {
        putenv('SEED_USER_PASSWORD=password');
        putenv('SEED_SUPERADMIN_EMAILS=superadmin1@escandallo.test,superadmin2@escandallo.test');
        putenv('SEED_ADMIN_EMAILS=admin@escandallo.test,admin2@escandallo.test,admin3@escandallo.test,admin4@escandallo.test,admin5@escandallo.test');

        $this->seed(DatabaseSeeder::class);

        $this->assertSame(7, User::query()->count());
        $this->assertSame(2, User::query()->where('role', 'superadmin')->count());
        $this->assertSame(5, User::query()->where('role', 'admin')->count());
        $this->assertSame(7, User::query()->where('is_admin', true)->count());
        $this->assertTrue((bool) User::query()->where('email', 'admin@escandallo.test')->value('is_admin'));
    }
}
