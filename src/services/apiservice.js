// API service for integrating with the backend
// import { getAuthHeader, authFetch } from './authService';
import { getAuthHeader,authFetch } from "./authservice";

const API_URL = 'http://localhost:8000';

// Get templates
export const getTemplates = async () => {
  try {
    const response = await authFetch(`${API_URL}/api/templates`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch templates');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching templates:', error);
    throw error;
  }
};

// Upload skill matrix
export const uploadSkillMatrix = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await authFetch(`${API_URL}/api/upload/skill-matrix`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload skill matrix');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error uploading skill matrix:', error);
    throw error;
  }
};

// Upload resume
export const uploadResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await authFetch(`${API_URL}/api/upload/resume`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload resume');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error uploading resume:', error);
    throw error;
  }
};

// Get employees list
export const getEmployees = async () => {
  try {
    const response = await authFetch(`${API_URL}/api/employees`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

// Generate resume
export const generateResume = async (data) => {
  try {
    const formData = new FormData();
    
    // Add all provided fields to the form data
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    
    const response = await authFetch(`${API_URL}/api/generate/resume`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate resume');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error generating resume:', error);
    throw error;
  }
};

// Generate cover letter
export const generateCoverLetter = async (data) => {
  try {
    const formData = new FormData();
    
    // Add all provided fields to the form data
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    
    const response = await authFetch(`${API_URL}/api/generate/cover-letter`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate cover letter');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error generating cover letter:', error);
    throw error;
  }
};

// Download file helper (returns the URL to download a file)
export const getDownloadUrl = (filename) => {
  return `${API_URL}/download/${filename}`;
};

// Generic function to download any file from the server
export const downloadFile = async (fileUrl, fileName) => {
  try {
    const response = await authFetch(fileUrl);
    
    if (!response.ok) {
      throw new Error('Failed to download file');
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await authFetch(`${API_URL}/api/user/profile`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Check API health/status
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/health`);
    
    if (!response.ok) {
      throw new Error('API health check failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API health check error:', error);
    throw error;
  }
};