import {FC, useState} from "react";
import {iComment, iNews} from "../../store/types.ts";
import {fetchCommentsDetails} from "../../store/newsSlice.ts";
import {formatDate} from "../../utils/formater.ts";
import {useAppDispatch} from "../../utils/hooks.ts";

interface iCommentItemProps {
    news:iNews
}

export const CommentItem:FC<iCommentItemProps> = ({news}) => {

    const dispatch = useAppDispatch();
    const [expandedComments, setExpandedComments] = useState<number[]>([]);
    const [commentCache, setCommentCache] = useState<Record<number, iComment>>({});
    // Открытие/закрытие комментариев
    const handleToggleComment = async (commentId: number) => {
        const isExpanded = expandedComments.includes(commentId);

        if (isExpanded) {
            setExpandedComments((prev) => prev.filter((id) => id !== commentId));
        } else {
            if (!commentCache[commentId]) {
                try {
                    const response = await dispatch(fetchCommentsDetails(commentId)).unwrap();
                    setCommentCache((prev) => ({ ...prev, [commentId]: response }));
                } catch (error) {
                    console.error("Ошибка загрузки комментария:", error);
                }
            }
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
                            <strong>{comment.by}</strong> - {formatDate(comment.time)}
                        </p>
                        <p>{comment.text || "Нет текста"}</p>
                        {comment.kids && comment.kids.map((childId) => renderComment(childId))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <h3>Комментарии: {news.kids?.length || 0}</h3>
            {news.kids && news.kids.length > 0 ? (
                news.kids.map((kidId) => renderComment(kidId))
            ) : (
                <p>Нет комментариев</p>
            )}
        </>)

};
