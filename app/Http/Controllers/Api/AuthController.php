<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if(!Auth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'code'  =>  500,
                'message' => 'Provided email address or password is incorrect'
            ]);
        }

        $user = Auth::user();
        $token =  $user->createToken('main')->plainTextToken;

        return response()->json([
            'success' => true,
            'user'    => $user,
            'token'   => $token,
          ])
          ->header('Authorization', $token);
    }

    public function signup(SignupRequest $request)
    {
        $date = $request->validated();

        $user = User::create([
            'name' => $date['name'],
            'email' => $date['email'],
            'password' => bcrypt($date['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response()->json([
          'success' => true,
          'user'    => $user,
          'token'   => $token,
        ])
        ->header('Authorization', $token);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out Successfully.',
        ]);
    }
}
