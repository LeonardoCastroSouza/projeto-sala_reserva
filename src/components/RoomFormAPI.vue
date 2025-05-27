<template>
  <!-- O template é o mesmo do RoomForm.vue, apenas mudando o método handleSubmit -->
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <!-- ... keep existing code (todo o template do RoomForm.vue) -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
        Cadastro de Salas
      </h1>
      <p class="text-gray-600 mt-2">Gerencie as salas da sua instituição</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Informações Básicas -->
        <div class="shadow-lg border-0 bg-gradient-to-br from-white to-orange-50 rounded-lg">
          <div class="p-6 pb-4">
            <h3 class="flex items-center gap-2 text-orange-700 text-lg font-semibold">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-1-8h1m-1 4h1"/>
              </svg>
              Informações Básicas
            </h3>
          </div>
          <div class="px-6 pb-6 space-y-4">
            <div>
              <label for="nome" class="block text-sm font-medium text-gray-700 mb-1">
                Nome da Sala *
              </label>
              <input
                id="nome"
                v-model="formData.nome"
                type="text"
                placeholder="Ex: Sala de Reuniões A1"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label for="numero" class="block text-sm font-medium text-gray-700 mb-1">
                Número da Sala *
              </label>
              <input
                id="numero"
                v-model="formData.numero"
                type="text"
                placeholder="Ex: 101, A-201"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label for="espaco" class="block text-sm font-medium text-gray-700 mb-1">
                Capacidade de Pessoas
              </label>
              <input
                id="espaco"
                v-model.number="formData.espaco"
                type="number"
                min="1"
                placeholder="Ex: 30"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        <!-- Localização e Status -->
        <div class="shadow-lg border-0 bg-gradient-to-br from-white to-orange-50 rounded-lg">
          <div class="p-6 pb-4">
            <h3 class="flex items-center gap-2 text-orange-700 text-lg font-semibold">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Localização e Status
            </h3>
          </div>
          <div class="px-6 pb-6 space-y-4">
            <div>
              <label for="sede" class="block text-sm font-medium text-gray-700 mb-1">
                Sede *
              </label>
              <select
                id="sede"
                v-model="formData.sede"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Selecione a sede</option>
                <option v-for="sede in sedesDisponiveis" :key="sede.id" :value="sede.nome">
                  {{ sede.nome }}
                </option>
              </select>
            </div>

            <div>
              <label for="disponibilidade" class="block text-sm font-medium text-gray-700 mb-1">
                Disponibilidade
              </label>
              <select
                id="disponibilidade"
                v-model="formData.disponibilidade"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="livre">
                  🟢 Livre
                </option>
                <option value="reservada">
                  🔴 Reservada
                </option>
              </select>
            </div>

            <div class="flex items-center gap-2 p-3 bg-white rounded-lg border">
              <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
              <span class="text-sm text-gray-600">
                Capacidade: {{ formData.espaco || 0 }} pessoas
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Descrição -->
      <div class="shadow-lg border-0 bg-gradient-to-br from-white to-orange-50 rounded-lg">
        <div class="p-6 pb-4">
          <h3 class="flex items-center gap-2 text-orange-700 text-lg font-semibold">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Descrição e Observações
          </h3>
        </div>
        <div class="px-6 pb-6">
          <label for="descricao" class="block text-sm font-medium text-gray-700 mb-1">
            Descrição da Sala
          </label>
          <textarea
            id="descricao"
            v-model="formData.descricao"
            placeholder="Descreva características especiais, restrições ou observações importantes sobre a sala..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 min-h-[100px]"
          ></textarea>
        </div>
      </div>

      <!-- Recursos -->
      <div class="shadow-lg border-0 bg-gradient-to-br from-white to-orange-50 rounded-lg">
        <div class="p-6 pb-4">
          <h3 class="flex items-center gap-2 text-orange-700 text-lg font-semibold">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Recursos Disponíveis
          </h3>
        </div>
        <div class="px-6 pb-6">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <div v-for="recurso in recursosDisponiveis" :key="recurso" class="flex items-center space-x-2">
              <input
                :id="recurso"
                v-model="formData.recursos"
                :value="recurso"
                type="checkbox"
                class="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <label
                :for="recurso"
                class="text-sm font-medium leading-none cursor-pointer"
              >
                {{ recurso }}
              </label>
            </div>
          </div>
          
          <div v-if="formData.recursos.length > 0" class="mt-4 p-3 bg-white rounded-lg border">
            <p class="text-sm font-medium text-gray-700 mb-2">Recursos selecionados:</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="recurso in formData.recursos"
                :key="recurso"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
              >
                {{ recurso }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Botão de Submit com loading -->
      <div class="flex justify-center pt-6">
        <button
          type="submit"
          :disabled="submitting"
          class="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="submitting" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          {{ submitting ? 'Cadastrando...' : 'Cadastrar Sala' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RoomFormAPI',
  emits: ['room-created', 'show-toast'],
  data() {
    return {
      submitting: false,
      formData: {
        nome: '',
        numero: '',
        espaco: 0,
        disponibilidade: 'livre',
        descricao: '',
        sede: '',
        recursos: []
      },
      recursosDisponiveis: [
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
      ],
      sedesDisponiveis: [
        { id: '1', nome: 'Campus Central' },
        { id: '2', nome: 'Campus Norte' },
        { id: '3', nome: 'Campus Sul' },
        { id: '4', nome: 'Anexo A' },
        { id: '5', nome: 'Anexo B' }
      ]
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.formData.nome || !this.formData.numero || !this.formData.sede) {
        this.$emit('show-toast', {
          title: "Erro de validação",
          description: "Por favor, preencha todos os campos obrigatórios.",
          type: "error"
        });
        return;
      }

      this.submitting = true;

      try {
        const response = await axios.post('/api/rooms', this.formData);
        
        this.$emit('room-created', response.data.room);
        
        this.$emit('show-toast', {
          title: "Sala cadastrada com sucesso!",
          description: `A sala ${this.formData.nome} foi criada.`,
          type: "success"
        });

        // Reset form
        this.formData = {
          nome: '',
          numero: '',
          espaco: 0,
          disponibilidade: 'livre',
          descricao: '',
          sede: '',
          recursos: []
        };

      } catch (error) {
        console.error('Erro ao cadastrar sala:', error);
        
        let errorMessage = 'Erro interno do servidor.';
        if (error.response?.data?.errors) {
          const errors = Object.values(error.response.data.errors).flat();
          errorMessage = errors.join(', ');
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }

        this.$emit('show-toast', {
          title: "Erro ao cadastrar sala",
          description: errorMessage,
          type: "error"
        });
      } finally {
        this.submitting = false;
      }
    }
  }
}
</script>
