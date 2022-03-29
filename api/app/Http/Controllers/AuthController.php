<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\usersRequests;

class AuthController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth', ['except' => ['login', 'logout', 'createRequest']]);
    }

    public function createRequest(Request $request)
    {
        $this->validate($request, [
            'topic' => 'required|string',
            'question' => 'required|string'
        ]);

        $new = new usersRequests();
        $new->topic = $request->input('topic');
        $new->question = $request->input('question');
        $new->status = 0;
        $new->save();

        return response()->json(['message' => 'success'])->setStatusCode(200);
    }

    public function getAll()
    {
        return usersRequests::get();
    }
    public function getRequest($id)
    {
        return usersRequests::where('id', $id)->first();
    }

    public function updateRequest(Request $request, $id)
    {
        $update = usersRequests::where('id', $id)->first();
        $update->status = $request->input('status');
        $update->update();
        return response()->json(['message' => 'success'])->setStatusCode(200);
    }

    public function login(Request $request)
    {

        $this->validate($request, [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = $request->only(['email', 'password']);

        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }


    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => auth()->user()
        ]);
    }
}
