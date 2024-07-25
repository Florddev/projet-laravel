<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    // Créer un nouveau message
    public function store(Request $request, $chatId)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $message = new Message();
        $message->chat_id = $chatId;
        $message->user_id = Auth::id();
        $message->content = $request->content;
        $message->save();

        return redirect()->route('chat.show', ['id' => $chatId]);
    }

    // Mettre à jour un message existant
    public function update(Request $request, $id)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $message = Message::findOrFail($id);
        $message->content = $request->content;
        $message->save();

        return redirect()->route('chat.show', ['id' => $message->chat_id]);
    }

    // Supprimer un message
    public function destroy($id)
    {
        $message = Message::findOrFail($id);
        $message->delete();

        return redirect()->route('chat.show', ['id' => $message->chat_id]);
    }
}
