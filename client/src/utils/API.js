import axios from 'axios';

// route to get logged in user's info (needs the token)
export const getMe = function (token) {
    return axios.get('/api/users/me', { headers: { authorization: `Bearer ${token}` } });
  };

  export const loginUser = function (userData) {
    return axios.post('/api/users/login', userData);
  };