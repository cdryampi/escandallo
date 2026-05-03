<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLandingModuleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin === true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $module = (string) $this->route('module');

        if ($module !== 'branding') {
            return [];
        }

        $hexColor = ['nullable', 'string', 'regex:/^#(?:[0-9a-fA-F]{6})$/'];

        return [
            'name' => ['sometimes', 'string', 'max:120'],
            'tagline' => ['sometimes', 'nullable', 'string', 'max:255'],
            'logo_url' => ['sometimes', 'nullable', 'string', 'max:2048'],
            'palette' => ['sometimes', 'array'],
            'palette.brand' => $hexColor,
            'palette.brand_strong' => $hexColor,
            'palette.accent' => $hexColor,
        ];
    }
}
