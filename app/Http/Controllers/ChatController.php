<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $chat = Chat::with(['messages.user'])->findOrFail($id);

        return Inertia::render('Chat', [
            'chat' => $chat,
            'messages' => $chat->messages,
        ]);
    }

    // Créer un nouveau chat
    public function store(Request $request)
    {
        $request->validate([
            'participant_id' => 'required|exists:users,id',
        ]);

        $chat = new Chat();
        $chat->user_id = Auth::id();
        $chat->participant_id = $request->participant_id;
        $chat->save();

        return redirect()->route('chat.show', ['id' => $chat->id]);
    }

    // Supprimer un chat
    public function destroy($id)
    {
        $chat = Chat::findOrFail($id);
        $chat->delete();

        return redirect()->route('chat.index');
    }
}
