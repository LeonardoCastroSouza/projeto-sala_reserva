
import React, { useState } from 'react';
import { RoomForm } from '@/components/RoomForm';
import { Room } from '@/types/room';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Users, MapPin, Settings } from 'lucide-react';

const Index = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  const handleRoomSubmit = (room: Room) => {
    setRooms(prev => [...prev, room]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <RoomForm onSubmit={handleRoomSubmit} />
      
      {rooms.length > 0 && (
        <div className="max-w-4xl mx-auto p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Salas Cadastradas ({rooms.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <Card key={room.id} className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-800">{room.nome}</span>
                    <Badge 
                      variant={room.disponibilidade === 'livre' ? 'default' : 'destructive'}
                      className={room.disponibilidade === 'livre' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {room.disponibilidade === 'livre' ? 'Livre' : 'Reservada'}
                    </Badge>
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
