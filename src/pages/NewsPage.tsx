import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../utils/hooks.ts";
import { detail, selectPostsState } from "../store/newsSlice.ts";
import { NewsList } from "../components/news/NewsList.tsx";

const NewsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { newsArray, isLoading, error } = useAppSelector(selectPostsState);

    const [lastUpdated, setLastUpdated] = useState<string | null>(null);

    // Функция для загрузки новостей
    const fetchNews = async () => {
        await dispatch(detail());
        setLastUpdated(new Date().toLocaleTimeString()); // Обновляем время последней загрузки
    };

    useEffect(() => {
        fetchNews(); // Первоначальная загрузка новостей

        // Автообновление раз в минуту
        const interval = setInterval(() => {
            fetchNews();
            console.log("Новости обновлены автоматически");
        }, 60000);

        return () => clearInterval(interval); // Очистка интервала
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Hacker News</h1>

            {/* Кнопка обновления */}
            <button onClick={fetchNews} disabled={isLoading} style={{ marginBottom: "20px" }}>
                {isLoading ? "🔄 Обновление..." : "🔃 Обновить новости"}
            </button>

            {/* Время последнего обновления */}
            {lastUpdated && <p>Последнее обновление: {lastUpdated}</p>}

            {/* Обработка загрузки и ошибок */}
            {isLoading && <p>Загрузка новостей...</p>}
            {error && (
                <p style={{ color: "red" }}>
                    Ошибка: {error} <button onClick={fetchNews}>Повторить</button>
                </p>
            )}

            {/* Вывод новостей */}
            {!isLoading && newsArray.length > 0 && <NewsList newsArray={newsArray} />}
        </div>
    );
};

export default NewsPage;
