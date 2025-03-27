import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  
  // Get token from URL query params
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  
  // Backend API URL
  const API_URL = 'http://localhost:8000';
  
  // Validate token on component mount
  useEffect(() => {
    validateToken();
  }, []);
  
  const validateToken = async () => {
    if (!token) {
      setError('Missing reset token');
      setVerifying(false);
      return;
    }
    
    try {
      console.log(`Verifying token: ${token.substring(0, 10)}...`);
      
      const response = await fetch(`${API_URL}/auth/verify-reset-token?token=${encodeURIComponent(token)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include', // Include cookies if your API uses cookies
      });
      
      console.log('Response status:', response.status);
      
      // Try to get the response body
      let data;
      try {
        data = await response.json();
        console.log('Response data:', data);
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError);
        setError('Server returned an invalid response');
        setVerifying(false);
        return;
      }
      
      // Check if token is valid based on the response data
      if (data && data.valid === true) {
        console.log('Token is valid');
        setTokenValid(true);
      } else {
        console.log('Token is invalid:', data?.detail || 'Unknown reason');
        setError(data?.detail || 'Invalid or expired token');
      }
    } catch (err) {
      console.error('Token verification error:', err);
      setError('Failed to verify token. Please try again or request a new reset link.');
    } finally {
      setVerifying(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      setLoading(true);
      
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Include cookies if your API uses cookies
        body: JSON.stringify({ token, password }),
      });
      
      // Get response data
      let data;
      try {
        data = await response.json();
      } catch (err) {
        throw new Error('Failed to process server response');
      }
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to reset password');
      }
      
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };
  
  // Show loading state while verifying token
  if (verifying) {
    return (
      <Container className="mt-5 text-center">
        <Card className="p-4">
          <Card.Body>
            <h2>Verifying Reset Link</h2>
            <p>Please wait while we verify your reset link...</p>
          </Card.Body>
        </Card>
      </Container>
    );
  }
  
  return (
    <div className="reset-password-page" style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <Container>
        <div className="d-flex justify-content-center">
          <Card className="border-0" style={{ 
            maxWidth: '420px', 
            width: '100%', 
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
          }}>
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="fw-bold" style={{ 
                  background: 'linear-gradient(135deg, #4361ee, #3a0ca3)', 
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '1.8rem'
                }}>Reset Password</h2>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                  {success 
                    ? 'Your password has been reset successfully.' 
                    : 'Enter your new password below.'}
                </p>
              </div>
              
              {error && <Alert variant="danger" className="py-2 mb-3">{error}</Alert>}
              {success && <Alert variant="success" className="py-2 mb-3">Your password has been reset successfully!</Alert>}
              
              {!success && tokenValid && (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      required
                    />
                  </Form.Group>
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(to right, #4361ee, #3a0ca3)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.6rem 0',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      width: '100%',
                    }}
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </Button>
                </Form>
              )}
              
              {!tokenValid && !success && (
                <Alert variant="danger">
                  This password reset link is invalid or has expired. Please request a new password reset link.
                </Alert>
              )}
              
              {success && (
                <div className="text-center mt-3">
                  <Button
                    href="/login"
                    style={{
                      background: 'linear-gradient(to right, #4361ee, #3a0ca3)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.6rem 0',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      width: '100%',
                    }}
                  >
                    Back to Login
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default ResetPassword;