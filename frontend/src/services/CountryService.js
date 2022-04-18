var axios = require('axios');


export const getCountryImage = async (countryName) => {
    const response = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${countryName}&per_page=1&orientation=landscape&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`);
    return response.data.results[0].urls.regular;
}
