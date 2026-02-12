<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:100',
        'email' => 'required|email|unique:users,email',
        'phone' => ['required', 'regex:/^(?:\+254|254|0)?7\d{8}$/'],
        'password' => 'required|min:6',
    ]);

    // Normalize phone number
    $phone = $request->phone;

    if (preg_match('/^0\d{9}$/', $phone)) {
        $phone = '+254' . substr($phone, 1);
    }

    if (preg_match('/^254\d{9}$/', $phone)) {
        $phone = '+' . $phone;
    }

    User::create([
        'name' => $request->name,
        'email' => $request->email,
        'phone' => $phone,
        'password' => bcrypt($request->password),
    ]);
}

}
