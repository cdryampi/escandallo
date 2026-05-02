<?php

namespace App\Providers;

use App\Models\Ingredient;
use App\Models\Recipe;
use App\Observers\IngredientObserver;
use App\Observers\RecipeObserver;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

        Ingredient::observe(IngredientObserver::class);
        Recipe::observe(RecipeObserver::class);
    }
}
