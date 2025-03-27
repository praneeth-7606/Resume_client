// import React, { useState } from 'react';
// import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
// import { useNavigate, Link } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';
// import { useAuth } from '../context/authcontext';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const { login, loading } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     // Basic validation
//     if (!formData.email || !formData.password) {
//       setError('Email and password are required');
//       return;
//     }

//     try {
//       // Now using email for login instead of username
//       await login(formData.email, formData.password);
//       navigate('/resume-builder'); // Redirect to main app after login
//     } catch (err) {
//       setError(err.message || 'Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className="login-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
//       <Container>
//         <div className="d-flex justify-content-center">
//           <Card className="shadow-lg border-0" style={{ maxWidth: '450px', width: '100%' }}>
//             <Card.Body className="p-5">
//               <div className="text-center mb-4">
//                 <h2 className="fw-bold">Welcome Back</h2>
//                 <p className="text-muted">Sign in to continue to Resume Automation Tool</p>
//               </div>
              
//               {error && <Alert variant="danger">{error}</Alert>}
              
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Enter your email"
//                     required
//                   />
//                 </Form.Group>
                
//                 <Form.Group className="mb-4">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                     required
//                   />
//                 </Form.Group>
                
//                 <Button 
//                   variant="primary" 
//                   type="submit" 
//                   className="w-100 py-2 mb-3"
//                   disabled={loading}
//                 >
//                   {loading ? 'Signing in...' : 'Sign In'}
//                 </Button>
                
//                 <div className="text-center">
//                   <p className="mb-0">
//                     Don't have an account? <Link to="/signup">Sign up</Link>
//                   </p>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default Login;





