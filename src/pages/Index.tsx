
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Room, SEDES_DISPONIVEIS } from "@/types/room";
import { useToast } from "@/hooks/use-toast";
import { mockRoomService } from "@/services/mockRoomService";
import { ResourceManagerModal } from "@/components/ResourceManagerModal";
import { useResourceManager } from "@/hooks/useResourceManager";
import { Dashboard } from "@/components/Dashboard";
import { Settings } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const { recursos, updateRecursos } = useResourceManager();
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [refreshDashboard, setRefreshDashboard] = useState(0);
  
  // Form state
  const [formData, setFormData] = useState({
    nome: '',
    numero: '',
    espaco: '',
    descricao: '',
    sede: '',
    recursos: [] as string[]
  });

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
        disponibilidade: 'livre' as const
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

      // Refresh dashboard
      setRefreshDashboard(prev => prev + 1);

    } catch (error) {
      console.error('Erro ao cadastrar sala:', error);
      toast({
        title: "Erro",
        description: "Erro ao cadastrar a sala.",
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
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Dashboard */}
      <div key={refreshDashboard}>
        <Dashboard />
      </div>

      {/* Formulário de Cadastro */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Cadastrar Nova Sala</CardTitle>
              <CardDescription>
                Preencha os dados para cadastrar uma nova sala
              </CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsResourceModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Gerenciar Recursos
            </Button>
          </div>
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
                {recursos.map((recurso) => (
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

      {/* Modal de Gerenciamento de Recursos */}
      <ResourceManagerModal
        isOpen={isResourceModalOpen}
        onClose={() => setIsResourceModalOpen(false)}
        recursos={recursos}
        onUpdateRecursos={updateRecursos}
      />
    </div>
  );
};

export default Index;
