
import { Room } from "@/types/room";

// Mock storage for rooms
let mockRooms: Room[] = [
  {
    id: "1",
    nome: "Sala de Reunião Principal",
    numero: "101",
    espaco: 12,
    disponibilidade: "livre",
    descricao: "Sala principal para reuniões executivas",
    sede: "Campus Central",
    recursos: ["Ar Condicionado", "Projetor", "TV", "WiFi"]
  },
  {
    id: "2",
    nome: "Laboratório de Informática",
    numero: "205",
    espaco: 20,
    disponibilidade: "reservada",
    descricao: "Laboratório com computadores para treinamentos",
    sede: "Campus Norte",
    recursos: ["Computadores", "Ar Condicionado", "Quadro Digital", "WiFi"]
  }
];

export const mockRoomService = {
  // Get all rooms
  getRooms: async (): Promise<Room[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockRooms];
  },

  // Create a new room
  createRoom: async (roomData: Omit<Room, 'id'>): Promise<Room> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newRoom: Room = {
      ...roomData,
      id: (mockRooms.length + 1).toString()
    };
    
    mockRooms.push(newRoom);
    return newRoom;
  },

  // Update a room
  updateRoom: async (roomId: string, roomData: Partial<Room>): Promise<Room> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const roomIndex = mockRooms.findIndex(room => room.id === roomId);
    if (roomIndex === -1) {
      throw new Error('Sala não encontrada');
    }
    
    mockRooms[roomIndex] = { ...mockRooms[roomIndex], ...roomData };
    return mockRooms[roomIndex];
  },

  // Delete a room
  deleteRoom: async (roomId: string): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    mockRooms = mockRooms.filter(room => room.id !== roomId);
  },

  // Get rooms by sede
  getRoomsBySede: async (sede: string): Promise<Room[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockRooms.filter(room => room.sede === sede);
  },

  // Get available rooms
  getAvailableRooms: async (): Promise<Room[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockRooms.filter(room => room.disponibilidade === 'livre');
  },

  // Get reserved rooms
  getReservedRooms: async (): Promise<Room[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockRooms.filter(room => room.disponibilidade === 'reservada');
  }
};
