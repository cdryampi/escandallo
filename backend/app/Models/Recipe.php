<?php

namespace App\Models;

use Database\Factories\RecipeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Recipe extends Model
{
    /** @use HasFactory<RecipeFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'category',
        'yield_portions',
        'status',
        'image_url',
    ];

    protected $casts = [
        'yield_portions' => 'decimal:2',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(RecipeItem::class);
    }
}
