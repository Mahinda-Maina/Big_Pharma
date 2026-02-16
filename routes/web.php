<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Big Pharma API is running',
        'version' => app()->version(),
        'timestamp' => now()
    ]);
});

require __DIR__.'/auth.php';
