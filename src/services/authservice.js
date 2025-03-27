// Authentication service for handling login, signup, and token management

const API_URL = 'http://localhost:8000'; // Update with your API URL

// Login user
export const login = async (username, password) => {
  try {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${API_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.access_token);
    return { success: true, data };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

// Signup user
export const signup = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Signup failed');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, error: error.message };
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
};

// Check if user is logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Get auth token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Get auth header
export const getAuthHeader = () => {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Make authenticated API request
export const authFetch = async (url, options = {}) => {
  const token = getToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  const authOptions = {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    }
  };
  
  const response = await fetch(url, authOptions);
  
  if (response.status === 401) {
    // Token expired or invalid
    logout();
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }
  
  return response;
};