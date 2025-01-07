// src/app/store.ts

import { configureStore } from '@reduxjs/toolkit';
import newsSlice from "./newsSlice.ts";
// import commentsSlice from "./commentsSlice.ts";

export const store = configureStore({
    reducer: {
        news: newsSlice, // Добавляем редюсер для news

    },
});

// Типизация RootState для доступа к типам всего состояния
export type RootState = ReturnType<typeof store.getState>;

// Типизация AppDispatch для использования dispatch в компонентах
export type AppDispatch = typeof store.dispatch;
