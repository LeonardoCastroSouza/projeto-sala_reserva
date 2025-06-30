
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Calendar, Users, CheckCircle } from "lucide-react";
import { mockRoomService } from "@/services/mockRoomService";
import { Room } from "@/types/room";

export const Dashboard: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await mockRoomService.getRooms();
      setRooms(data);
    } catch (error) {
      console.error('Erro ao buscar salas:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalSalas: rooms.length,
    salasLivres: rooms.filter(room => room.disponibilidade === 'livre').length,
    salasReservadas: rooms.filter(room => room.disponibilidade === 'reservada').length,
    capacidadeTotal: rooms.reduce((acc, room) => acc + room.espaco, 0)
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Carregando dados...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Salas</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSalas}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salas Livres</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.salasLivres}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salas Reservadas</CardTitle>
            <Calendar className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.salasReservadas}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacidade Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.capacidadeTotal}</div>
            <p className="text-xs text-muted-foreground">pessoas</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Salas Resumida */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo das Salas</CardTitle>
          <CardDescription>
            Status atual de todas as salas cadastradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {rooms.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              Nenhuma sala cadastrada ainda. Use o formulário acima para cadastrar a primeira sala.
            </p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {rooms.map((room) => (
                <div key={room.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium">{room.nome}</h4>
                      <Badge 
                        variant={room.disponibilidade === 'livre' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {room.disponibilidade === 'livre' ? 'Livre' : 'Reservada'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Sala {room.numero} - {room.sede} - {room.espaco} pessoas
                    </p>
                  </div>
                  {room.recursos && room.recursos.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      {room.recursos.length} recurso(s)
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
