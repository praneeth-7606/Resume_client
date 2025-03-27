// // import React, { createContext, useState, useEffect, useContext } from 'react';
// // import { message } from 'antd';

// // const AuthContext = createContext(null);

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     // Check if user is already logged in (token in localStorage)
// //     const checkAuth = async () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         if (token) {
// //           // Validate token by fetching current user
// //           const response = await fetch('http://localhost:8000/auth/me', {
// //             headers: {
// //               'Authorization': `Bearer ${token}`
// //             }
// //           });

// //           if (response.ok) {
// //             const userData = await response.json();
// //             setUser(userData);
// //           } else {
// //             // Token invalid or expired, remove it
// //             localStorage.removeItem('token');
// //           }
// //         }
// //       } catch (err) {
// //         console.error('Auth check error:', err);
// //         setError('Failed to authenticate');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     checkAuth();
// //   }, []);

// //   // Updated to use email for login
// //   const login = async (email, password) => {
// //     try {
// //       setLoading(true);
      
// //       // Create form data for token endpoint
// //       const formData = new FormData();
// //       formData.append('username', email); // The backend uses 'username' as the form field name
// //       formData.append('password', password);

// //       console.log(`Attempting login with: ${email}`);
      
// //       const response = await fetch('http://localhost:8000/auth/token', {
// //         method: 'POST',
// //         body: formData
// //       });

// //       console.log('Login response status:', response.status);
      
// //       // Even if it's an error response, try to parse it
// //       const data = await response.json().catch(() => {
// //         console.log('Could not parse JSON response');
// //         return { detail: 'Could not parse server response' };
// //       });
      
// //       console.log('Login response data:', data);

// //       if (!response.ok) {
// //         throw new Error(data.detail || 'Login failed with status: ' + response.status);
// //       }
      
// //       // Store token in localStorage
// //       localStorage.setItem('token', data.access_token);

// //       // Fetch user profile with token
// //       const userResponse = await fetch('http://localhost:8000/auth/me', {
// //         headers: {
// //           'Authorization': `Bearer ${data.access_token}`
// //         }
// //       });

// //       console.log('User profile response status:', userResponse.status);
      
// //       if (!userResponse.ok) {
// //         const errorData = await userResponse.json().catch(() => {
// //           return { detail: 'Could not parse error response' };
// //         });
// //         console.error('User profile error:', errorData);
// //         throw new Error('Failed to fetch user data: ' + (errorData.detail || userResponse.status));
// //       }

// //       const userData = await userResponse.json();
// //       setUser(userData);
// //       message.success('Login successful!');
      
