import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + 'login', { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    // Return error response
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      throw error;  // Re-throw if no response data
    }
  }
};

const authService = {
  login,
};

export default authService;