
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'numero',
        'espaco',
        'disponibilidade',
        'descricao',
        'sede',
        'recursos'
    ];

    protected $casts = [
        'espaco' => 'integer',
        'recursos' => 'array'
    ];

    /**
     * Scope for available rooms
     */
    public function scopeAvailable($query)
    {
        return $query->where('disponibilidade', 'livre');
    }

    /**
     * Scope for reserved rooms
     */
    public function scopeReserved($query)
    {
        return $query->where('disponibilidade', 'reservada');
    }

    /**
     * Scope for rooms by sede
     */
    public function scopeBySede($query, $sede)
    {
        return $query->where('sede', $sede);
    }
}
