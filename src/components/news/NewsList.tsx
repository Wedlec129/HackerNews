import {iNews} from "../../store/types.ts";
import {NewsItem} from "./NewsItem.tsx";
import {FC} from "react";
import {useNavigate} from "react-router-dom";

interface iNewsList {
    newsArray:iNews[]
}

export const NewsList:FC<iNewsList> = ({newsArray}) => {

    const navigate = useNavigate();

    const hadleClick = (news: iNews)=>{
        console.log(news);
        navigate(`/news/${news.id}`);
    }

    return (
        <div>

            {newsArray.map((news, id) => (
                <div onClick={() => { hadleClick(news)}} key={news.id}>
                    <NewsItem news={news} index={id} key={id} />
                </div>
            ))}


        </div>
    );
};
