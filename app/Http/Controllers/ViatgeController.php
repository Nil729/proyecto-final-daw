<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Viatge;
use App\Models\User;
use Inertia\Inertia;


class ViatgeController extends Controller
{
    //index
    public function index()
    {
        return Inertia::render('Viatges/Index', [
            'viatges' => Viatge::with('usuari:id,name')->latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nomViatge' => 'required|string|max:100',
            'descripcio' => 'required|string|max:255',
            'dataInici' => 'required|date|before:dataFi',
            'dataFi' => 'required|date|after:dataInici'
        ]);

        $request->user()->viatges()->create($validated);

        return to_route('viatges.index');
    }

    public function update(Request $request, Viatge $viatge)
    {

        $this->authorize('update', $viatge);

        $validated = $request->validate([
            'nomViatge' => 'required|string|max:100',
            'descripcio' => 'required|string|max:255',
            'dataInici' => 'required|date|before:dataFi',
            'dataFi' => 'required|date|after:dataInici'
        ]);

        $viatge->update($validated);

        return to_route('viatges.index');
    }

    public function destroy(Viatge $viatge)
    {
        $this->authorize('delete', $viatge);
        $viatge->delete();
        return to_route('viatges.index');

    }

    // show viatges per usuari
    public function show(Request $request)
    {
        $userId = $request->input('userId');

        $viatges = Viatge::with('usuari:id,name')->where('usuari_id', $userId)->get();

        $usuari = User::where('id', $userId)->first();

        return Inertia::render('Viatges/Index', [
            'viatges' => $viatges,
            'usuari' => $usuari,
            'request' => $request->all(), 
        ]);
    }
}