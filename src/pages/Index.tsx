
import React, { useState } from 'react';
import { RoomForm } from '@/components/RoomForm';
import { Room } from '@/types/room';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, Users, MapPin, Settings, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { toast } = useToast();

  const handleRoomSubmit = (room: Room) => {
    setRooms(prev => [...prev, room]);
  };

  const handleRemoveRoom = (roomId: string, roomName: string) => {
    setRooms(prev => prev.filter(room => room.id !== roomId));
    toast({
      title: "Sala removida",
      description: `A sala ${roomName} foi removida com sucesso.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <RoomForm onSubmit={handleRoomSubmit} />
      
      {rooms.length > 0 && (
        <div className="max-w-4xl mx-auto p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Salas Cadastradas ({rooms.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <Card key={room.id} className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-200 relative">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-800">{room.nome}</span>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={room.disponibilidade === 'livre' ? 'default' : 'destructive'}
                        className={room.disponibilidade === 'livre' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {room.disponibilidade === 'livre' ? 'Livre' : 'Reservada'}
                      </Badge>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveRoom(room.id!, room.nome)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building className="w-4 h-4" />
                    <span className="text-sm">Sala {room.numero}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{room.espaco} pessoas</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{room.sede}</span>
                  </div>
                  
                  {room.descricao && (
                    <div className="text-sm text-gray-600 mt-2">
                      <p className="line-clamp-2">{room.descricao}</p>
                    </div>
                  )}
                  
                  {room.recursos.length > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center gap-1 mb-2">
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span className="text-xs font-medium text-gray-500">RECURSOS</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {room.recursos.slice(0, 3).map((recurso) => (
                          <Badge key={recurso} variant="outline" className="text-xs">
                            {recurso}
                          </Badge>
                        ))}
                        {room.recursos.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{room.recursos.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
