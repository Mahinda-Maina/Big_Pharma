<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\OrderRequest;
use App\Services\OrderService;
use App\Http\Resources\OrderResource;
use App\Exceptions\InsufficientStockException;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
     public function index(Request $request)
    {
        return response()->json(
            $request->user()->orders()->latest()->get()
        );
    }

    public function store(OrderRequest $request, OrderService $service): JsonResponse
    {
        try {
            $order = $service->placeOrder($request->user(), $request->validated());

            return response()->json(new OrderResource($order), 201);
        } catch (InsufficientStockException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }
}
