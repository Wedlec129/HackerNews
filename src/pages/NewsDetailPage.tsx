import { useNavigate, useParams} from "react-router-dom";
import { useAppDispatch } from "../utils/hooks.ts";
import { useEffect, useState } from "react";
import {  iNews } from "../store/types.ts";
import {  fetchNewsDetails } from "../store/newsSlice.ts";
import { formatDate } from "../utils/formater.ts";
import {CommentItem} from "../components/CommentItem/CommentItem.tsx";

export const NewsDetailPage = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { id } = useParams();


    const [news, setNews] = useState<iNews | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    // Загружаем новость по ID
    const downloadDetailNews = async (newsId: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await dispatch(fetchNewsDetails(newsId)).unwrap();
            setNews(response);
        } catch (err) {
            console.error("Ошибка загрузки новости:", err);
            setError("Не удалось загрузить новость.");
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (id) {
            downloadDetailNews(Number(id));
        }
    }, [id]);


    return (
        <div style={{ marginBottom: "20px", width: "50vw" }}>

            <button onClick={()=>{
                navigate('/news')
            }}>Back</button>

            {isLoading && <p>Загрузка новости...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {news && (
                <>
                    <div
                        style={{
                            marginTop:"20px",
                            marginBottom: "16px",
                            padding: "16px",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                            backgroundColor: "#fff",
                            cursor: "pointer",
                            transition: "background-color 0.2s ease",
                        }}
                    >
                        <h3 style={{margin: "0 0 8px", fontSize: "18px", color: "#333"}}>
                            {news.id}. {news.title}
                        </h3>

                        <p style={{margin: "0", fontSize: "14px", color: "#666"}}>
                            Автор: <strong>{news.by}</strong> • {formatDate(news.time)} • ⭐ {news.score}
                        </p>
                    </div>

                    <button onClick={()=>{
                        setNews(null)
                        downloadDetailNews(Number(id));

                    }}> Обновить коментарии</button>

                    <CommentItem news={news}/>

                </>
            )}
        </div>
    );
};
