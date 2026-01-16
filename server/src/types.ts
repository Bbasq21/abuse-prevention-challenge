// server/src/types.ts

export interface Country {
    id: string;
    name: string;
    // Agregamos locale para ayudar con el i18n futuro si fuera necesario
    locale: string; 
}

export interface UserProfile {
    fullname: string;
    address: string;
    countryId: string; // Relación con el ID del país
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
}