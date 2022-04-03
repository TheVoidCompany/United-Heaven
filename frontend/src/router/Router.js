import { Navigate, Route, Routes } from 'react-router-dom';
import UnitedHeaven from '../pages';
import Action from '../pages/feed/action';
import Feed from '../pages/feed/Feed';
import Home from '../pages/feed/home';
import EditProfile from '../pages/feed/profile/EditProfile';
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
                <Route element={<Feed />}>
                    <Route path="/feed" element={<Home />} />
                    <Route path="/feed/action" element={<Action />} />
                    <Route path="/feed/profile/edit_profile" element={<EditProfile />} />
                </Route>
                <Route path="/study" element={<Study />} />
            </Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/_error" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
