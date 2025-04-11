<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Viatge extends Model
{
    use HasFactory;
    //protected $table = 'viatges';
    protected $fillable = [ // Aquesta variable és la que ens permet indicar quins camps de la taula es poden omplir
        'usuari_id', 
        'nomViatge', 
        'descripcio',
        'dataInici', 
        'dataFi'
    ];

    public function usuari() {
        return $this->belongsTo(User::class, 'usuari_id');
    }

    public function itineraris() {
        return $this->hasMany(Itinerari::class, 'viatge_id');
    }

}
