import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { FaLock, FaEye, FaEyeSlash, FaKey, FaShieldAlt, FaCheck } from 'react-icons/fa';
import { useAuth } from '../context/authcontext';

const ChangePassword = () => {
  // State for password data
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // UI state
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const { changePassword } = useAuth();
  
  // Calculate password strength whenever newPassword changes
  useEffect(() => {
    if (!passwordData.newPassword) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    // Length check
    if (passwordData.newPassword.length >= 6) strength += 25;
    // Uppercase check
    if (/[A-Z]/.test(passwordData.newPassword)) strength += 25;
    // Lowercase check
    if (/[a-z]/.test(passwordData.newPassword)) strength += 25;
    // Special character or number check
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword)) strength += 25;
    
    setPasswordStrength(strength);
  }, [passwordData.newPassword]);
  
  // Handle form input changes
  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Basic validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setError('All password fields are required');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    try {
      setLoading(true);
      
      // Call the changePassword function from auth context
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      
      // Reset form on success
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setSuccess('Password has been changed successfully');
    } catch (err) {
      setError(err.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };
  
  // Get strength color
  const getStrengthColor = () => {
    if (passwordStrength < 25) return '#ff4d4d';
    if (passwordStrength < 50) return '#ffa64d';
    if (passwordStrength < 75) return '#ffcc00';
    return '#66cc66';
  };
  
  // Get strength text
  const getStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };
  
  return (
    <Card className="border-0 shadow" style={{ borderRadius: '12px', maxWidth: '550px', margin: '0 auto' }}>
      <Card.Body className="p-4">
        <div className="d-flex align-items-center mb-4">
          <div className="me-3 p-2 rounded-circle" style={{ background: 'rgba(67, 97, 238, 0.1)' }}>
            <FaShieldAlt size={20} style={{ color: '#4361ee' }} />
          </div>
          <h4 className="mb-0 fw-bold">Change Password</h4>
        </div>
        
        {error && (
          <Alert variant="danger" className="py-2 mb-4 d-flex align-items-center">
            <div className="me-2 p-1 rounded-circle" style={{ background: 'rgba(220, 53, 69, 0.2)' }}>
              <FaEyeSlash className="text-danger" size={12} />
            </div>
            <span className="small">{error}</span>
          </Alert>
        )}
        
        {success && (
          <Alert variant="success" className="py-2 mb-4 d-flex align-items-center">
            <div className="me-2 p-1 rounded-circle" style={{ background: 'rgba(40, 167, 69, 0.2)' }}>
              <FaCheck className="text-success" size={12} />
            </div>
            <span className="small">{success}</span>
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-medium text-secondary">Current Password</Form.Label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '8px 0 0 8px' }}>
                <FaLock className="text-muted" size={12} />
              </span>
              <Form.Control
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleChange}
                placeholder="Current password"
                className="border-start-0 border-end-0 ps-0"
                style={{ 
                  borderRadius: '0',
                  padding: '0.7rem 0.75rem',
                  background: '#f8f9fa'
                }}
                required
              />
              <Button 
                type="button"
                variant="light"
                className="border border-start-0"
                style={{ borderRadius: '0 8px 8px 0' }}
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </Button>
            </div>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label className="small fw-medium text-secondary">New Password</Form.Label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '8px 0 0 8px' }}>
                <FaLock className="text-muted" size={12} />
              </span>
              <Form.Control
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleChange}
                placeholder="New password"
                className="border-start-0 border-end-0 ps-0"
                style={{ 
                  borderRadius: '0',
                  padding: '0.7rem 0.75rem',
                  background: '#f8f9fa'
                }}
                required
              />
              <Button 
                type="button"
                variant="light"
                className="border border-start-0"
                style={{ borderRadius: '0 8px 8px 0' }}
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </Button>
            </div>
            
            {/* Password strength indicator */}
            {passwordData.newPassword && (
              <div className="mt-2">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <small className="text-secondary">Strength: <span style={{ color: getStrengthColor() }}>{getStrengthText()}</span></small>
                  <small className="text-secondary">{passwordData.newPassword.length} / 6+ chars</small>
                </div>
                <div className="progress" style={{ height: '4px' }}>
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${passwordStrength}%`, 
                      backgroundColor: getStrengthColor(),
                      transition: 'width 0.3s ease'
                    }} 
                  />
                </div>
              </div>
            )}
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label className="small fw-medium text-secondary">Confirm New Password</Form.Label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '8px 0 0 8px' }}>
                <FaLock className="text-muted" size={12} />
              </span>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="border-start-0 border-end-0 ps-0"
                style={{ 
                  borderRadius: '0',
                  padding: '0.7rem 0.75rem',
                  background: '#f8f9fa'
                }}
                required
              />
              <Button 
                type="button"
                variant="light"
                className="border border-start-0"
                style={{ borderRadius: '0 8px 8px 0' }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </Button>
            </div>
            
            {/* Password match indicator */}
            {passwordData.confirmPassword && (
              <div className="mt-2">
                <small style={{ 
                  color: passwordData.newPassword === passwordData.confirmPassword ? '#28a745' : '#dc3545'
                }}>
                  {passwordData.newPassword === passwordData.confirmPassword 
                    ? '✓ Passwords match' 
                    : '✗ Passwords do not match'}
                </small>
              </div>
            )}
          </Form.Group>
          
          {/* Password requirements - more compact design */}
          <div className="mb-4 p-3 small" style={{ 
            background: 'rgba(67, 97, 238, 0.05)', 
            borderRadius: '8px',
            border: '1px solid rgba(67, 97, 238, 0.1)'
          }}>
            <div className="d-flex align-items-center mb-2">
              <FaShieldAlt className="me-2" style={{ color: '#4361ee' }} />
              <span className="fw-medium">Password Requirements</span>
            </div>
            <div className="d-flex flex-wrap">
              <div className="me-3 mb-1">• Min 6 characters</div>
              <div className="me-3 mb-1">• Uppercase (A-Z)</div>
              <div className="me-3 mb-1">• Lowercase (a-z)</div>
              <div className="mb-1">• Number/Symbol</div>
            </div>
          </div>
          
          <div className="d-flex justify-content-end">
            <Button
              type="submit"
              variant="primary"
              className="d-inline-flex align-items-center justify-content-center"
              style={{
                background: 'linear-gradient(45deg, #4361ee, #3a0ca3)',
                border: 'none',
                borderRadius: '8px',
                padding: loading ? '0.6rem 1.2rem' : '0.6rem 1.5rem',
                fontWeight: '500',
                boxShadow: '0 4px 10px rgba(67, 97, 238, 0.15)',
                transition: 'all 0.3s ease',
                minWidth: '120px',
                maxWidth: '180px'
              }}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                <>
                  <FaKey className="me-2" size={14} /> Update
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
      
      <style jsx>{`
        .form-control:focus {
          border-color: #4361ee;
          box-shadow: 0 0 0 0.15rem rgba(67, 97, 238, 0.15);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(67, 97, 238, 0.2);
        }
        
        .btn-primary:active {
          transform: translateY(0);
        }
      `}</style>
    </Card>
  );
};

export default ChangePassword;