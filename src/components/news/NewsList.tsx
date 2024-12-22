import {FC} from "react";
import {NewsItem} from "./NewsItem.tsx";
import {iNews} from "../../store/types.ts";

interface iNewsList {
    newsArray:iNews[]
}

export const NewsList:FC<iNewsList> = ({newsArray}) => {
    return (
        <div>
            {newsArray.map((news,id) => (
                <NewsItem news={news} index={id} key={id} />
            ))}
        </div>
    );
};
