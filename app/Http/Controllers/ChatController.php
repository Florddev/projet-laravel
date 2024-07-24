<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index()
    {
        $chats = Chat::where('user_id', Auth::id())->get();

        return Inertia::render('Chat', [
            'chats' => $chats,
        ]);
    }

    public function show($id)
    {
        $messages = Message::where('chat_id', $id)->get();

        return Inertia::render('Chat', [
            'messages' => $messages,
        ]);
    }

    public function store(Request $request)
    {
        $chat = new Chat();
        $chat->user_id = Auth::id();
        $chat->save();

        $message = new Message();
        $message->chat_id = $chat->id;
        $message->user_id = Auth::id();
        $message->content = $request->content;
        $message->save();

        return redirect()->route('chat.show', ['id' => $chat->id]);
    }
}
