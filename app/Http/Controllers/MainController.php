<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MainController extends Controller
{
    public function home()
    {
        $users_followed = Follow::where('user_id', Auth::id())->get();
        $followers_posts = collect(); // Utiliser une collection pour faciliter le tri

        foreach ($users_followed as $u){
            $posts = Post::where('user_id', $u->user_followed_id)->with("createur")->get();
            $followers_posts = $followers_posts->merge($posts); // Fusionner les collections
        }

        $sorted_posts = $followers_posts->sortByDesc('creation_date');

        return Inertia::render('Dashboard', [
            'posts' => $sorted_posts,
        ]);
    }

    public function explore()
    {
        return Inertia::render('Explore');
    }


}
