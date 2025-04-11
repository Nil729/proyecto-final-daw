<?php

namespace App\Http\Controllers;
use App\Models\Calificacio;
use App\Models\Itinerari;
use Illuminate\Http\Request;
use Psy\Readline\Hoa\Console;

class CalificacioController extends Controller
{
    public function index()
    {
        return response()->json(Calificacio::all());
    }

    public function show($id)
    {
        $calificacio = Calificacio::find($id);
        if ($calificacio) {
            return response()->json($calificacio);
        } else {
            return response()->json(['error' => 'Calificacio not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $calificacio = new Calificacio;
        $calificacio->fill($request->all());
        $calificacio->save();
        // si califiacions amb la vista == true s'hafageix a itinerari una visita
        // si es false no s'afageix

        if ($request->input('completat')) {
            $itinerari = Itinerari::find($request->input('itinerari_id'));
            $itinerari->visites = $itinerari->visites + 1;
            $itinerari->save();
        }

        return response()->json($calificacio, 201);
    }

    public function update(Request $request, $id)
    {
        $calificacio = Calificacio::find($id);
        if ($calificacio) {
            $calificacio->fill($request->all());
            $calificacio->save();
            return response()->json($calificacio);
        } else {
            return response()->json(['error' => 'Calificacio not found'], 404);
        }
    }

    public function destroy($id, $itinerari_id)
    {      
        $calificacio = Calificacio::find($id);
        
        if ($calificacio->completat){
            $itinerari = Itinerari::find($itinerari_id);
            $itinerari->visites = $itinerari->visites - 1;
            $itinerari->save();
        }

        if ($calificacio) {
            $calificacio->delete();

            return response()->json(['message' => 'Calificacio deleted successfully']);
        } else {
            return response()->json(['error' => 'Calificacio not found'], 404);
        }
    }

    


}
