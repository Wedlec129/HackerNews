// src/types.ts

// Типы для данных о новостях
export interface iNewsTop {
    id: number;
}

// Типы для подробной информации о новости
export interface iNews {
    by: string;
    descendants: number;
    id: number;
    kids: number[];
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
}

// Типы для состояния Redux
export interface iNewslist {

    newsArray: iNews[];
    isLoading: boolean;
    error: string | null;
}
