<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $password = env('SEED_USER_PASSWORD', 'password');

        $this->seedPrivilegedUsers(
            'superadmin',
            $this->parseEmailList(
                env(
                    'SEED_SUPERADMIN_EMAILS',
                    'superadmin1@escandallo.test,superadmin2@escandallo.test'
                )
            ),
            $password
        );

        $this->seedPrivilegedUsers(
            'admin',
            $this->parseEmailList(
                env(
                    'SEED_ADMIN_EMAILS',
                    'admin@escandallo.test,admin2@escandallo.test,admin3@escandallo.test,admin4@escandallo.test,admin5@escandallo.test'
                )
            ),
            $password
        );

        // Domain Domain
        $this->call([
            UnitSeeder::class,
            AllergenSeeder::class,
            SupplierSeeder::class,
            IngredientSeeder::class,
            RecipeSeeder::class,
        ]);
    }

    /**
     * @param  list<string>  $emails
     */
    protected function seedPrivilegedUsers(string $role, array $emails, string $password): void
    {
        foreach ($emails as $index => $email) {
            User::query()->updateOrCreate(
                ['email' => $email],
                [
                    'name' => $this->buildSeedUserName($role, $index + 1, $email),
                    'password' => $password,
                    'email_verified_at' => now(),
                    'is_admin' => true,
                    'role' => $role,
                ]
            );
        }
    }

    /**
     * @return list<string>
     */
    protected function parseEmailList(?string $value): array
    {
        $emails = array_map('trim', explode(',', (string) $value));
        $emails = array_filter($emails, static fn (string $email): bool => $email !== '');

        return array_values(array_unique($emails));
    }

    protected function buildSeedUserName(string $role, int $position, string $email): string
    {
        $localPart = Str::before($email, '@');

        if ($role === 'superadmin') {
            return "Superadmin {$position}";
        }

        if ($localPart === 'admin') {
            return 'Admin Escandallo';
        }

        return "Admin {$position}";
    }
}
