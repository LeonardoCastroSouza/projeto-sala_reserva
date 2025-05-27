
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Room, RECURSOS_DISPONIVEIS, SEDES_DISPONIVEIS } from '@/types/room';
import { MapPin, Users, Building, Settings, CheckCircle, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RoomFormProps {
  onSubmit: (room: Room) => void;
}

export const RoomForm: React.FC<RoomFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Omit<Room, 'id'>>({
    nome: '',
    numero: '',
    espaco: 0,
    disponibilidade: 'livre',
    descricao: '',
    sede: '',
    recursos: []
  });

  const handleInputChange = (field: keyof Room, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRecursoToggle = (recurso: string) => {
    setFormData(prev => ({
      ...prev,
      recursos: prev.recursos.includes(recurso)
        ? prev.recursos.filter(r => r !== recurso)
        : [...prev.recursos, recurso]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.numero || !formData.sede) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const newRoom: Room = {
      ...formData,
      id: Date.now().toString()
    };

    onSubmit(newRoom);
    
    toast({
      title: "Sala cadastrada com sucesso!",
      description: `A sala ${formData.nome} foi criada.`,
    });

    // Reset form
    setFormData({
      nome: '',
      numero: '',
      espaco: 0,
      disponibilidade: 'livre',
      descricao: '',
      sede: '',
      recursos: []
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Cadastro de Salas
        </h1>
        <p className="text-gray-600 mt-2">Gerencie as salas da sua instituição</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informações Básicas */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Building className="w-5 h-5" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
                  Nome da Sala *
                </Label>
                <Input
                  id="nome"
                  type="text"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  placeholder="Ex: Sala de Reuniões A1"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="numero" className="text-sm font-medium text-gray-700">
                  Número da Sala *
                </Label>
                <Input
                  id="numero"
                  type="text"
                  value={formData.numero}
                  onChange={(e) => handleInputChange('numero', e.target.value)}
                  placeholder="Ex: 101, A-201"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="espaco" className="text-sm font-medium text-gray-700">
                  Capacidade de Pessoas
                </Label>
                <Input
                  id="espaco"
                  type="number"
                  min="1"
                  value={formData.espaco || ''}
                  onChange={(e) => handleInputChange('espaco', parseInt(e.target.value) || 0)}
                  placeholder="Ex: 30"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Localização e Status */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <MapPin className="w-5 h-5" />
                Localização e Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sede" className="text-sm font-medium text-gray-700">
                  Sede *
                </Label>
                <Select value={formData.sede} onValueChange={(value) => handleInputChange('sede', value)}>
                  <SelectTrigger className="mt-1">
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

              <div>
                <Label htmlFor="disponibilidade" className="text-sm font-medium text-gray-700">
                  Disponibilidade
                </Label>
                <Select value={formData.disponibilidade} onValueChange={(value: 'livre' | 'reservada') => handleInputChange('disponibilidade', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="livre">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Livre
                      </div>
                    </SelectItem>
                    <SelectItem value="reservada">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Reservada
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">
                  Capacidade: {formData.espaco || 0} pessoas
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Descrição */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Settings className="w-5 h-5" />
              Descrição e Observações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="descricao" className="text-sm font-medium text-gray-700">
                Descrição da Sala
              </Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                placeholder="Descreva características especiais, restrições ou observações importantes sobre a sala..."
                className="mt-1 min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recursos */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-orange-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <CheckCircle className="w-5 h-5" />
              Recursos Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {RECURSOS_DISPONIVEIS.map((recurso) => (
                <div key={recurso} className="flex items-center space-x-2">
                  <Checkbox
                    id={recurso}
                    checked={formData.recursos.includes(recurso)}
                    onCheckedChange={() => handleRecursoToggle(recurso)}
                  />
                  <Label
                    htmlFor={recurso}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {recurso}
                  </Label>
                </div>
              ))}
            </div>
            
            {formData.recursos.length > 0 && (
              <div className="mt-4 p-3 bg-white rounded-lg border">
                <p className="text-sm font-medium text-gray-700 mb-2">Recursos selecionados:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.recursos.map((recurso) => (
                    <Badge key={recurso} variant="secondary" className="bg-blue-100 text-blue-800">
                      {recurso}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Botão de Submit */}
        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            size="lg"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Cadastrar Sala
          </Button>
        </div>
      </form>
    </div>
  );
};
