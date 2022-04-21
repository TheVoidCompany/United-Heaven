import axiosClient from './axiosInstance';
const BaseUrl = `/goal`;


export const getUserFollowingGoals = async (userId) => {
    const response = await axiosClient.get(`${BaseUrl}/following?user_id=${userId}`);
    return response;
}

export const followGoal = async (goalId, userId) => {
    const response = await axiosClient.post(`${BaseUrl}/follow`, { goal_id: goalId, user_id: userId });
    return response;
}

export const unFollowGoal = async (goalId, userId) => {
    const response = await axiosClient.post(`${BaseUrl}/unfollow`, { goal_id: goalId, user_id: userId });
    return response;
}

export const getRecommendedGoals = async (userId) => {
    const response = await axiosClient.get(`${BaseUrl}/recommended?user_id=${userId}`);
    return response;
}

export const getTrendingFeedForGoal = async (goalId) => {
    const response = await axiosClient.get(`${BaseUrl}/trending?goal_id=${goalId}`);
    return response;
}