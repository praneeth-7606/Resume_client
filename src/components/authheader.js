import React from 'react';
import { Button } from 'react-bootstrap';
import { logout } from '../services/authService';

const AuthHeader = ({ onLogout }) => {
  const handleLogout = () => {
    logout();
    if (onLogout) onLogout();
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h1 className="display-4 fw-bold mb-0">Resume Automation Tool</h1>
      <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default AuthHeader;