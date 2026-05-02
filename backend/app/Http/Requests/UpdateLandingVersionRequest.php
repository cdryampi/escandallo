<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Validator;

class UpdateLandingVersionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->is_admin;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'blocks' => ['required', 'array'],
            'blocks.*.id' => ['required', 'string'],
            'blocks.*.type' => ['required', 'string'],
            'blocks.*.is_visible' => ['required', 'boolean'],
            'blocks.*.data' => ['required', 'array'],
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            foreach ($this->input('blocks', []) as $index => $block) {
                if (($block['type'] ?? null) === 'HeroBlock') {
                    $heroValidator = Validator::make($block['data'] ?? [], [
                        'title' => 'required|string|min:1',
                    ]);
                    if ($heroValidator->fails()) {
                        foreach ($heroValidator->errors()->get('title') as $error) {
                            $validator->errors()->add("blocks.$index.data.title", $error);
                        }
                    }
                }
            }
        });
    }
}
