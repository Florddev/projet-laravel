<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Reply;
use Inertia\Inertia;

class ReplyController extends Controller
{
    public function store(Request $request, $postId)
    {
        $request->validate([
            'replyContent' => 'required|string',
        ]);

        $post = Post::findOrFail($postId);

        $reply = new Reply();
        $reply->content = $request->replyContent;
        $reply->user_id = auth()->id();
        $reply->post_id = $post->id;
        $reply->save();

        return redirect()->back();
    }

    public function show($postId)
    {
        $post = Post::with('replies.user')->findOrFail($postId);

        return Inertia::render('Post/Show', [
            'post' => $post,
        ]);
    }
}
