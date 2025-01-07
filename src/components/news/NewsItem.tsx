import { FC, useState } from "react";
import { iComment, iNews } from "../../store/types.ts";

import { fetchCommentsDetails } from "../../store/newsSlice.ts";
import {formatDate} from "../../utils/formater.ts";
import {useAppDispatch} from "../../utils/hooks.ts";

interface iNewsItem {
    news: iNews;
    index: number;
}

export const NewsItem: FC<iNewsItem> = ({ news, index }) => {
    const dispatch = useAppDispatch();
    const [expandedComments, setExpandedComments] = useState<number[]>([]); // Храним ID открытых комментариев
    const [commentCache, setCommentCache] = useState<Record<number, iComment>>({}); // Кэшируем загруженные данные

    const handleToggleComment = async (commentId: number) => {
        const isExpanded = expandedComments.includes(commentId);

        if (isExpanded) {
            // Закрываем комментарий
            setExpandedComments((prev) => prev.filter((id) => id !== commentId));
        } else {
            // Загружаем данные комментария, если его ещё нет в кэше
            if (!commentCache[commentId]) {
                try {
                    const response = await dispatch(fetchCommentsDetails(commentId)).unwrap();
                    setCommentCache((prev) => ({ ...prev, [commentId]: response }));
                } catch (error) {
                    console.error("Failed to fetch comment details:", error);
                    return;
                }
            }
            // Открываем комментарий
            setExpandedComments((prev) => [...prev, commentId]);
        }
    };

    const renderComment = (commentId: number) => {
        const isExpanded = expandedComments.includes(commentId);
        const comment = commentCache[commentId];

        return (
            <div key={commentId} style={{ marginLeft: "20px" }}>
                <h4
                    style={{ cursor: "pointer", color: isExpanded ? "red" : "blue" }}
                    onClick={() => handleToggleComment(commentId)}
                >
                    {isExpanded ? "Скрыть" : "Показать"} Комментарий ID: {commentId}
                </h4>
                {isExpanded && comment && (
                    <div style={{ marginLeft: "20px", borderLeft: "2px solid #ddd", paddingLeft: "10px" }}>
                        <p>
                            <strong>{comment.by}</strong> -{" "}
                            {formatDate(comment.time)}
                        </p>
                        <p>{comment.text || "Нет текста"}</p>
                        {comment.kids && (
                            <div>
                                {comment.kids.map((childId) => renderComment(childId))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={{ marginBottom: "20px", backgroundColor: 'darkgoldenrod', width:"50vw" }}>

            <div style={{margin:"20px"}}>
                <h1>Новость #{index+1}</h1>
                <h2>{news.title}</h2>
                score: {news.score}
                <p>
                    <strong>{news.by}</strong> - {formatDate(news.time)}
                </p>
            </div>

            {/*<h3>Комментарии: {news.kids.length}</h3>*/}
            {/*{news.kids ? (*/}
            {/*    news.kids.map((kid) => renderComment(kid))*/}
            {/*) : (*/}
            {/*    <p>Нет комментариев</p>*/}
            {/*)}*/}


        </div>
    );
};
