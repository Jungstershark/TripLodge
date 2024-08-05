import axios from 'axios';

const API_URL = `${process.env.REACT_APP_SERVER_URL}/api/auth/`;

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + 'login', { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      throw error;
    }
  }
};

const register = async (email, password, username, hp) => {
  try {
    const response = await axios.post(API_URL + 'register', { email, password, username, hp });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      throw error;
    }
  }
};

const authService = {
  login,
  register,
};

export default authService;
