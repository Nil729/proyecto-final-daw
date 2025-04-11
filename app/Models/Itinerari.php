<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Itinerari extends Model
{
    use HasFactory;
    protected $fillable = ['viatge_id', 'nomItinerari', 'descripcio', 'pais', 'latitud', 'longitud', 'transport', 'durada', 'visites', 'foto'];

    public function viatge() {
        return $this->belongsTo(Viatge::class, 'viatge_id');
    }

    public function calificacions() {
        return $this->hasMany(Calificacio::class, 'itinerari_id');
    }
    
}
