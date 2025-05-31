import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Room, RECURSOS_DISPONIVEIS, SEDES_DISPONIVEIS } from "@/types/room";
import { useToast } from "@/hooks/use-toast";
import { mockRoomService } from "@/services/mockRoomService";

const Index = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    nome: '',
    numero: '',
    espaco: '',
    descricao: '',
    sede: '',
    recursos: [] as string[]
  });

  useEffect(() => {
    fetchRooms();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.numero || !formData.espaco || !formData.sede) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Cadastrando sala...', formData);
      
      const roomData = {
        nome: formData.nome,
        numero: formData.numero,
        espaco: parseInt(formData.espaco),
        descricao: formData.descricao,
        sede: formData.sede,
        recursos: formData.recursos,
        disponibilidade: 'livre' as const // Sempre criada como livre por padrão
      };

      const result = await mockRoomService.createRoom(roomData);
      console.log('Sala cadastrada:', result);
      
      toast({
        title: "Sucesso",
        description: "Sala cadastrada com sucesso!",
      });

      // Reset form
      setFormData({
        nome: '',
        numero: '',
        espaco: '',
        descricao: '',
        sede: '',
        recursos: []
      });

      // Refresh rooms list
      fetchRooms();
    } catch (error) {
      console.error('Erro ao cadastrar sala:', error);
      toast({
        title: "Erro",
        description: "Erro ao cadastrar a sala.",
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

  const handleRecursoChange = (recurso: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      recursos: checked 
        ? [...prev.recursos, recurso]
        : prev.recursos.filter(r => r !== recurso)
    }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulário de Cadastro */}
        <Card>
          <CardHeader>
            <CardTitle>Cadastrar Nova Sala</CardTitle>
            <CardDescription>
              Preencha os dados para cadastrar uma nova sala
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome da Sala *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                    placeholder="Ex: Sala de Reunião A"
                  />
                </div>
                <div>
                  <Label htmlFor="numero">Número *</Label>
                  <Input
                    id="numero"
                    value={formData.numero}
                    onChange={(e) => setFormData(prev => ({ ...prev, numero: e.target.value }))}
                    placeholder="Ex: 101"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="espaco">Capacidade (pessoas) *</Label>
                  <Input
                    id="espaco"
                    type="number"
                    min="1"
                    value={formData.espaco}
                    onChange={(e) => setFormData(prev => ({ ...prev, espaco: e.target.value }))}
                    placeholder="Ex: 10"
                  />
                </div>
                <div>
                  <Label htmlFor="sede">Sede *</Label>
                  <Select value={formData.sede} onValueChange={(value) => setFormData(prev => ({ ...prev, sede: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a sede" />
                    </SelectTrigger>
                    <SelectContent>
                      {SEDES_DISPONIVEIS.map((sede) => (
                        <SelectItem key={sede.id} value={sede.nome}>
                          {sede.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                  placeholder="Descrição opcional da sala"
                  rows={3}
                />
              </div>

              <div>
                <Label>Recursos Disponíveis</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {RECURSOS_DISPONIVEIS.map((recurso) => (
                    <div key={recurso} className="flex items-center space-x-2">
                      <Checkbox
                        id={recurso}
                        checked={formData.recursos.includes(recurso)}
                        onCheckedChange={(checked) => handleRecursoChange(recurso, checked as boolean)}
                      />
                      <Label htmlFor={recurso} className="text-sm">
                        {recurso}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full">
                Cadastrar Sala
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Lista de Salas */}
        <Card>
          <CardHeader>
            <CardTitle>Salas Cadastradas</CardTitle>
            <CardDescription>
              {loading ? "Carregando..." : `${rooms.length} sala(s) cadastrada(s)`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p>Carregando salas...</p>
              </div>
            ) : rooms.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Nenhuma sala cadastrada ainda.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {rooms.map((room) => (
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
      </div>
    </div>
  );
};

export default Index;
