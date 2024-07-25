<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use function PHPUnit\Framework\isNull;

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

    public function search(Request $request, ?string $search = '')
    {
        $search = $search ?: $request->input('search', '');

        $searchWords = explode(' ', $search);

        $postQuery = Post::where('content', 'LIKE', '%' . $search . '%');
        $userQuery = User::where('name', 'LIKE', '%' . $search . '%');
        foreach ($searchWords as $word) {
            $postQuery->orWhere('content', 'LIKE', '%' . $word . '%');
            $userQuery->orWhere('name', 'LIKE', '%' . $word . '%');
        }

        $search_post_results = $postQuery->orderBy('created_at')->with('createur')->get();
        $search_user_results = $userQuery->get();

        if ($request->wantsJson()) {
            return response()->json([
                'post_result' => $search_post_results,
                'user_result' => $search_user_results,
            ]);
        }

        return Inertia::render('Search', [
            'search' => $search,
            'postResults' => $search_post_results ?? [],
            'userResults' => $search_user_results ?? []
        ]);
    }


}
