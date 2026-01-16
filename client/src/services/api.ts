// client/src/services/api.ts

export interface Country {
  id: string;
  name: string;
}

export interface UserData {
  fullname: string;
  address: string;
  countryId: string;
}

// Helper para manejar errores de fetch y parsear JSON automáticamente
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  // Usamos el proxy relativo directamente
  const response = await fetch(`/api${url}`, options);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const json = await response.json();
  return json.data; // Asumimos que el backend siempre devuelve { data: ... }
}

export const getCountries = () => {
  return request<Country[]>("/countries");
};

export const getUserData = (token: string) => {
  // Pasamos el token como query param
  return request<UserData | null>(`/user?token=${token}`);
};
