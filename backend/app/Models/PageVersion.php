<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageVersion extends Model
{
    protected $fillable = [
        'page_id',
        'status',
        'version_number',
        'blocks',
        'created_by',
        'published_at',
    ];

    protected $casts = [
        'blocks' => 'array',
        'published_at' => 'datetime',
    ];

    /**
     * Get the page this version belongs to.
     */
    public function page()
    {
        return $this->belongsTo(Page::class);
    }

    /**
     * Get the user who created this version.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
