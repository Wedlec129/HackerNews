import {FC} from "react";
import {iNews} from "../../store/types.ts";

interface iNewsItem {
    news: iNews
    index: number
}

export const NewsItem:FC<iNewsItem> = ({news,index}) => {
    return (
          // ddff

          <h2>{index}) by:{news.by}, title:{news.title}</h2>

    );
};
