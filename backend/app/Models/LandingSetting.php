<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LandingSetting extends Model
{
    protected $table = 'landing_settings';

    protected $fillable = ['modules'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'modules' => 'array',
        ];
    }

    /**
     * Get the singleton instance.
     */
    public static function current()
    {
        return self::firstOrCreate(
            ['id' => 1],
            ['modules' => [
                'branding' => [
                    'name' => 'Nuestro Restaurante',
                    'tagline' => 'Una experiencia gastronómica única'
                ],
                'topbar' => [
                    'isActive' => true,
                    'message' => '¡Bienvenidos a nuestra nueva web!'
                ],
                'hero' => [
                    'title' => 'Sabor y Tradición',
                    'subtitle' => 'Descubre la esencia de nuestra cocina'
                ],
                'menu' => ['featured' => []],
                'agenda' => ['events' => []],
                'map' => [
                    'lat' => 40.416775,
                    'lng' => -3.703790
                ],
                'footer' => [
                    'address' => 'Calle Principal 123, Ciudad',
                    'email' => 'contacto@restaurante.test',
                    'phone' => '+34 900 000 000',
                    'social_links' => [
                        'instagram' => '#',
                        'facebook' => '#'
                    ]
                ]
            ]]
        );
    }
}
