<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

    protected $casts = [
        'is_active' => 'boolean',
        'show_in_menu' => 'boolean',
    ];

    /**
     * Get all versions of the page.
     */
    public function versions()
    {
        return $this->hasMany(PageVersion::class);
    }

    /**
     * Get the currently published version.
     */
    public function publishedVersion()
    {
        return $this->hasOne(PageVersion::class)->where('status', 'published')->latestOfMany('published_at');
    }

    /**
     * Get the current draft version.
     */
    public function draftVersion()
    {
        return $this->hasOne(PageVersion::class)->where('status', 'draft')->latestOfMany();
    }
}
