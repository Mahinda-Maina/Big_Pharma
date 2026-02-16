<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Order;
use App\Exceptions\InsufficientStockException;
use Illuminate\Support\Facades\DB;

class OrderService
{
    protected int $shippingPrice = 300;

    /**
     * Place an order. Returns Order model with relations loaded.
     *
     * @param  \App\Models\User  $user
     * @param  array  $data
     * @return \App\Models\Order
     */
    public function placeOrder($user, array $data): Order
    {
        return DB::transaction(function () use ($user, $data) {
            /** @var Product $product */
            $product = Product::lockForUpdate()->find($data['product_id']);

            if (! $product) {
                throw new \InvalidArgumentException('Product not found');
            }

            if ($product->stock < $data['quantity']) {
                throw new InsufficientStockException('Insufficient product stock');
            }

            $product->stock = $product->stock - $data['quantity'];
            $product->save();

            $totalPrice = $product->price * $data['quantity'];

            $order = Order::create([
                'user_id' => $user->id,
                'product_id' => $product->id,
                'quantity' => $data['quantity'],
                'shipping_address' => $data['shipping_address'],
                'shipping_price' => $this->shippingPrice,
                'total_price' => $totalPrice,
            ]);

            $order->load(['product','user']);

            return $order;
        });
    }
}
