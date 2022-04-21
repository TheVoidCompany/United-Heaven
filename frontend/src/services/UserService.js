import axiosClient from './axiosInstance';

const BaseUrl = `/user`;

export const createUser = async (user) => {
    user = JSON.stringify(user);
    const response = await axiosClient.post(`${BaseUrl}`, user);
    localStorage.setItem("token", response.headers["x-auth-token"]);
    localStorage.setItem("userId", response.data.user_id);
    return response

}


export const loginUser = async (user) => {
    user = JSON.stringify(user);
    const response = await axiosClient.post(`${BaseUrl}/auth`, user);
    localStorage.setItem("token", response.headers["x-auth-token"]);
    localStorage.setItem("userId", response.data.user_id);
    return response;
}


export const getUser = async (userId) => {
    const response = await axiosClient.get(`${BaseUrl}/${userId}`);
    return response;
}

export const updateUserDetails = async (userId, user) => {
    user = JSON.stringify(user);
    const response = await axiosClient.put(`${BaseUrl}/${userId}`, user);
    return response;
}

export const updateUserProfile = async (userId, profileFile) => {
    const formData = new FormData();
    formData.append("file", profileFile);
    const response = await axiosClient.put(`${BaseUrl}/${userId}/upload-profile`, formData);
    return response;
}

export const getUserNotification = async (userId) => {
    const response = await axiosClient.get(`${BaseUrl}/${userId}/notifications`);
    return response;
}