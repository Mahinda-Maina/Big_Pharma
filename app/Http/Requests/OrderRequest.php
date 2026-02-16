<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    public function authorize()
    {
        return $this->user() ? true : false;
    }

    public function rules()
    {
        return [
            'product_id' => ['required','exists:products,id'],
            'quantity' => ['required','integer','min:1'],
            'shipping_address' => ['required','string'],
        ];
    }
}
