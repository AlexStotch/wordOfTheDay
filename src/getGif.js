import axios from 'axios';

export async function getGif(wordOfTheDay) {
    const baseUrl = 'http://api.giphy.com/v1/gifs/search?';
    const wodQuery = `q=${wordOfTheDay}`;
    const apiKey = `&api_key=${process.env.GIPHY_API_KEY}`;
    const params = '&limit=1&rating=pg';

    const query = baseUrl + wodQuery + apiKey + params;

    return axios.get(query)
        .then(response => {
            return response.data.data[0].images.downsized.url;
        })
        .catch((error) => {
            console.log(error);
        });
}