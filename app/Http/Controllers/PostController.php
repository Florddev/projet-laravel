<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class PostController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required',
            'images.*' => 'file|image|max:10240',  // Adjust the validation rules as needed
        ]);

        $post = new Post();
        $post->content = $request->content;
        $post->user_id = Auth::id();
        $post->number_of_images = $request->hasFile('images') ? count($request->file('images')) : 0;
        $post->save();

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $file) {
                $file->storeAs('PostsAttachements', "post-{$post->id}_{$index}.webp", 'public');
            }
        }

        session()->flash('status', 'Post successfully posted.');
        return redirect()->intended(RouteServiceProvider::HOME);
    }


    public function attachement(string $fileName)
    {
        return response()->file(
            Storage::disk('public')->path("PostsAttachements/$fileName.webp")
        );
    }

    public function show($id)
    {
        $post = Post::with('createur')->with('replies.user')->findOrFail($id);

        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }

}
