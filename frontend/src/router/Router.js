import { Navigate, Route, Routes } from 'react-router-dom';
import UnitedHeaven from '../pages';
import NotFound from '../pages/NotFound';
import SDGPage from '../pages/sdg';
import Study from '../pages/study';
import SuggestionsPage from '../pages/suggestions';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<UnitedHeaven />}>
                <Route index element={<SuggestionsPage />} />
                <Route path="/suggestion" element={<Navigate replace to="/" />} />
                <Route path="/sdg" element={<SDGPage />} />
                <Route path="/study" element={<Study />} />
            </Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/_error" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
