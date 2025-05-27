
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Room;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $rooms = Room::all();
        return response()->json($rooms);
    }

    /**
     * Get rooms by sede
     */
    public function getBySede(string $sede): JsonResponse
    {
        $rooms = Room::bySede($sede)->get();
        return response()->json($rooms);
    }

    /**
     * Get available rooms
     */
    public function getAvailable(): JsonResponse
    {
        $rooms = Room::available()->get();
        return response()->json($rooms);
    }

    /**
     * Get reserved rooms
     */
    public function getReserved(): JsonResponse
    {
        $rooms = Room::reserved()->get();
        return response()->json($rooms);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'nome' => 'required|string|max:255',
            'numero' => 'required|string|max:50',
            'espaco' => 'required|integer|min:1',
            'disponibilidade' => 'required|in:livre,reservada',
            'descricao' => 'nullable|string',
            'sede' => 'required|string|max:255',
            'recursos' => 'array'
        ]);

        // Convert recursos array to JSON string for database storage
        $validatedData['recursos'] = json_encode($validatedData['recursos'] ?? []);

        $room = Room::create($validatedData);

        // Convert recursos back to array for response
        $room->recursos = json_decode($room->recursos, true);

        return response()->json([
            'message' => 'Sala criada com sucesso!',
            'room' => $room
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $room = Room::findOrFail($id);
        $room->recursos = json_decode($room->recursos, true);
        
        return response()->json($room);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $room = Room::findOrFail($id);

        $validatedData = $request->validate([
            'nome' => 'sometimes|required|string|max:255',
            'numero' => 'sometimes|required|string|max:50',
            'espaco' => 'sometimes|required|integer|min:1',
            'disponibilidade' => 'sometimes|required|in:livre,reservada',
            'descricao' => 'nullable|string',
            'sede' => 'sometimes|required|string|max:255',
            'recursos' => 'sometimes|array'
        ]);

        if (isset($validatedData['recursos'])) {
            $validatedData['recursos'] = json_encode($validatedData['recursos']);
        }

        $room->update($validatedData);

        // Convert recursos back to array for response
        $room->recursos = json_decode($room->recursos, true);

        return response()->json([
            'message' => 'Sala atualizada com sucesso!',
            'room' => $room
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $room = Room::findOrFail($id);
        $roomName = $room->nome;
        $room->delete();

        return response()->json([
            'message' => "A sala {$roomName} foi removida com sucesso."
        ]);
    }
}
