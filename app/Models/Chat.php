<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Ajoutez cette nouvelle relation pour le participant
    public function participant()
    {
        return $this->belongsTo(User::class, 'participant_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'chat_id', 'id');
    }
}
