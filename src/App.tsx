import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "./store/hooks.ts";
import { detail, selectPostsState } from "./store/newsSlice.ts";
import { NewsList } from "./components/news/NewsList.tsx";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { newsArray, isLoading, error } = useAppSelector(selectPostsState);

    useEffect(() => {
        dispatch(detail()); // Загружаем список топ новостей
    }, []);

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!isLoading && newsArray.length > 0 && <NewsList newsArray={newsArray} />}
        </div>
    );
};

export default App;
