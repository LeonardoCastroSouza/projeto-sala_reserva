
import { Room } from "@/types/room";

const API_BASE_URL = 'http://localhost:8000/api';

export const roomService = {
  // Get all rooms
  getRooms: async (): Promise<Room[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.map((room: any) => ({
        ...room,
        recursos: Array.isArray(room.recursos) ? room.recursos : JSON.parse(room.recursos || '[]')
      }));
    } catch (error) {
      console.error('Erro ao buscar salas:', error);
      throw error;
    }
  },

  // Create a new room
  createRoom: async (roomData: Omit<Room, 'id'>): Promise<Room> => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        ...result.room,
        recursos: Array.isArray(result.room.recursos) ? result.room.recursos : JSON.parse(result.room.recursos || '[]')
      };
    } catch (error) {
      console.error('Erro ao criar sala:', error);
      throw error;
    }
  },

  // Update a room
  updateRoom: async (roomId: string, roomData: Partial<Room>): Promise<Room> => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        ...result.room,
        recursos: Array.isArray(result.room.recursos) ? result.room.recursos : JSON.parse(result.room.recursos || '[]')
      };
    } catch (error) {
      console.error('Erro ao atualizar sala:', error);
      throw error;
    }
  },

  // Delete a room
  deleteRoom: async (roomId: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao excluir sala:', error);
      throw error;
    }
  },

  // Get rooms by sede
  getRoomsBySede: async (sede: string): Promise<Room[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/sede/${encodeURIComponent(sede)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.map((room: any) => ({
        ...room,
        recursos: Array.isArray(room.recursos) ? room.recursos : JSON.parse(room.recursos || '[]')
      }));
    } catch (error) {
      console.error('Erro ao buscar salas por sede:', error);
      throw error;
    }
  },

  // Get available rooms
  getAvailableRooms: async (): Promise<Room[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/available`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.map((room: any) => ({
        ...room,
        recursos: Array.isArray(room.recursos) ? room.recursos : JSON.parse(room.recursos || '[]')
      }));
    } catch (error) {
      console.error('Erro ao buscar salas disponíveis:', error);
      throw error;
    }
  },

  // Get reserved rooms
  getReservedRooms: async (): Promise<Room[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/reserved`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.map((room: any) => ({
        ...room,
        recursos: Array.isArray(room.recursos) ? room.recursos : JSON.parse(room.recursos || '[]')
      }));
    } catch (error) {
      console.error('Erro ao buscar salas reservadas:', error);
      throw error;
    }
  }
};
