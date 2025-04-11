<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ViatgeController;
use App\Http\Controllers\ItinerariController;
use GuzzleHttp\Middleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Viatge;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::resource('viatges', ViatgeController::class)
    ->only(['index', 'store', 'patch', 'update', 'destroy'])
    ->middleware(['auth']);


Route::resource('itineraris', ItinerariController::class)
    ->only(['index', 'store', 'patch', 'update', 'destroy'])
    ->middleware(['auth']);


Route::get('/dashboard', function () {
    $viarges = Viatge::with('usuari:id,name')->latest()->get();
    return Inertia::render('Dashboard', [
        'viatges' => $viarges
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/itineraris/{lat}/{lng}', [ItinerariController::class, 'show'])->name('itineraris.show');
    Route::get('/itineraris/{pais}', [ItinerariController::class, 'showPais'])->name('itineraris.showPais');
    Route::post('/itineraris', [ItinerariController::class, 'store'])->name('itineraris.store');
    Route::patch('/itineraris/{itinerari}/updateImage', [ItinerariController::class, 'updateImage'])->name('itineraris.updateImage');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


});

require __DIR__ . '/auth.php';
