import axios from 'axios';

const apiKey = '95e8ebe9';

const omdbapiRequest = () => axios.create({
  method: 'GET',
  baseURL: 'https://www.omdbapi.com',
});

export const searchMovies = (searchText: string, page = '1') => omdbapiRequest().request({
  params: {
    apiKey,
    page,
    s: searchText,
  },
});

export const getMovieDetails = (id: string) => omdbapiRequest().request({
  params: {
    apiKey,
    i: id,
  },
});
