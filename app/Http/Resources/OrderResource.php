<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->whenLoaded('user')),
            'product' => new ProductResource($this->whenLoaded('product')),
            'quantity' => (int) $this->quantity,
            'shipping_address' => $this->shipping_address,
            'shipping_price' => (float) $this->shipping_price,
            'total_price' => (float) $this->total_price,
            'created_at' => $this->created_at,
        ];
    }
}
