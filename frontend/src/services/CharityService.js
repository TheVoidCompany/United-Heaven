import axios from 'axios';


export const getCharityImageByUrl = async (url) => {
    const response = await axios.get(`https://logo.clearbit.com/${url}`);
    return response.data;
}