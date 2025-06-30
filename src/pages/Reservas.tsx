
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Room } from "@/types/room";
import { useToast } from "@/hooks/use-toast";

const Reservas = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/rooms', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Erro ao buscar salas:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar as salas.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleReservation = async (roomId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'livre' ? 'reservada' : 'livre';
      
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          disponibilidade: newStatus
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setRooms(rooms.map(room => 
        room.id === roomId 
          ? { ...room, disponibilidade: newStatus }
          : room
      ));

      toast({
        title: "Sucesso",
        description: `Sala ${newStatus === 'reservada' ? 'reservada' : 'liberada'} com sucesso!`,
      });
    } catch (error) {
      console.error('Erro ao atualizar reserva:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar a reserva da sala.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Carregando salas...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Reservas de Salas</h1>
        <p className="text-gray-600 mt-2">
          Gerencie as reservas realizadas
        </p>
      </div>

      {rooms.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">Nenhuma reserva foi encontrada .</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{room.nome}</CardTitle>
                    <CardDescription>
                      Sala {room.numero} - {room.sede}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={room.disponibilidade === 'livre' ? 'default' : 'destructive'}
                  >
                    {room.disponibilidade === 'livre' ? 'Livre' : 'Reservada'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Capacidade:</strong> {room.espaco} pessoas</p>
                  {room.descricao && (
                    <p><strong>Descrição:</strong> {room.descricao}</p>
                  )}
                  {room.recursos && room.recursos.length > 0 && (
                    <div>
                      <p><strong>Recursos:</strong></p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {room.recursos.map((recurso, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {recurso}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={() => toggleReservation(room.id!, room.disponibilidade)}
                  variant={room.disponibilidade === 'livre' ? 'default' : 'outline'}
                  className="w-full"
                >
                  {room.disponibilidade === 'livre' ? 'Reservar Sala' : 'Liberar Sala'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservas;
