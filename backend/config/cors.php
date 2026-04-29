<?php

$configuredOrigins = array_values(array_filter([
    env('FRONTEND_URL', 'http://localhost:5173'),
    env('APP_URL', 'http://localhost:8080'),
]));

$allowedOrigins = [];

foreach ($configuredOrigins as $origin) {
    $allowedOrigins[] = $origin;

    $url = parse_url($origin);

    if (!isset($url['scheme'], $url['host'])) {
        continue;
    }

    if (!in_array($url['host'], ['localhost', '127.0.0.1'], true)) {
        continue;
    }

    $aliasHost = $url['host'] === 'localhost' ? '127.0.0.1' : 'localhost';
    $aliasOrigin = sprintf(
        '%s://%s%s',
        $url['scheme'],
        $aliasHost,
        isset($url['port']) ? ':'.$url['port'] : ''
    );

    $allowedOrigins[] = $aliasOrigin;
}

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => array_values(array_unique($allowedOrigins)),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
