import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {iNews, iNewsTop, iNewslist, iComment} from "./types.ts";
import { RootState } from "./store.ts";

// Начальное состояние
const initialState: iNewslist = {
    newsArray: [],

    isLoading: false,

    isLoadingTopNews: false,
    isLoadingNewsDetails: false,
    error: null,
};

// Асинхронное действие для получения списка топ новостей (что возвращает payload() iNewsTop[] и void - не передаем никаких параметров)
export const fetchTopNewsID = createAsyncThunk<iNewsTop[], void>(
    'news/fetchTopNewsID',
    async () => {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
        if (!response.ok) {
            throw new Error('Failed to fetch top news IDs');
        }
        return await response.json();
    }
);

// Асинхронное действие для получения подробной информации о конкретной новости
export const fetchNewsDetails = createAsyncThunk<iNews, number>(
    'news/fetchNewsDetails',
    // , number - параметр
    async (id) => {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
        if (!response.ok) {
            throw new Error(`Failed to fetch news details for ID ${id}`);
        }
        return await response.json();
    }
);

// Асинхронное действие, которое сначала загружает список топ новостей, а затем их детали
export const detail = createAsyncThunk<void, void>(
    'news/detail',
    async (_, { dispatch }) => {
        try {

            // Сначала получаем список ID топ новостей
            const topNewsIDs = (await dispatch(fetchTopNewsID()).unwrap()).slice(0,15)

            // Загружаем подробную информацию по каждому ID
            const newsDetails = await Promise.all(
                topNewsIDs.map((id) => dispatch(fetchNewsDetails(Number(id))).unwrap())
            );

            dispatch(setNewsData(newsDetails));

        } catch (error) {
            throw new Error('Failed to fetch top news and details');
        }
    }
);



// Асинхронное действие для получения подробной информации о конкретной новости
export const fetchCommentsDetails = createAsyncThunk<iComment, number>(
    'news/fetchNewsDetails',
    // , number - параметр
    async (id) => {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
        if (!response.ok) {
            throw new Error(`Failed to fetch news details for ID ${id}`);
        }
        return await response.json();
    }
);


const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        // Редьюсер для сохранения данных новостей
        setNewsData: (state, action) => {
            state.newsArray = action.payload;
            // state.isLoading = false;
        },
    },


    extraReducers: (builder) => {
        builder
            .addCase(fetchTopNewsID.pending, (state) => {
                state.isLoadingTopNews = true;
                state.error = null; // Сброс ошибки при начале загрузки
            })
            .addCase(fetchTopNewsID.fulfilled, (state) => {
                state.isLoadingTopNews = false;
            })
            .addCase(fetchTopNewsID.rejected, (state, action) => {
                state.isLoadingTopNews = false;
                state.error = action.error.message || 'Unknown error';
            });

        builder
            .addCase(fetchNewsDetails.pending, (state) => {
                state.isLoadingNewsDetails = true;
                state.error = null; // Сброс ошибки при начале загрузки
            })
            .addCase(fetchNewsDetails.fulfilled, (state) => {
                state.isLoadingNewsDetails = false;
            })
            .addCase(fetchNewsDetails.rejected, (state, action) => {
                state.isLoadingNewsDetails = false;
                state.error = action.error.message || 'Unknown error';
            });

        builder
            .addCase(detail.pending, (state) => {
                state.isLoading = true; // общий флаг
            })
            .addCase(detail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(detail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Unknown error';
            });
    }

});

const { setNewsData } = newsSlice.actions;

// Экспорт селектора и редьюсера
export const selectPostsState = (state: RootState) => state.news;
export default newsSlice.reducer;