// //       return userData;
// //     } catch (err) {
// //       console.error('Login error:', err);
// //       message.error(err.message || 'Login failed');
// //       setError(err.message || 'Login failed');
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const signup = async (username, email, password) => {
// //     try {
// //       setLoading(true);
      
// //       // Validate unique username and email (additional validation)
// //       const response = await fetch('http://localhost:8000/auth/signup', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Accept': 'application/json'
// //         },
// //         body: JSON.stringify({ 
// //           username, 
// //           email, 
// //           password,
// //           is_active: true
// //         })
// //       });

// //       console.log('Signup response status:', response.status);
      
// //       // Even if it's an error response, try to parse it
// //       const data = await response.json().catch(() => {
// //         console.log('Could not parse JSON response');
// //         return { detail: 'Could not parse server response' };
// //       });
      
// //       console.log('Signup response data:', data);

// //       if (!response.ok) {
// //         throw new Error(data.detail || 'Signup failed with status: ' + response.status);
// //       }

// //       message.success('Account created successfully! Please log in.');
      
// //       return data;
// //     } catch (err) {
// //       console.error('Signup error:', err);
// //       message.error(err.message || 'Signup failed');
// //       setError(err.message || 'Signup failed');
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const logout = async () => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       if (token) {
// //         // Call backend logout endpoint
// //         const response = await fetch('http://localhost:8000/auth/logout', {
// //           method: 'POST',
// //           headers: {
// //             'Authorization': `Bearer ${token}`
// //           }
// //         });
        
// //         if (!response.ok) {
// //           const errorData = await response.json();
// //           console.error('Logout error:', errorData);
// //         }
// //       }
// //     } catch (err) {
// //       console.error('Logout error:', err);
// //     } finally {
// //       // Always clear the token and user state
// //       localStorage.removeItem('token');
// //       setUser(null);
// //       message.success('Logged out successfully');
// //     }
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { message } from 'antd';

// const AuthContext = createContext(null);

// // API base URL
// const API_URL = 'http://localhost:8000';

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Check if token exists and set a basic user without making API call
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Just set a basic user object without trying to fetch profile
//       setUser({
//         isAuthenticated: true,
//         token: token
//       });
//     }
//     setLoading(false);
//   }, []);

//   // Login with email
//   const login = async (email, password) => {
//     try {
//       setLoading(true);
//       console.log(`Attempting login with email: ${email}`);
      
//       // Create form data for token endpoint
//       const formData = new FormData();
//       formData.append('username', email); // API expects 'username' field
//       formData.append('password', password);
      
//       // Use fetch directly with these specific settings for token endpoint
//       const response = await fetch(`${API_URL}/auth/token`, {
//         method: 'POST',
//         body: formData,
//       });
      
//       console.log('Login response status:', response.status);
      
//       // Parse response
//       let data;
//       try {
//         data = await response.json();
//         console.log('Login response data:', data);
//       } catch (e) {
//         console.error('Error parsing login response:', e);
//         throw new Error('Could not parse server response');
//       }
      
//       if (!response.ok) {
//         throw new Error(data.detail || `Login failed with status: ${response.status}`);
//       }
      
//       // Store token in localStorage
//       localStorage.setItem('token', data.access_token);
//       console.log('Token stored in localStorage');
      
//       // Set minimal user info
//       setUser({
//         email: email,
//         isAuthenticated: true,
//         token: data.access_token
//       });
      
//       message.success('Login successful!');
//       return { email };
//     } catch (err) {
//       console.error('Login error:', err);
//       message.error(err.message || 'Login failed');
//       setError(err.message || 'Login failed');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signup = async (username, email, password) => {
//     try {
//       setLoading(true);
      
//       console.log('Signup payload:', { username, email, password: '****' });
      
//       // Direct fetch without extra options
//       const response = await fetch(`${API_URL}/auth/signup`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username,
//           email,
//           password,
//           is_active: true
//         })
//       });

//       console.log('Signup response status:', response.status);
      
//       // Get the raw text response first for debugging
//       const rawResponse = await response.text();
//       console.log('Raw response from server:', rawResponse);
      
//       // Parse the JSON response if possible
//       let responseData;
//       try {
//         responseData = JSON.parse(rawResponse);
//         console.log('Parsed response data:', responseData);
//       } catch (e) {
//         console.error('Error parsing JSON response:', e);
//         responseData = { detail: rawResponse || 'Unknown server error' };
//       }
      
//       // Check response
//       if (!response.ok) {
//         // For debugging: log all possible error fields
//         console.error('Error response details:', responseData);
        
//         // Handle different types of error messages
//         let errorMessage = 'Signup failed. Please try again.';
        
//         if (typeof responseData === 'object' && responseData !== null) {
//           if (responseData.detail) {
//             // API provides error in 'detail' field
//             errorMessage = responseData.detail;
//           } else if (responseData.email) {
//             // Some APIs provide field-specific errors
//             errorMessage = `Email error: ${responseData.email}`;
//           } else if (responseData.username) {
//             errorMessage = `Username error: ${responseData.username}`;
//           } else if (responseData.message) {
//             errorMessage = responseData.message;
//           }
//         }
        
//         // IMPORTANT: Override username uniqueness error
//         // This is a workaround if backend still returns username uniqueness errors
//         if (errorMessage.includes('Username already exists')) {
//           console.log('Caught username uniqueness error, bypassing this error');
//           // Try again with a modified username
//           const modifiedUsername = `${username}_${Math.floor(Math.random() * 1000)}`;
//           console.log(`Retrying with modified username: ${modifiedUsername}`);
          
//           // Recursive call with modified username
//           return await signup(modifiedUsername, email, password);
//         }
        
//         throw new Error(errorMessage);
//       }
      
//       message.success('Account created successfully! Please log in.');
//       return responseData;
//     } catch (err) {
//       console.error('Signup error:', err);
//       message.error(err.message || 'Signup failed');
//       setError(err.message || 'Signup failed');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     // Just clear the token and user state without API call
//     localStorage.removeItem('token');
//     setUser(null);
//     message.success('Logged out successfully');
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



import React, { createContext, useState, useEffect, useContext } from 'react';
import { message } from 'antd';

const AuthContext = createContext(null);

// API base URL
const API_URL = 'http://localhost:8000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    // Check if token exists and set a basic user without making API call
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Just set a basic user object without trying to fetch profile
      setUser({
        isAuthenticated: true,
        token: storedToken
      });
      setToken(storedToken);
      
      // Optionally fetch user profile if needed
      fetchUserProfile(storedToken);
    }
    setLoading(false);
  }, []);
  
  // Fetch user profile with token
  const fetchUserProfile = async (authToken) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser({
          ...userData,
          isAuthenticated: true,
          token: authToken
        });
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      // Don't log out the user if profile fetch fails, keep minimal user info
    }
  };

  // Login with email
  const login = async (email, password) => {
    try {
      setLoading(true);
      console.log(`Attempting login with email: ${email}`);
      
      // Create form data for token endpoint
      const formData = new FormData();
      formData.append('username', email); // API expects 'username' field
      formData.append('password', password);
      
      // Use fetch directly with these specific settings for token endpoint
      const response = await fetch(`${API_URL}/auth/token`, {
        method: 'POST',
        body: formData,
      });
      
      console.log('Login response status:', response.status);
      
      // Parse response
      let data;
      try {
        data = await response.json();
        console.log('Login response data:', data);
      } catch (e) {
        console.error('Error parsing login response:', e);
        throw new Error('Could not parse server response');
      }
      
      if (!response.ok) {
        throw new Error(data.detail || `Login failed with status: ${response.status}`);
      }
      
      // Store token in localStorage and state
      localStorage.setItem('token', data.access_token);
      setToken(data.access_token);
      console.log('Token stored in localStorage');
      
      // Try to fetch user details
      await fetchUserProfile(data.access_token);
      
      message.success('Login successful!');
      return { email };
    } catch (err) {
      console.error('Login error:', err);
      message.error(err.message || 'Login failed');
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username, email, password) => {
    try {
      setLoading(true);
      
      console.log('Signup payload:', { username, email, password: '****' });
      
      // Direct fetch without extra options
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          is_active: true
        })
      });

      console.log('Signup response status:', response.status);
      
      // Get the raw text response first for debugging
      const rawResponse = await response.text();
      console.log('Raw response from server:', rawResponse);
      
      // Parse the JSON response if possible
      let responseData;
      try {
        responseData = JSON.parse(rawResponse);
        console.log('Parsed response data:', responseData);
      } catch (e) {
        console.error('Error parsing JSON response:', e);
        responseData = { detail: rawResponse || 'Unknown server error' };
      }
      
      // Check response
      if (!response.ok) {
        // For debugging: log all possible error fields
        console.error('Error response details:', responseData);
        
        // Handle different types of error messages
        let errorMessage = 'Signup failed. Please try again.';
        
        if (typeof responseData === 'object' && responseData !== null) {
          if (responseData.detail) {
            // API provides error in 'detail' field
            errorMessage = responseData.detail;
          } else if (responseData.email) {
            // Some APIs provide field-specific errors
            errorMessage = `Email error: ${responseData.email}`;
          } else if (responseData.username) {
            errorMessage = `Username error: ${responseData.username}`;
          } else if (responseData.message) {
            errorMessage = responseData.message;
          }
        }
        
        // IMPORTANT: Override username uniqueness error
        // This is a workaround if backend still returns username uniqueness errors
        if (errorMessage.includes('Username already exists')) {
          console.log('Caught username uniqueness error, bypassing this error');
          // Try again with a modified username
          const modifiedUsername = `${username}_${Math.floor(Math.random() * 1000)}`;
          console.log(`Retrying with modified username: ${modifiedUsername}`);
          
          // Recursive call with modified username
          return await signup(modifiedUsername, email, password);
        }
        
        throw new Error(errorMessage);
      }
      
      message.success('Account created successfully! Please log in.');
      return responseData;
    } catch (err) {
      console.error('Signup error:', err);
      message.error(err.message || 'Signup failed');
      setError(err.message || 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    // Just clear the token and user state without API call
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    message.success('Logged out successfully');
  };

  // New function: Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      
      if (!token) {
        throw new Error('You must be logged in to change your password');
      }
      
      console.log('Attempting to change password');
      
      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          current_password: currentPassword, 
          new_password: newPassword 
        })
      });
      
      console.log('Change password response status:', response.status);
      
      // Get response data
      let data;
      try {
        data = await response.json();
        console.log('Change password response data:', data);
      } catch (e) {
        console.error('Error parsing change password response:', e);
        throw new Error('Could not parse server response');
      }
      
      if (!response.ok) {
        let errorMessage = 'Failed to change password';
        if (data && data.detail) {
          errorMessage = data.detail;
        }
        throw new Error(errorMessage);
      }
      
      message.success('Password changed successfully!');
      return data;
    } catch (err) {
      console.error('Change password error:', err);
      message.error(err.message || 'Failed to change password');
      setError(err.message || 'Failed to change password');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // New function: Update profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      
      if (!token) {
        throw new Error('You must be logged in to update your profile');
      }
      
      console.log('Attempting to update profile');
      
      const response = await fetch(`${API_URL}/auth/update-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      
      console.log('Update profile response status:', response.status);
      
      // Get response data
      let data;
      try {
        data = await response.json();
        console.log('Update profile response data:', data);
      } catch (e) {
        console.error('Error parsing update profile response:', e);
        throw new Error('Could not parse server response');
      }
      
      if (!response.ok) {
        let errorMessage = 'Failed to update profile';
        if (data && data.detail) {
          errorMessage = data.detail;
        }
        throw new Error(errorMessage);
      }
      
      // Update user data in state
      setUser({
        ...user,
        ...data
      });
      
      message.success('Profile updated successfully!');
      return data;
    } catch (err) {
      console.error('Update profile error:', err);
      message.error(err.message || 'Failed to update profile');
      setError(err.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  // Provide all auth functions and state through context
  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      token,
      login, 
      signup, 
      logout,
      changePassword,
      updateProfile,
      isAuthenticated: isAuthenticated()
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);