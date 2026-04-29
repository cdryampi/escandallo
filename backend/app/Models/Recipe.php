<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Recipe extends Model
{
    /** @use HasFactory<\Database\Factories\RecipeFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'category',
        'yield_portions',
        'status',
    ];

    protected $casts = [
        'yield_portions' => 'decimal:2',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(RecipeItem::class);
    }
}
