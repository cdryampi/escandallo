<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Page extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'is_active',
        'show_in_menu',
        'meta_title',
        'meta_description',
        'meta_image_url',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'show_in_menu' => 'boolean',
        ];
    }

    public function versions(): HasMany
    {
        return $this->hasMany(PageVersion::class);
    }

    public function publishedVersion(): HasOne
    {
        return $this->hasOne(PageVersion::class)
            ->where('status', 'published')
            ->latestOfMany('published_at');
    }

    public function draftVersion(): HasOne
    {
        return $this->hasOne(PageVersion::class)
            ->where('status', 'draft')
            ->latestOfMany();
    }
}
