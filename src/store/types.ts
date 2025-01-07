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

    isLoadingTopNews: boolean,
    isLoadingNewsDetails: boolean,
    error: string | null;
}





export interface iComment {
    by: string;
    id: number;
    kids: number[];
    parent: number;
    time: number;
    text: string;
    type: string;
}
