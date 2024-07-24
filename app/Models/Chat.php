<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    // Si vous utilisez $fillable, spécifiez les champs qui peuvent être assignés massivement
    protected $fillable = ['user_id'];

    // Relation avec le modèle User (un chat appartient à un utilisateur)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relation avec le modèle Message (un chat peut avoir plusieurs messages)
    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
