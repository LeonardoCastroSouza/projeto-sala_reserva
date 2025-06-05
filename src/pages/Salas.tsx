
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Search } from "lucide-react";
import { Room } from "@/types/room";
import { useToast } from "@/hooks/use-toast";
import { mockRoomService } from "@/services/mockRoomService";
import { EditRoomModal } from "@/components/EditRoomModal";

const Salas = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    filterRooms();
  }, [rooms, searchTerm]);

  const fetchRooms = async () => {
    try {
      console.log('Buscando salas...');
      const data = await mockRoomService.getRooms();
      console.log('Salas carregadas:', data);
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

  const filterRooms = () => {
    if (!searchTerm) {
      setFilteredRooms(rooms);
      return;
    }

    const filtered = rooms.filter(room => 
      room.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.sede.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRooms(filtered);
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    setIsEditModalOpen(true);
  };

  const handleEditSave = async (updatedRoom: Room) => {
    try {
      console.log('Atualizando sala...', updatedRoom);
      await mockRoomService.updateRoom(updatedRoom.id!, updatedRoom);
      
      toast({
        title: "Sucesso",
        description: "Sala atualizada com sucesso!",
      });

      fetchRooms();
    } catch (error) {
      console.error('Erro ao atualizar sala:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar a sala.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (roomId: string, roomName: string) => {
    if (!confirm(`Tem certeza que deseja excluir a sala "${roomName}"?`)) {
      return;
    }

    try {
      console.log('Excluindo sala:', roomId);
      await mockRoomService.deleteRoom(roomId);

      toast({
        title: "Sucesso",
        description: `Sala "${roomName}" excluída com sucesso!`,
      });

      fetchRooms();
    } catch (error) {
      console.error('Erro ao excluir sala:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir a sala.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Salas Cadastradas</CardTitle>
          <CardDescription>
            {loading ? "Carregando..." : `${filteredRooms.length} de ${rooms.length} sala(s) encontrada(s)`}
          </CardDescription>
          
          {/* Barra de Pesquisa */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Pesquisar por nome, número, sede ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p>Carregando salas...</p>
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {searchTerm ? 'Nenhuma sala encontrada com os critérios de pesquisa.' : 'Nenhuma sala cadastrada ainda.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredRooms.map((room) => (
                <div key={room.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{room.nome}</h3>
                      <p className="text-sm text-gray-600">
                        Sala {room.numero} - {room.sede}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(room)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(room.id!, room.nome)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-sm">
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
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Edição */}
      <EditRoomModal
        room={editingRoom}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingRoom(null);
        }}
        onSave={handleEditSave}
      />
    </div>
  );
};

export default Salas;
