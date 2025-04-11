<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calificacio extends Model
{
    use HasFactory;
    protected $fillable = ['itinerari_id', 'usuari_id', 'puntuacio', 'comentari', 'completat'];

    public function itinerari() {
        return $this->belongsTo(Itinerari::class, 'itinerari_id');
    }

    public function usuari() {
        return $this->belongsTo(User::class, 'usuari_id');
    }
}