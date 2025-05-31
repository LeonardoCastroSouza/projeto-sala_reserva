
export interface Room {
  id?: string;
  nome: string;
  numero: string;
  espaco: number;
  disponibilidade: 'livre' | 'reservada';
  descricao: string;
  sede: string;
  recursos: string[];
}

export interface Sede {
  id: string;
  nome: string;
}

export const RECURSOS_DISPONIVEIS = [
  'Ar Condicionado',
  'Projetor',
  'Computadores',
  'Quadro Branco',
  'Quadro Digital',
  'TV',
  'Som',
  'Microfone',
  'WiFi',
  'Tomadas',
  'Acessibilidade',
  'Mesa de Reunião'
];

export const SEDES_DISPONIVEIS: Sede[] = [
  { id: '1', nome: 'Campus Central' },
  { id: '2', nome: 'Campus Norte' },
  { id: '3', nome: 'Campus Sul' },
  { id: '4', nome: 'Anexo A' },
  { id: '5', nome: 'Anexo B' },
  { id: '6', nome: 'Campus Canada' },
  { id: '7', nome: 'Campus Ipolon' },
  { id: '8', nome: 'Campus Sede' },
  { id: '9', nome: 'Campus Gleba Palhano' }
];
