
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Room, SEDES_DISPONIVEIS } from '@/types/room';
import { useToast } from '@/hooks/use-toast';
import { useResourceManager } from '@/hooks/useResourceManager';

interface EditRoomModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedRoom: Room) => void;
}

export const EditRoomModal: React.FC<EditRoomModalProps> = ({
  room,
  isOpen,
  onClose,
  onSave
}) => {
  const { toast } = useToast();
  const { recursos } = useResourceManager();
  const [formData, setFormData] = useState({
    nome: '',
    numero: '',
    espaco: '',
    descricao: '',
    sede: '',
    recursos: [] as string[]
  });

  useEffect(() => {
    if (room) {
      setFormData({
        nome: room.nome,
        numero: room.numero,
        espaco: room.espaco.toString(),
        descricao: room.descricao,
        sede: room.sede,
        recursos: room.recursos || []
      });
    }
  }, [room]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.numero || !formData.espaco || !formData.sede) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (!room) return;

    const updatedRoom: Room = {
      ...room,
      nome: formData.nome,
      numero: formData.numero,
      espaco: parseInt(formData.espaco),
      descricao: formData.descricao,
      sede: formData.sede,
      recursos: formData.recursos
    };

    onSave(updatedRoom);
    onClose();
  };

  const handleRecursoChange = (recurso: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      recursos: checked 
        ? [...prev.recursos, recurso]
        : prev.recursos.filter(r => r !== recurso)
    }));
  };

  if (!room) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Sala</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-nome">Nome da Sala *</Label>
              <Input
                id="edit-nome"
                value={formData.nome}
                onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                placeholder="Ex: Sala de Reunião A"
              />
            </div>
            <div>
              <Label htmlFor="edit-numero">Número *</Label>
              <Input
                id="edit-numero"
                value={formData.numero}
                onChange={(e) => setFormData(prev => ({ ...prev, numero: e.target.value }))}
                placeholder="Ex: 101"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-espaco">Capacidade (pessoas) *</Label>
              <Input
                id="edit-espaco"
                type="number"
                min="1"
                value={formData.espaco}
                onChange={(e) => setFormData(prev => ({ ...prev, espaco: e.target.value }))}
                placeholder="Ex: 10"
              />
            </div>
            <div>
              <Label htmlFor="edit-sede">Sede *</Label>
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
            <Label htmlFor="edit-descricao">Descrição</Label>
            <Textarea
              id="edit-descricao"
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
                    id={`edit-${recurso}`}
                    checked={formData.recursos.includes(recurso)}
                    onCheckedChange={(checked) => handleRecursoChange(recurso, checked as boolean)}
                  />
                  <Label htmlFor={`edit-${recurso}`} className="text-sm">
                    {recurso}
                  </Label>
                </div>
              ))}
            </div>
            
            {formData.recursos.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Recursos selecionados:</p>
                <div className="flex flex-wrap gap-1">
                  {formData.recursos.map((recurso) => (
                    <Badge key={recurso} variant="outline" className="text-xs">
                      {recurso}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