import React, { useState, useRef } from 'react';
import { Container, Card, Form, Button, Alert, Modal } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import ReCAPTCHA from 'react-google-recaptcha';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    acceptTerms: false
  });
  const [error, setError] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Enhanced validation
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    if (!formData.acceptTerms) {
      setError('You must accept the Terms and Conditions to continue');
      return;
    }

    if (!captchaVerified) {
      setError('Please verify that you are not a robot');
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate('/resume-builder'); // Redirect to main app after login
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      // Reset reCAPTCHA on failure
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setCaptchaVerified(false);
      }
    }
  };

  const onCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
    if (!value) {
      setError('reCAPTCHA verification expired. Please verify again.');
    } else {
      setError(''); // Clear any existing errors when captcha is verified
    }
  };

  const handleShowTerms = () => {
    setShowTerms(true);
  };

  const handleCloseTerms = () => {
    setShowTerms(false);
  };

  return (
    <div className="login-page" style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <Container>
        <div className="d-flex justify-content-center">
          <Card className="login-card border-0" style={{ 
            maxWidth: '420px', 
            width: '100%', 
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}>
            <Card.Body className="p-3">
              <div className="text-center mb-22">
                <h2 className="fw-bold" style={{ 
                  background: 'linear-gradient(135deg, #4361ee, #3a0ca3)', 
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '1.8rem'
                }}>Welcome Back</h2>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>Sign in to continue to Resume Automation Tool</p>
              </div>
              
              {error && <Alert variant="danger" className="py-2 mb-3" style={{ fontSize: '0.85rem' }}>{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                  <Form.Label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="form-control-custom"
                    required
                    style={{
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.9rem',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      transition: 'all 0.2s ease-in-out'
                    }}
                  />
                </Form.Group>
                
                <Form.Group className="mb-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <Form.Label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Password</Form.Label>
                    
                  </div>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="form-control-custom"
                    required
                    style={{
                      padding: '0.5rem 0.5rem',
                      fontSize: '0.9rem',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      transition: 'all 0.2s ease-in-out'
                    }}
                  />
                  <Link to="/forgot-password" className="forgot-password-link" style={{ 
                      fontSize: '0.75rem', 
                      textDecoration: 'none',
                      color: '#4361ee',
                      transition: 'color 0.2s ease'
                    }}>
                      Forgot Password?
                    </Link>
                </Form.Group>

                <div className="mb-2 mt-3 captcha-container">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6Le_YAArAAAAAO2iHAOCWxlkujZIl3yU5iuRf7ab"
                    onChange={onCaptchaChange}
                  />
                </div>
                
                <Form.Group className="mb-3 d-flex align-items-center terms-checkbox">
                  <Form.Check
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="me-2"
                    style={{ marginTop: '2px' }}
                  />
                  <label htmlFor="acceptTerms" className="terms-label" style={{ fontSize: '0.8rem', margin: 0 }}>
                    I agree to the <Link to="#" onClick={(e) => { e.preventDefault(); handleShowTerms(); }} className="terms-link" style={{ color: '#4361ee', textDecoration: 'none' }}>Terms and Conditions</Link>
                  </label>
                </Form.Group>
                
                <Button
                  type="submit"
                  className="w-100 signin-button"
                  style={{
                    background: 'linear-gradient(to right, #4361ee, #3a0ca3)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.6rem 0',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px rgba(67, 97, 238, 0.15)',
                    marginBottom: '1rem'
                  }}
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
                
                <div className="text-center">
                  <p className="mb-0" style={{ fontSize: '0.85rem' }}>
                    Don't have an account? <Link to="/signup" className="signup-link" style={{ 
                      textDecoration: 'none', 
                      fontWeight: '600', 
                      color: '#4361ee',
                      transition: 'color 0.2s ease' 
                    }}>Sign up</Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>

      {/* Terms and Conditions Modal */}
      <Modal show={showTerms} onHide={handleCloseTerms} size="lg">
        <Modal.Header closeButton style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #e2e8f0' }}>
          <Modal.Title style={{ fontSize: '1.2rem', fontWeight: '600' }}>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto', padding: '1rem', fontSize: '0.9rem' }}>
          <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>1. Acceptance of Terms</h5>
          <p>
            By accessing or using the Resume Automation Tool service, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>

          <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '1rem' }}>2. Use License</h5>
          <p>
            Permission is granted to temporarily use the Resume Automation Tool for personal, non-commercial purposes only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose;</li>
            <li>attempt to decompile or reverse engineer any software contained in the Resume Automation Tool;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>

          <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '1rem' }}>3. Disclaimer</h5>
          <p>
            The materials on the Resume Automation Tool are provided on an 'as is' basis. The Resume Automation Tool makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '1rem' }}>4. Privacy</h5>
          <p>
            Your use of the Resume Automation Tool is also governed by our Privacy Policy, which is incorporated by reference into these Terms and Conditions.
          </p>

          <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '1rem' }}>5. Limitations</h5>
          <p>
            In no event shall the Resume Automation Tool or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Resume Automation Tool, even if the Resume Automation Tool or a authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>

          <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '1rem' }}>6. Revisions and Errata</h5>
          <p>
            The materials appearing on the Resume Automation Tool could include technical, typographical, or photographic errors. The Resume Automation Tool does not warrant that any of the materials on its website are accurate, complete or current. The Resume Automation Tool may make changes to the materials contained on its website at any time without notice.
          </p>
        </Modal.Body>
        <Modal.Footer style={{ padding: '0.75rem 1rem', borderTop: '1px solid #e2e8f0' }}>
          <Button variant="secondary" onClick={handleCloseTerms} style={{ fontSize: '0.85rem', padding: '0.375rem 0.75rem' }}>
            Close
          </Button>
          <Button 
            onClick={() => {
              setFormData({...formData, acceptTerms: true});
              handleCloseTerms();
            }}
            style={{
              background: 'linear-gradient(to right, #4361ee, #3a0ca3)',
              border: 'none',
              fontSize: '0.85rem',
              padding: '0.375rem 0.75rem'
            }}
          >
            Accept Terms
          </Button>
        </Modal.Footer>
      </Modal>

      {/* CSS for hover effects */}
      <style jsx>{`
        .login-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .form-control-custom:focus {
          border-color: #4361ee !important;
          box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15) !important;
        }
        
        .form-control-custom:hover {
          border-color: #a5b4fc;
        }
        
        .signin-button:hover {
          background: linear-gradient(to right, #3a0ca3, #4361ee) !important;
          box-shadow: 0 6px 10px rgba(67, 97, 238, 0.25) !important;
          transform: translateY(-1px);
        }
        
        .signin-button:active {
          transform: translateY(1px);
          box-shadow: 0 2px 4px rgba(67, 97, 238, 0.15) !important;
        }
        
        .forgot-password-link:hover, .terms-link:hover, .signup-link:hover {
          color: #3a0ca3 !important;
          text-decoration: underline !important;
        }
        
        .terms-checkbox:hover {
          cursor: pointer;
        }
        
        .captcha-container {
          transform: scale(0.95);
          transform-origin: left top;
        }
      `}</style>
    </div>
  );
};

export default Login;