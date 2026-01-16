import { useState, useEffect } from 'react';
import { getCountries, getUserData } from '../services/api';
import type { Country, UserData } from '../services/api';

export const useInitialData = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [defaultValues, setDefaultValues] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Obtenemos el token de la URL (query param)
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token') || '';

      try {
        // Ejecutamos ambas peticiones en PARALELO para ganar tiempo
        const [countriesData, userData] = await Promise.all([
          getCountries(),
          token ? getUserData(token) : Promise.resolve(null)
        ]);

        setCountries(countriesData);
        setDefaultValues(userData);
      } catch (error) {
        console.error("Error loading initial data", error);
        // Aquí podrías setear un estado de error global
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { countries, defaultValues, isLoading };
};