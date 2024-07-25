<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ChatController extends Controller
{
    // Afficher tous les chats de l'utilisateur
    public function index()
    {
        $userId = Auth::id();
        $chats = Chat::where('user_id', $userId)
            ->orWhere('participant_id', $userId)
            ->with(['user', 'participant'])
            ->get();

        return Inertia::render('Chat', [
            'chats' => $chats,
        ]);
    }

    // Afficher les messages d'un chat spécifique
    public function show($id)
    {
        $userId = Auth::id();
        $chats = Chat::where('user_id', $userId)
            ->with(['user', 'participant'])
            ->orWhere('participant_id', $userId)
            ->get();

        $chat = Chat::with(['messages.user'])->with('user')->with('participant')->findOrFail($id);

        return Inertia::render('Chat', [
            'chat' => $chat,
            'chats' => $chats,
            'messages' => $chat->messages,
        ]);
    }

    // Créer un nouveau chat
    public function store(Request $request)
    {
        $tag = $request->tag;
        $user = User::where('tag', $tag)->firstOrFail();

        if (empty($user)) {
            return Redirect::route('chat.index')->with('error', 'Utilisateur introuvable.');
        }

        if ($user->id == Auth::id()) {
            return Redirect::route('chat.index')->with('error', 'Vous ne pouvez pas vous envoyer un message à vous-même.');
        }

        if (Chat::where('user_id', Auth::id())->where('participant_id', $user->id)->exists()) {
            return Redirect::route('chat.index')->with('error', 'Vous avez déjà un chat avec cet utilisateur.');
        }

        $chat = new Chat();
        $chat->user_id = Auth::id();
        $chat->participant_id = $user->id;
        $chat->save();

        return Redirect::route('chat.index')->with('success', 'Chat créé avec succès.');
    }

    // Supprimer un chat
    public function destroy($id)
    {
        $chat = Chat::findOrFail($id);
        $chat->delete();

        return redirect()->route('chat.index');
    }
}
