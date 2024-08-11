const API_URL = 'http://localhost:5000/api/auth/';

const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.token) {
      console.log(data.userId)
      // Save the entire response data to local storage
      localStorage.setItem('user', JSON.stringify({
        userId: data.userId,
        username: data.username,
        token: data.token,
      }));
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const register = async (email, password, username, hp) => {
  try {
    const response = await fetch(`${API_URL}register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username, hp }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_URL}forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (token, password) => {
  try {
    const response = await fetch(`${API_URL}reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const authenticateUser = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      const response = await fetch(`${API_URL}verify-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      const data = await response.json();

      if (data.success && data.message === 'Token is valid') {
        return {authenticated: true, userId: data.userId};
      } else {
        localStorage.removeItem('user');
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    return false;
  }
};


const authService = {
  login,
  register,
  forgotPassword,
  resetPassword,
  authenticateUser
};

export default authService;
