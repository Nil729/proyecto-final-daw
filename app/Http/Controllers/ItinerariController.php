<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Viatge;
use App\Models\Itinerari;
use Illuminate\Http\RedirectResponse;
use Mockery\Undefined;

use function Termwind\render;

class ItinerariController extends Controller
{
    //index
    /*
    public function index()
    {
        return Inertia::render('Itineraris/Index', [
            'itineraris' => Itinerari::with('viatge:id,nomViatge')->latest()->get()
        ]);
    }
    */
    public function index(Request $request)
    {
        $viatgeId = $request->input('viatgeId');


        $itineraris = Itinerari::with('viatge:id,usuari_id')->where('viatge_id', $viatgeId)->get();

        $viatge = Viatge::with('usuari:id,name')->where('id', $viatgeId)->first();

        return Inertia::render('Itineraris/Index', [
            'itineraris' => $itineraris,
            'viatge' => $viatge,
            'request' => $request->all(), // Pass the query parameters
        ]);
    }


    //store
    public function store(Request $request)
    {
        $validated = $request->validate([
            'viatge_id' => 'required',
            'nomItinerari' => 'required|max:50',
            'descripcio' => 'required|max:1000',
            'pais'=> 'required|max:50',
            'latitud' => 'required|numeric',
            'longitud' => 'required|numeric',
            'transport' => 'required|max:50',
            'visites' => 'nullable',
            'durada' => 'required',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            // ruta on guardar la imatge public/itinerarisImg
            $path = public_path() . '/img/itinerarisImg/';
            // agafem la imatge del formulari
            $image = $request->file('foto');
            // li posem un nom únic
            $filename = time() . '.' . $image->getClientOriginalExtension();
            // guardem la imatge al servidor
            $image->move($path, $filename);
            // guardem el nom de la imatge a la base de dades
            $validated['foto'] = $filename;
        }
        // Crear un Itinerari asociado al Viatge
        $viatge = $request->user()->viatges()->findOrFail($request['viatge_id']);

        $itinerari = $viatge->itineraris()->create($validated);



        // redireccionar a la mateixa pàgina amb el viatgeId i el usuari_id
        return redirect()->route('itineraris.index', ['viatgeId' => $itinerari->viatge_id]);
    }

    //update
    public function update(Request $request, $id)
    { 
        $itinerari = Itinerari::findOrFail($id);

        $validated = $request->validate([
            'nomItinerari' => 'required|max:50',
            'descripcio' => 'required|max:1000',
            'pais'=> 'required|max:50',
            'latitud' => 'required|numeric',
            'longitud' => 'required|numeric',
            'transport' => 'required|max:50',
            'visites' => 'nullable',
            'durada' => 'required',
        ]);


               
        $itinerari->update($validated);

        return redirect()->route('itineraris.index', ['viatgeId' => $itinerari->viatge_id]);
    }

    // update Image with a itinerari
    public function updateImage(Request $request, $id)
    {
        dd($request->all());
        $itinerari = Itinerari::findOrFail($id);
        //$this->authorize('update', $itinerari);
        $validated = $request->validate([
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            // ruta on guardar la imatge public/itinerarisImg
            $path = public_path() . '/img/itinerarisImg/';
            // agafem la imatge del formulari
            $image = $request->file('foto');
            // li posem un nom únic
            $filename = time() . '.' . $image->getClientOriginalExtension();
            // guardem la imatge al servidor
            $image->move($path, $filename);
            // guardem el nom de la imatge a la base de dades
            $validated['foto'] = $filename;
        }

        $itinerari->update($validated);

        return redirect()->route('itineraris.index', ['viatgeId' => $itinerari->viatge_id]);
    }

    //destroy
    public function destroy(Itinerari $itinerari)
    {
        //$this->authorize('delete', $itinerari);
        $itinerari->delete();
        return redirect()->route('itineraris.index', ['viatgeId' => $itinerari->viatge_id]);
    }

    /*
    [
            'itineraris' => Itinerari::with('viatge:id,nomViatge')->latest()->get()
        ]
        
    */

    // itinerari segons les cordenades
    public function show( $lat, $lng)
    {
        $range = 0.01; // 0.001 = 100 metres

        $itineraris = Itinerari::with('viatge:id,nomViatge')
            ->whereBetween('latitud', [$lat - $range, $lat + $range])
            ->whereBetween('longitud', [$lng - $range, $lng + $range])
            ->get();        //dd($itineraris[0]->viatge_id);

        if (count($itineraris) == 0 ) {

            return redirect()->route('viatges.index');
        }
        return redirect()->route('itineraris.index', ['viatgeId' => $itineraris[0]->viatge_id] );

    }

    // itinerari segons el pais
    public function showPais($pais)
    {   


        $itineraris = Itinerari::with('viatge:id,nomViatge')
            ->where('pais', $pais)
            ->get();


        if (count($itineraris) == 0) {

            return redirect()->route('viatges.index');
        }


        return redirect()->route('itineraris.index', ['viatgeId' => $itineraris[0]->viatge_id]   );

    }
}