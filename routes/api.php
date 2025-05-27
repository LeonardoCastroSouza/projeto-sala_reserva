
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;

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

// Room management routes
Route::apiResource('rooms', RoomController::class);

// Additional room routes
Route::get('rooms/sede/{sede}', [RoomController::class, 'getBySede']);
Route::get('rooms/available', [RoomController::class, 'getAvailable']);
Route::get('rooms/reserved', [RoomController::class, 'getReserved']);
