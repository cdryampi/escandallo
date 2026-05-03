<?php

namespace App\Http\Requests;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Validator as ValidatorFacade;
use Illuminate\Validation\Rule;

class UpdatePageVersionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin === true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'blocks' => ['sometimes', 'required', 'array'],
            'blocks.*.id' => ['required_with:blocks', 'string', 'distinct'],
            'blocks.*.type' => ['required_with:blocks', 'string', Rule::in([
                'HeroBlock',
                'RichTextBlock',
                'FeatureListBlock',
                'GalleryBlock',
                'ContactFormBlock',
                'MenuHighlightsBlock',
                'TestimonialsBlock',
                'VisitInfoBlock',
                'ReservationCtaBlock',
            ])],
            'blocks.*.is_visible' => ['required_with:blocks', 'boolean'],
            'blocks.*.data' => ['required_with:blocks', 'array'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:160'],
            'meta_image_url' => ['nullable', 'string', 'max:2048', $this->mediaReferenceRule()],
            'show_in_menu' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    /**
     * @return array<int, callable(Validator): void>
     */
    public function after(): array
    {
        return [
            function (Validator $validator): void {
                $blocks = $this->input('blocks');

                if (! is_array($blocks)) {
                    return;
                }

                foreach ($blocks as $index => $block) {
                    if (! is_array($block) || ! isset($block['type']) || ! is_string($block['type'])) {
                        continue;
                    }

                    $nestedValidator = ValidatorFacade::make(
                        ['data' => $block['data'] ?? null],
                        $this->rulesForBlockType($block['type']),
                    );

                    if (! $nestedValidator->fails()) {
                        continue;
                    }

                    foreach ($nestedValidator->errors()->toArray() as $attribute => $messages) {
                        $path = preg_replace('/^data/', "blocks.{$index}.data", $attribute, 1) ?? "blocks.{$index}.data";

                        foreach ($messages as $message) {
                            $validator->errors()->add($path, $message);
                        }
                    }
                }
            },
        ];
    }

    /**
     * @return array<string, mixed>
     */
    protected function rulesForBlockType(string $type): array
    {
        return match ($type) {
            'HeroBlock' => [
                'data.title' => ['required', 'string', 'max:255'],
                'data.subtitle' => ['nullable', 'string'],
                'data.image_url' => ['nullable', 'string', 'max:2048', $this->mediaReferenceRule()],
                'data.cta_text' => ['nullable', 'string', 'max:80'],
                'data.cta_url' => ['nullable', 'string', 'max:2048', $this->linkReferenceRule()],
            ],
            'RichTextBlock' => [
                'data.content' => ['required', 'string'],
            ],
            'FeatureListBlock' => [
                'data.title' => ['required', 'string', 'max:255'],
                'data.features' => ['required', 'array', 'min:1'],
                'data.features.*.title' => ['required', 'string', 'max:120'],
                'data.features.*.description' => ['required', 'string', 'max:500'],
                'data.features.*.icon' => ['nullable', 'string', 'max:80'],
            ],
            'GalleryBlock' => [
                'data.title' => ['required', 'string', 'max:255'],
                'data.intro' => ['required', 'string', 'max:1000'],
                'data.images' => ['required', 'array', 'min:2', 'max:6'],
                'data.images.*.image_url' => ['nullable', 'string', 'max:2048', $this->mediaReferenceRule()],
                'data.images.*.alt' => ['required', 'string', 'max:160'],
                'data.images.*.caption' => ['required', 'string', 'max:255'],
            ],
            'ContactFormBlock' => [
                'data.heading' => ['required', 'string', 'max:255'],
                'data.recipient_email' => ['required', 'email:rfc'],
                'data.success_message' => ['required', 'string', 'max:255'],
            ],
            'MenuHighlightsBlock' => [
                'data.title' => ['required', 'string', 'max:255'],
                'data.recipe_ids' => ['required', 'array', 'min:1'],
                'data.recipe_ids.*' => ['required', 'integer', 'distinct'],
            ],
            'TestimonialsBlock' => [
                'data.title' => ['required', 'string', 'max:255'],
                'data.intro' => ['required', 'string', 'max:1000'],
                'data.testimonials' => ['required', 'array', 'min:2', 'max:6'],
                'data.testimonials.*.quote' => ['required', 'string', 'max:1000'],
                'data.testimonials.*.author' => ['required', 'string', 'max:120'],
                'data.testimonials.*.source' => ['required', 'string', 'max:120'],
            ],
            'VisitInfoBlock' => [
                'data.title' => ['required', 'string', 'max:255'],
                'data.intro' => ['required', 'string', 'max:1000'],
                'data.address' => ['required', 'string', 'max:255'],
                'data.phone' => ['required', 'string', 'max:80'],
                'data.email' => ['required', 'email:rfc'],
                'data.hours' => ['required', 'array', 'min:1'],
                'data.hours.*.label' => ['required', 'string', 'max:120'],
                'data.hours.*.value' => ['required', 'string', 'max:120'],
                'data.map_url' => ['required', 'string', 'max:2048', 'url', function (string $attribute, mixed $value, Closure $fail): void {
                    if (! is_string($value) || ! $this->isAbsoluteUrl($value)) {
                        $fail('La URL del mapa debe ser absoluta.');
                    }
                }],
                'data.primary_cta_text' => ['required', 'string', 'max:80'],
                'data.primary_cta_url' => ['required', 'string', 'max:2048', $this->linkReferenceRule()],
            ],
            'ReservationCtaBlock' => [
                'data.eyebrow' => ['required', 'string', 'max:80'],
                'data.title' => ['required', 'string', 'max:255'],
                'data.body' => ['required', 'string', 'max:1000'],
                'data.primary_cta_text' => ['required', 'string', 'max:80'],
                'data.primary_cta_url' => ['required', 'string', 'max:2048', $this->linkReferenceRule()],
                'data.secondary_cta_text' => ['nullable', 'string', 'max:80'],
                'data.secondary_cta_url' => ['nullable', 'string', 'max:2048', $this->linkReferenceRule()],
                'data.background_image_url' => ['nullable', 'string', 'max:2048', $this->mediaReferenceRule()],
            ],
            default => [
                'data' => ['prohibited'],
            ],
        };
    }

    protected function mediaReferenceRule(): Closure
    {
        return function (string $attribute, mixed $value, Closure $fail): void {
            if (! is_string($value) || trim($value) === '') {
                return;
            }

            if ($this->isAbsoluteUrl($value) || str_starts_with($value, '/')) {
                return;
            }

            $fail('La URL de imagen debe ser absoluta o una ruta local que empiece por "/".');
        };
    }

    protected function linkReferenceRule(): Closure
    {
        return function (string $attribute, mixed $value, Closure $fail): void {
            if (! is_string($value) || trim($value) === '') {
                return;
            }

            if (
                $this->isAbsoluteUrl($value)
                || str_starts_with($value, '/')
                || str_starts_with($value, 'mailto:')
                || str_starts_with($value, 'tel:')
            ) {
                return;
            }

            $fail('El enlace debe ser URL absoluta, ruta local, mailto o tel.');
        };
    }

    protected function isAbsoluteUrl(string $value): bool
    {
        $validated = filter_var($value, FILTER_VALIDATE_URL);

        if ($validated === false) {
            return false;
        }

        $scheme = parse_url($value, PHP_URL_SCHEME);

        return in_array($scheme, ['http', 'https'], true);
    }
}
