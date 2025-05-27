
import axios from 'axios';
import { Room } from '@/types/room';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const roomService = {
  // Get all rooms
  getAllRooms: async (): Promise<Room[]> => {
    const response = await axios.get('/api/rooms');
    return response.data;
  },

  // Get available rooms
  getAvailableRooms: async (): Promise<Room[]> => {
    const response = await axios.get('/api/rooms/available');
    return response.data;
  },

  // Get reserved rooms
  getReservedRooms: async (): Promise<Room[]> => {
    const response = await axios.get('/api/rooms/reserved');
    return response.data;
  },

  // Get rooms by sede
  getRoomsBySede: async (sede: string): Promise<Room[]> => {
    const response = await axios.get(`/api/rooms/sede/${sede}`);
    return response.data;
  },

  // Create a new room
  createRoom: async (room: Omit<Room, 'id'>): Promise<Room> => {
    const response = await axios.post('/api/rooms', room);
    return response.data.room;
  },

  // Update a room
  updateRoom: async (id: string, updates: Partial<Room>): Promise<Room> => {
    const response = await axios.put(`/api/rooms/${id}`, updates);
    return response.data.room;
  },

  // Delete a room
  deleteRoom: async (id: string): Promise<void> => {
    await axios.delete(`/api/rooms/${id}`);
  },

  // Toggle room availability
  toggleRoomReservation: async (id: string, currentStatus: string): Promise<Room> => {
    const newStatus = currentStatus === 'livre' ? 'reservada' : 'livre';
    const response = await axios.put(`/api/rooms/${id}`, {
      disponibilidade: newStatus
    });
    return response.data.room;
  }
};
