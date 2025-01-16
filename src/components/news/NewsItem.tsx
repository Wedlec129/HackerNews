import { iNews } from "../../store/types.ts";
import { FC } from "react";
import { formatDate } from "../../utils/formater.ts";

interface iNewsItem {
    news: iNews;
    index: number;
}

export const NewsItem: FC<iNewsItem> = ({ news, index }) => {
    return (
        <div
            style={{
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
                {index + 1}) {news.id}. {news.title}
            </h3>

            <p style={{margin: "0", fontSize: "14px", color: "#666"}}>
                Автор: <strong>{news.by}</strong> • {formatDate(news.time)} • ⭐ {news.score}
            </p>

            <p style={{margin: "0", fontSize: "14px", color: "#666"}}>
                Комментарии: <strong>{news.kids?.length || 0}</strong>
            </p>


        </div>
    );
};
