<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\Post;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = Auth::user();

        $request->user()->fill($request->validated());

        if ($request->hasFile('banner')) {
            $file = $request->file('banner');
            $file->storeAs('UserBanner', "userBanner-{$user->id}.webp", 'public');
        }

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $file->storeAs('UserAvatar', "userAvatar-{$user->id}.webp", 'public');
        }

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function show($tag) {
        $user = User::where('tag', $tag)->first();

        if (!$user) {
            abort(404);
        }

        $posts = Post::where('user_id', $user->id)->with('createur')->get();
        
        return Inertia::render('Profile/Account', [
            'user' => $user,
            'posts' => $posts,
        ]);
    }

    public function avatarAttachment(string $fileName)
    {
        return response()->file(
            Storage::disk('public')->path("UserAvatar/$fileName")
        );
    }

    public function bannerAttachment(string $fileName)
    {
        return response()->file(
            Storage::disk('public')->path("UserBanner/$fileName")
        );
    }
}
