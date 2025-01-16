import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import NewsPage from "../pages/NewsPage.tsx";
import {NewsDetailPage} from "../pages/NewsDetailPage.tsx";


const publicRoutes = [
    {path:'/about' , element: <h1>about</h1> },
    {path: '/news', element: <NewsPage/>},
    {path: '/news/:id', element: <NewsDetailPage/>},
    { path: '*', element: <Navigate to="/news" replace /> },
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