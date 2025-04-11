<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ViatgeController;
use App\Http\Controllers\CalificacioController;
use App\Http\Controllers\ItinerariController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth')->group(function () {
    // try to acces to http://localhost:8000/api/viatges if you are not logged in render a login page
    //Route::get('/viatges', [ViatgeController::class, 'index'])->name('viatges.index');

});


Route::get('/calificacions', [CalificacioController::class, 'index'])
->name('calificacions.index');
Route::get('/calificacions/{id}', [CalificacioController::class, 'show'])
->name('calificacions.show');
Route::post('/calificacions', [CalificacioController::class, 'store'])
->name('calificacions.store');
Route::put('/calificacions/{id}', [CalificacioController::class, 'update'])
->name('calificacions.update');
Route::delete('/calificacions/{id}/{itinerari_id}', [CalificacioController::class, 'destroy'])
->name('calificacions.destroy');
