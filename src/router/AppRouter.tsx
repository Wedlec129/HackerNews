import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NewsPage from "../pages/NewsPage.tsx";
import {NewsDetailPage} from "../pages/NewsDetailPage.tsx";


const publicRoutes = [
    {path:'/about' , element: <h1>about</h1> },
    {path: '/news', element: <NewsPage/>},
    {path: '/news/:id', element: <NewsDetailPage/>},

]

const AppRouter = () => {
    return (
        <Router>
            <Routes>
            {publicRoutes.map((el) => (
                    <Route key={el.path} path={el.path} element={el.element} />
            ))}
        </Routes>
    </Router>
);};

export default AppRouter;