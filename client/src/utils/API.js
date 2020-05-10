import axios from 'axios';

export const getAllUsers = function () {
  return axios.get('/api/users');
};

// route to get logged in user's info (needs the token)
export const getMe = function (token) {
  return axios.get('/api/users/me', { headers: { authorization: `Bearer ${token}` } });
};

export const loginUser = function (userData) {
  return axios.post('/api/users/login', userData);
};

export const createUser = function (userData) {
  return axios.post('/api/users', userData);
};

// save show data for a logged in user
export const saveShow = function (showData, token) {
  return axios.put('/api/users', showData, { headers: { authorization: `Bearer ${token}` } });
};

export const searchTvMaze = function (query) {
  return axios.get('http://api.tvmaze.com/search/shows?q=', { params: { q: query } });
}

export const getEpisodes = function (id) {
  return axios.get(`http://api.tvmaze.com/shows/${id}/seasons`);

}