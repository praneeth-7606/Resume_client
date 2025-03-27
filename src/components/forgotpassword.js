// import React, { useState } from 'react';
// import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { message } from 'antd';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   // API base URL from your auth context
//   const API_URL = 'http://localhost:8000';

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess(false);

//     // Basic validation
//     if (!email) {
//       setError('Please enter your email address');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError('Please enter a valid email address');
//       return;
//     }

//     try {
//       setLoading(true);
      
//       const response = await fetch(`${API_URL}/auth/forgot-password`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.detail || 'Failed to process request');
//       }

//       setSuccess(true);
//       message.success('Reset link sent to your email!');
//     } catch (err) {
//       console.error('Forgot password error:', err);
//       setError(err.message || 'Failed to send reset link. Please try again.');
//       message.error(err.message || 'Failed to send reset link');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="forgot-password-page" style={{ 
//       minHeight: '80vh', 
//       display: 'flex', 
//       alignItems: 'center', 
//       background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
//     }}>
//       <Container>
//         <div className="d-flex justify-content-center">
//           <Card className="border-0" style={{ 
//             maxWidth: '420px', 
//             width: '100%', 
//             borderRadius: '15px',
//             boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
//             transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//           }}>
//             <Card.Body className="p-4">
//               <div className="text-center mb-4">
//                 <h2 className="fw-bold" style={{ 
//                   background: 'linear-gradient(135deg, #4361ee, #3a0ca3)', 
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                   fontSize: '1.8rem'
//                 }}>Forgot Password</h2>
//                 <p className="text-muted" style={{ fontSize: '0.9rem' }}>
//                   {success 
//                     ? 'Check your email for the password reset link' 
//                     : 'Enter your email to receive a password reset link'}
//                 </p>
//               </div>
              
//               {error && <Alert variant="danger" className="py-2 mb-3" style={{ fontSize: '0.85rem' }}>{error}</Alert>}
//               {success && <Alert variant="success" className="py-2 mb-3" style={{ fontSize: '0.85rem' }}>Password reset link has been sent to your email!</Alert>}
              
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Email Address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Enter your registered email"
//                     style={{
//                       padding: '0.5rem 0.75rem',
//                       fontSize: '0.9rem',
//                       borderRadius: '8px',
//                       border: '1px solid #e2e8f0',
//                       transition: 'all 0.2s ease-in-out'
//                     }}
//                     disabled={success}
//                     required
//                   />
//                 </Form.Group>
                
//                 <Button
//                   type="submit"
//                   disabled={loading || success}
//                   style={{
//                     background: 'linear-gradient(to right, #4361ee, #3a0ca3)',
//                     border: 'none',
//                     borderRadius: '8px',
//                     padding: '0.6rem 0',
//                     fontSize: '0.9rem',
//                     fontWeight: '500',
//                     width: '100%',
//                     marginBottom: '1rem',
//                     transition: 'all 0.3s ease',
//                     boxShadow: '0 4px 6px rgba(67, 97, 238, 0.15)',
//                   }}
//                 >
//                   {loading ? 'Sending...' : 'Send Reset Link'}
//                 </Button>
                
//                 <div className="text-center mt-3">
//                   <p className="mb-0" style={{ fontSize: '0.85rem' }}>
//                     <Link to="/login" style={{ 
//                       textDecoration: 'none', 
//                       fontWeight: '500',
//                       color: '#4361ee',
//                       transition: 'color 0.2s ease'
//                     }}>Back to Login</Link>
//                   </p>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </div>
//       </Container>

//       {/* Fix: Replace <style jsx> with regular CSS styling */}
//       <style>{`
//         .form-control:focus {
//           border-color: #4361ee !important;
//           box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15) !important;
//         }
        
//         .form-control:hover {
//           border-color: #a5b4fc;
//         }
        
//         button[type="submit"]:hover:not(:disabled) {
//           background: linear-gradient(to right, #3a0ca3, #4361ee) !important;
//           box-shadow: 0 6px 10px rgba(67, 97, 238, 0.25) !important;
//           transform: translateY(-1px);
//         }
        
//         button[type="submit"]:active:not(:disabled) {
//           transform: translateY(1px);
//           box-shadow: 0 2px 4px rgba(67, 97, 238, 0.15) !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ForgotPassword;



import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { message } from 'antd';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // API base URL from your auth context
  const API_URL = 'http://localhost:8000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Basic validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to process request');
      }

      setSuccess(true);
      message.success('Reset link sent to your email!');
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(err.message || 'Failed to send reset link. Please try again.');
      message.error(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page" style={{ 
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
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}>
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="fw-bold" style={{ 
                  background: 'linear-gradient(135deg, #4361ee, #3a0ca3)', 
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '1.8rem'
                }}>Forgot Password</h2>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                  {success 
                    ? 'Check your email for the password reset link' 
                    : 'Enter your email to receive a password reset link'}
                </p>
              </div>
              
              {error && <Alert variant="danger" className="py-2 mb-3" style={{ fontSize: '0.85rem' }}>{error}</Alert>}
              {success && <Alert variant="success" className="py-2 mb-3" style={{ fontSize: '0.85rem' }}>Password reset link has been sent to your email!</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    style={{
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.9rem',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      transition: 'all 0.2s ease-in-out'
                    }}
                    disabled={success}
                    required
                  />
                </Form.Group>
                
                <Button
                  type="submit"
                  disabled={loading || success}
                  style={{
                    background: 'linear-gradient(to right, #4361ee, #3a0ca3)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.6rem 0',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    width: '100%',
                    marginBottom: '1rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px rgba(67, 97, 238, 0.15)',
                  }}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
                
                <div className="text-center mt-3">
                  <p className="mb-0" style={{ fontSize: '0.85rem' }}>
                    <Link to="/login" style={{ 
                      textDecoration: 'none', 
                      fontWeight: '500',
                      color: '#4361ee',
                      transition: 'color 0.2s ease'
                    }}>Back to Login</Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>

      {/* Fix: Replace <style jsx> with regular CSS styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        .form-control:focus {
          border-color: #4361ee !important;
          box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15) !important;
        }
        
        .form-control:hover {
          border-color: #a5b4fc;
        }
        
        button[type="submit"]:hover:not(:disabled) {
          background: linear-gradient(to right, #3a0ca3, #4361ee) !important;
          box-shadow: 0 6px 10px rgba(67, 97, 238, 0.25) !important;
          transform: translateY(-1px);
        }
        
        button[type="submit"]:active:not(:disabled) {
          transform: translateY(1px);
          box-shadow: 0 2px 4px rgba(67, 97, 238, 0.15) !important;
        }
      `}} />
    </div>
  );
};

export default ForgotPassword;