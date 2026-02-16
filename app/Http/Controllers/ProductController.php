<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ProductController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
{
    $perPage = $request->get('per_page', 12);

    return response()->json(
        Product::paginate($perPage)
    );
}
  public function show(Product $product)
    {
        return response()->json($product);
    }

    /**
     * Store a newly created product.
     */
    public function store(ProductRequest $request): JsonResponse
    {
        $this->authorize('create', Product::class);

        $product = Product::create($request->validated());

        return response()->json(new ProductResource($product), 201);
    }

}
