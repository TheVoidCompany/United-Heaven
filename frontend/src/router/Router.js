import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import UnitedHeaven from '../pages';
import LoginPage from '../pages/auth/login/LoginPage';
import SignupPage from '../pages/auth/signup/SignupPage';
import CountryGoalPage from '../pages/common/CountryGoalPage';
import CountryPage from '../pages/common/CountryPage';
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

    const { isAuthenticated } = useContext(AuthContext);

    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" />;
    };



    const RestrictedRoute = ({ children }) => {
        return isAuthenticated ? <Navigate to="/" /> : children;
    }


    return (
        <Routes>
            <Route path="/" element={<UnitedHeaven />}>
                <Route path="/signup" element={<RestrictedRoute><SignupPage /></RestrictedRoute>} />
                <Route path="/login" element={<RestrictedRoute><LoginPage /></RestrictedRoute>} />
                <Route index element={<SuggestionsPage />} />
                <Route path="/suggestion" element={<Navigate replace to="/" />} />
                <Route path="/sight" element={<SightPage />} />
                <Route element={<Feed />}>
                    <Route path="/feed" element={<Home />} />
                    <Route path="/home" element={<Navigate replace to="/feed" />} />
                    <Route path="/feed/actions" element={<Action />} />
                    <Route path="/feed/actions/:id" element={<Action />} />
                    <Route path="/feed/actions/create" element={<PrivateRoute><CreateAction /></PrivateRoute>} />
                    <Route path="/feed/profile/edit_profile" element={<PrivateRoute> <EditProfile /></PrivateRoute>} />
                    <Route path="/feed/profile/actions" element={<PrivateRoute><ViewAction /></PrivateRoute>} />
                    <Route path="/feed/profile/registered_actions" element={<PrivateRoute><ViewAction /></PrivateRoute>} />
                    <Route path="/feed/profile/actions/:id" element={<ViewAction />} />
                    <Route path="/feed/profile/registered_actions/:id" element={<ViewAction />} />
                    <Route path="/feed/goals" element={<Goal />} />
                    <Route path="/feed/goals/:id" element={<GoalFeed />} />
                </Route>
                <Route path="/study" element={<Study />} />
                <Route path="/profiles/:country" element={<CountryPage />} />
                <Route path="/profiles/:country/:goalId" element={<CountryGoalPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/_error" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
