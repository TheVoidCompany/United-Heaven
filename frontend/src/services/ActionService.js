import axiosClient from './axiosInstance';
const BaseUrl = `/action`;



export const createAction = async (action) => {
    action = JSON.stringify(action);
    const response = await axiosClient.post(`${BaseUrl}`, action);
    return response;
}

export const getActionDetails = async (actionId) => {
    const response = await axiosClient.get(`${BaseUrl}/${actionId}`);
    return response;
}

export const getRecommendedActions = async (user_id, goals) => {
    const response = await axiosClient.get(`${BaseUrl}/recommended?user_id=${user_id}&goals=${goals}`);
    return response;
}

export const updateActionDetails = async (actionId, action) => {
    action = JSON.stringify(action);
    const response = await axiosClient.put(`${BaseUrl}/${actionId}`, action);
    return response;
}

export const updateActionPicture = async (actionId, picture) => {
    const response = await axiosClient.put(`${BaseUrl}/${actionId}/upload-picture`, picture);
    return response;
}

export const participateInAction = async (data) => {
    data = JSON.stringify(data);
    const response = await axiosClient.post(`${BaseUrl}/participate`, data);
    return response;
}

export const unParticipateInAction = async (data) => {
    data = JSON.stringify(data);
    const response = await axiosClient.post(`${BaseUrl}/unparticipate`, data);
    return response;
}

export const likeAction = async (data) => {
    data = JSON.stringify(data);
    const response = await axiosClient.post(`${BaseUrl}/like`, data);
    return response;
}

export const unLikeAction = async (data) => {
    data = JSON.stringify(data);
    const response = await axiosClient.post(`${BaseUrl}/unlike`, data);
    return response;
}

export const deleteAction = async (actionId) => {
    const response = await axiosClient.delete(`${BaseUrl}/${actionId}`);
    return response;
}