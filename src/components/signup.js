import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    
    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    try {
      await signup(formData.username, formData.email, formData.password);
      navigate('/login'); // Redirect to login after successful signup
    } catch (err) {
      // Display the error message from the server or a generic message
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Container>
        <div className="d-flex justify-content-center">
          <Card className="shadow-lg border-0" style={{ maxWidth: '450px', width: '100%', borderRadius: '15px' }}>
            <Card.Body className="p-3">
              <div className="text-center mb-3">
                <h2 className="fw-bold text-primary">Create Account</h2>
                <p className="text-muted">Sign up to access Resume Automation Tool</p>
              </div>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-1">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter a username"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-1">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                  <Form.Text className="text-muted">
                    Email address must be unique
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                  />
                  <Form.Text className="text-muted">
                    Password must be at least 6 characters
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-1">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2 mb-3"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
                
                <div className="text-center">
                  <p className="mb-0">
                    Already have an account? <Link to="/login" className="text-decoration-none fw-bold">Sign in</Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Signup;