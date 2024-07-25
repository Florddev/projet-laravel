<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class FollowerController extends Controller
{
    public function follow($tag)
    {
        $user = User::where('tag', $tag)->firstOrFail();
        $currentUser = Auth::user();

        if (!$currentUser->isFollowing($user)) {
            $currentUser->followings()->attach($user->id);
        }

        return back();
    }

    public function unfollow($tag)
    {
        $user = User::where('tag', $tag)->firstOrFail();
        $currentUser = Auth::user();

        if ($currentUser->isFollowing($user)) {
            $currentUser->followings()->detach($user->id);
        }

        return back();
    }
}