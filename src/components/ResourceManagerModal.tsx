
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResourceManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recursos: string[];
  onUpdateRecursos: (newRecursos: string[]) => void;
}

export const ResourceManagerModal: React.FC<ResourceManagerModalProps> = ({
  isOpen,
  onClose,
  recursos,
  onUpdateRecursos
}) => {
  const { toast } = useToast();
  const [newResource, setNewResource] = useState('');

  const handleAddResource = () => {
    if (!newResource.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite o nome do recurso.",
        variant: "destructive",
      });
      return;
    }

    if (recursos.includes(newResource.trim())) {
      toast({
        title: "Erro",
        description: "Este recurso já existe na lista.",
        variant: "destructive",
      });
      return;
    }

    const updatedRecursos = [...recursos, newResource.trim()];
    onUpdateRecursos(updatedRecursos);
    setNewResource('');
    
    toast({
      title: "Sucesso",
      description: "Recurso adicionado com sucesso!",
    });
  };

  const handleRemoveResource = (resourceToRemove: string) => {
    const updatedRecursos = recursos.filter(resource => resource !== resourceToRemove);
    onUpdateRecursos(updatedRecursos);
    
    toast({
      title: "Sucesso",
      description: "Recurso removido com sucesso!",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddResource();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Gerenciar Recursos Disponíveis
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Adicionar novo recurso */}
          <div className="space-y-3">
            <Label htmlFor="new-resource">Adicionar Novo Recurso</Label>
            <div className="flex gap-2">
              <Input
                id="new-resource"
                value={newResource}
                onChange={(e) => setNewResource(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ex: Mesa Redonda, Webcam, etc."
                className="flex-1"
              />
              <Button onClick={handleAddResource} className="px-4">
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            </div>
          </div>

          {/* Lista de recursos existentes */}
          <div className="space-y-3">
            <Label>Recursos Disponíveis ({recursos.length})</Label>
            {recursos.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                Nenhum recurso cadastrado ainda.
              </p>
            ) : (
              <div className="grid gap-2 max-h-60 overflow-y-auto p-3 border rounded-lg bg-gray-50">
                {recursos.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-white rounded border"
                  >
                    <Badge variant="outline" className="text-sm">
                      {resource}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveResource(resource)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botões de ação */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
