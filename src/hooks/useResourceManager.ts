
import { useState, useEffect } from 'react';
import { RECURSOS_DISPONIVEIS } from '@/types/room';

export const useResourceManager = () => {
  const [recursos, setRecursos] = useState<string[]>(RECURSOS_DISPONIVEIS);

  // Carregar recursos do localStorage quando o hook é inicializado
  useEffect(() => {
    const savedRecursos = localStorage.getItem('recursos_disponiveis');
    if (savedRecursos) {
      try {
        const parsedRecursos = JSON.parse(savedRecursos);
        setRecursos(parsedRecursos);
      } catch (error) {
        console.error('Erro ao carregar recursos do localStorage:', error);
      }
    }
  }, []);

  // Salvar recursos no localStorage sempre que a lista mudar
  const updateRecursos = (newRecursos: string[]) => {
    setRecursos(newRecursos);
    localStorage.setItem('recursos_disponiveis', JSON.stringify(newRecursos));
  };

  return {
    recursos,
    updateRecursos
  };
};
