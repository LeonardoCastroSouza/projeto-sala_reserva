<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
    <RoomFormAPI @room-created="loadRooms" @show-toast="showToast" />
    
    <div v-if="loading" class="max-w-4xl mx-auto p-6 mt-8 text-center">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Carregando salas...</p>
    </div>
    
    <div v-else-if="rooms.length > 0" class="max-w-4xl mx-auto p-6 mt-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Salas Cadastradas ({{ rooms.length }})
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="room in rooms"
          :key="room.id"
          class="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-200 relative rounded-lg"
        >
          <div class="p-6 pb-3">
            <div class="flex items-center justify-between">
              <span class="text-lg font-semibold text-gray-800">{{ room.nome }}</span>
              <div class="flex items-center gap-2">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
                    room.disponibilidade === 'livre' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ room.disponibilidade === 'livre' ? 'Livre' : 'Reservada' }}
                </span>
                <button
                  @click="handleRemoveRoom(room.id, room.nome)"
                  :disabled="deletingRoom === room.id"
                  class="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 rounded border border-gray-300 flex items-center justify-center transition-colors disabled:opacity-50"
                >
                  <svg v-if="deletingRoom === room.id" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <!-- Room details remain the same as previous component -->
          <div class="px-6 pb-6 space-y-3">
            <div class="flex items-center gap-2 text-gray-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-1-8h1m-1 4h1"/>
              </svg>
              <span class="text-sm">Sala {{ room.numero }}</span>
            </div>
            
            <div class="flex items-center gap-2 text-gray-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
              <span class="text-sm">{{ room.espaco }} pessoas</span>
            </div>
            
            <div class="flex items-center gap-2 text-gray-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="text-sm">{{ room.sede }}</span>
            </div>
            
            <div v-if="room.descricao" class="text-sm text-gray-600 mt-2">
              <p class="line-clamp-2">{{ room.descricao }}</p>
            </div>
            
            <div v-if="room.recursos && room.recursos.length > 0" class="mt-3">
              <div class="flex items-center gap-1 mb-2">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span class="text-xs font-medium text-gray-500">RECURSOS</span>
              </div>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="(recurso, index) in room.recursos.slice(0, 3)"
                  :key="recurso"
                  class="inline-flex items-center px-2 py-1 rounded text-xs border border-gray-300 bg-gray-50"
                >
                  {{ recurso }}
                </span>
                <span
                  v-if="room.recursos.length > 3"
                  class="inline-flex items-center px-2 py-1 rounded text-xs border border-gray-300 bg-gray-50"
                >
                  +{{ room.recursos.length - 3 }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Component (same as before) -->
    <div
      v-if="toast.show"
      :class="[
        'fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-300 z-50',
        toast.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'
      ]"
    >
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg v-if="toast.type === 'success'" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <svg v-else class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="ml-3 flex-1">
          <h3 class="text-sm font-medium">{{ toast.title }}</h3>
          <p class="mt-1 text-sm">{{ toast.description }}</p>
        </div>
        <button @click="hideToast" class="ml-4 text-gray-400 hover:text-gray-600">
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import RoomFormAPI from './RoomFormAPI.vue'

export default {
  name: 'RoomManagerAPI',
  components: {
    RoomFormAPI
  },
  data() {
    return {
      rooms: [],
      loading: false,
      deletingRoom: null,
      toast: {
        show: false,
        title: '',
        description: '',
        type: 'success'
      }
    }
  },
  async created() {
    await this.loadRooms();
  },
  methods: {
    async loadRooms() {
      this.loading = true;
      try {
        const response = await axios.get('/api/rooms');
        this.rooms = response.data;
      } catch (error) {
        console.error('Erro ao carregar salas:', error);
        this.showToast({
          title: "Erro",
          description: "Não foi possível carregar as salas.",
          type: "error"
        });
      } finally {
        this.loading = false;
      }
    },
    async handleRemoveRoom(roomId, roomName) {
      this.deletingRoom = roomId;
      try {
        await axios.delete(`/api/rooms/${roomId}`);
        await this.loadRooms(); // Reload rooms
        this.showToast({
          title: "Sala removida",
          description: `A sala ${roomName} foi removida com sucesso.`,
          type: "success"
        });
      } catch (error) {
        console.error('Erro ao remover sala:', error);
        this.showToast({
          title: "Erro",
          description: "Não foi possível remover a sala.",
          type: "error"
        });
      } finally {
        this.deletingRoom = null;
      }
    },
    showToast(toastData) {
      this.toast = {
        show: true,
        title: toastData.title,
        description: toastData.description,
        type: toastData.type || 'success'
      };
      
      setTimeout(() => {
        this.hideToast();
      }, 3000);
    },
    hideToast() {
      this.toast.show = false;
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
