import { Navigate, Route, Routes } from 'react-router-dom';
import UnitedHeaven from '../pages';
import Action from '../pages/feed/action';
import CreateAction from '../pages/feed/action/CreateAction';
import Feed from '../pages/feed/Feed';
import Goal from '../pages/feed/goal';
import GoalFeed from '../pages/feed/goal/GoalFeed';
import Home from '../pages/feed/home';
import EditProfile from '../pages/feed/profile/EditProfile';
import ViewAction from '../pages/feed/profile/ViewAction';
import NotFound from '../pages/NotFound';
import SightPage from '../pages/sight';
import Study from '../pages/study';
import SuggestionsPage from '../pages/suggestions';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<UnitedHeaven />}>
                <Route index element={<SuggestionsPage />} />
                <Route path="/suggestion" element={<Navigate replace to="/" />} />
                <Route path="/sight" element={<SightPage />} />
                <Route element={<Feed />}>
                    <Route path="/feed" element={<Home />} />
                    <Route path="/home" element={<Navigate replace to="/feed" />} />
                    <Route path="/feed/actions" element={<Action />} />
                    <Route path="/feed/actions/:id" element={<Action />} />
                    <Route path="/feed/actions/create" element={<CreateAction />} />
                    <Route path="/feed/profile/edit_profile" element={<EditProfile />} />
                    <Route path="/feed/profile/actions" element={<ViewAction />} />
                    <Route path="/feed/profile/registered_actions" element={<ViewAction />} />
                    <Route path="/feed/profile/actions/:id" element={<ViewAction />} />
                    <Route path="/feed/profile/registered_actions/:id" element={<ViewAction />} />
                    <Route path="/feed/goals" element={<Goal />} />
                    <Route path="/feed/goals/:id" element={<GoalFeed />} />
                </Route>
                <Route path="/study" element={<Study />} />
            </Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/_error" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
