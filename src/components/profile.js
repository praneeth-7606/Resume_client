// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Form, Button, Alert, Tabs, Tab } from 'react-bootstrap';
// import { useAuth } from '../context/authcontext';
// import { 
//   FaUser, 
//   FaEnvelope, 
//   FaLock, 
//   FaEye, 
//   FaEyeSlash, 
//   FaSave, 
//   FaKey, 
//   FaFileAlt,
//   FaHistory, 
//   FaCheck,
//   FaExclamationTriangle
// } from 'react-icons/fa';

// const ProfilePage = () => {
//   const { user, updateProfile, updatePassword } = useAuth();
//   const [activeTab, setActiveTab] = useState('profile');
  
//   // Profile data state
//   const [profileData, setProfileData] = useState({
//     username: user?.username || '',
//     email: user?.email || '',
//     firstName: user?.firstName || '',
//     lastName: user?.lastName || '',
//     jobTitle: user?.jobTitle || '',
//     location: user?.location || '',
//     bio: user?.bio || '',
//   });
  
//   // Password data state
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
  
//   // UI state
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [profileLoading, setProfileLoading] = useState(false);
//   const [passwordLoading, setPasswordLoading] = useState(false);
//   const [profileError, setProfileError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [profileSuccess, setProfileSuccess] = useState('');
//   const [passwordSuccess, setPasswordSuccess] = useState('');
//   const [passwordStrength, setPasswordStrength] = useState(0);
  
//   // Mock resume data (replace with actual data from your API)
//   const [resumeHistory] = useState([
//     {
//       id: 1,
//       title: 'Software Engineer Resume',
//       created: '2023-10-25',
//       template: 'Modern Tech',
//       downloads: 5
//     },
//     {
//       id: 2,
//       title: 'Senior Developer CV',
//       created: '2023-11-10',
//       template: 'Professional',
//       downloads: 3
//     },
//     {
//       id: 3,
//       title: 'Project Manager Resume',
//       created: '2023-12-15',
//       template: 'Executive',
//       downloads: 2
//     }
//   ]);

//   // Password strength calculation
//   useEffect(() => {
//     if (!passwordData.newPassword) {
//       setPasswordStrength(0);
//       return;
//     }
    
//     let strength = 0;
//     // Length check
//     if (passwordData.newPassword.length >= 6) strength += 25;
//     // Uppercase check
//     if (/[A-Z]/.test(passwordData.newPassword)) strength += 25;
//     // Lowercase check
//     if (/[a-z]/.test(passwordData.newPassword)) strength += 25;
//     // Special character or number check
//     if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword)) strength += 25;
    
//     setPasswordStrength(strength);
//   }, [passwordData.newPassword]);

//   // Handle profile form change
//   const handleProfileChange = (e) => {
//     setProfileData({
//       ...profileData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Handle password form change
//   const handlePasswordChange = (e) => {
//     setPasswordData({
//       ...passwordData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Submit profile update
//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
//     setProfileError('');
//     setProfileSuccess('');
    
//     // Basic validation
//     if (!profileData.username || !profileData.email) {
//       setProfileError('Username and Email are required');
//       return;
//     }
    
//     try {
//       setProfileLoading(true);
      
//       // Call your API to update profile (implement updateProfile in your auth context)
//       // This is a mock implementation - replace with your actual API call
//       await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
//       if (updateProfile) {
//         await updateProfile(profileData);
//       }
      
//       setProfileSuccess('Profile updated successfully!');
//     } catch (err) {
//       setProfileError(err.message || 'Failed to update profile');
//     } finally {
//       setProfileLoading(false);
//     }
//   };

//   // Submit password update
//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     setPasswordError('');
//     setPasswordSuccess('');
    
//     // Basic validation
//     if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
//       setPasswordError('All password fields are required');
//       return;
//     }
    
//     if (passwordData.newPassword.length < 6) {
//       setPasswordError('New password must be at least 6 characters');
//       return;
//     }
    
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       setPasswordError('New passwords do not match');
//       return;
//     }
    
//     try {
//       setPasswordLoading(true);
      
//       // Call your API to update password (implement updatePassword in your auth context)
//       // This is a mock implementation - replace with your actual API call
//       await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
//       if (updatePassword) {
//         await updatePassword(passwordData.currentPassword, passwordData.newPassword);
//       }
      
//       // Clear password fields on success
//       setPasswordData({
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//       });
      
//       setPasswordSuccess('Password changed successfully!');
//     } catch (err) {
//       setPasswordError(err.message || 'Failed to update password');
//     } finally {
//       setPasswordLoading(false);
//     }
//   };

//   // Get strength color
//   const getStrengthColor = () => {
//     if (passwordStrength < 25) return '#ff4d4d';
//     if (passwordStrength < 50) return '#ffa64d';
//     if (passwordStrength < 75) return '#ffcc00';
//     return '#66cc66';
//   };

//   // Get strength text
//   const getStrengthText = () => {
//     if (passwordStrength < 25) return 'Weak';
//     if (passwordStrength < 50) return 'Fair';
//     if (passwordStrength < 75) return 'Good';
//     return 'Strong';
//   };

//   return (
//     <div className="profile-page py-5" style={{ 
//       background: 'linear-gradient(135deg, #f0f8ff 0%, #dff1ff 100%)',
//       minHeight: '100vh'
//     }}>
//       <Container>
//         <Row className="mb-4">
//           <Col>
//             <h1 className="fw-bold" style={{ 
//               fontSize: '1.8rem',
//               color: '#2d3748'
//             }}>My Profile</h1>
//             <p className="text-muted">Manage your account and preferences</p>
//           </Col>
//         </Row>
        
//         <Row>
//           <Col md={3} className="mb-4">
//             <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
//               <Card.Body className="p-4">
//                 <div className="text-center mb-4">
//                   <div className="position-relative d-inline-block">
//                     <div style={{ 
//                       width: '100px', 
//                       height: '100px', 
//                       borderRadius: '50%',
//                       background: 'linear-gradient(135deg, #4361ee22, #3a0ca322)',
//                       border: '2px solid #4361ee',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       margin: '0 auto'
//                     }}>
//                       <FaUser size={40} color="#4361ee" />
//                     </div>
//                   </div>
//                   <h5 className="mt-3 mb-1">{profileData.firstName ? `${profileData.firstName} ${profileData.lastName}` : profileData.username}</h5>
//                   <p className="text-muted small">{profileData.jobTitle || 'Add your job title'}</p>
//                 </div>
                
//                 <hr />
                
//                 <div className="profile-menu">
//                   <Button 
//                     variant={activeTab === 'profile' ? 'light' : 'link'} 
//                     className="w-100 text-start mb-2 d-flex align-items-center"
//                     style={{
//                       padding: '0.5rem 1rem',
//                       borderRadius: '8px',
//                       color: activeTab === 'profile' ? '#4361ee' : '#718096',
//                       backgroundColor: activeTab === 'profile' ? 'rgba(67, 97, 238, 0.08)' : 'transparent',
//                       border: 'none',
//                       fontWeight: activeTab === 'profile' ? '600' : '400'
//                     }}
//                     onClick={() => setActiveTab('profile')}
//                   >
//                     <FaUser className="me-2" /> Profile Information
//                   </Button>
                  
//                   <Button 
//                     variant={activeTab === 'security' ? 'light' : 'link'} 
//                     className="w-100 text-start mb-2 d-flex align-items-center"
//                     style={{
//                       padding: '0.5rem 1rem',
//                       borderRadius: '8px',
//                       color: activeTab === 'security' ? '#4361ee' : '#718096',
//                       backgroundColor: activeTab === 'security' ? 'rgba(67, 97, 238, 0.08)' : 'transparent',
//                       border: 'none',
//                       fontWeight: activeTab === 'security' ? '600' : '400'
//                     }}
//                     onClick={() => setActiveTab('security')}
//                   >
//                     <FaKey className="me-2" /> Security & Password
//                   </Button>
                  
//                   <Button 
//                     variant={activeTab === 'resumes' ? 'light' : 'link'} 
//                     className="w-100 text-start mb-2 d-flex align-items-center"
//                     style={{
//                       padding: '0.5rem 1rem',
//                       borderRadius: '8px',
//                       color: activeTab === 'resumes' ? '#4361ee' : '#718096',
//                       backgroundColor: activeTab === 'resumes' ? 'rgba(67, 97, 238, 0.08)' : 'transparent',
//                       border: 'none',
//                       fontWeight: activeTab === 'resumes' ? '600' : '400'
//                     }}
//                     onClick={() => setActiveTab('resumes')}
//                   >
//                     <FaFileAlt className="me-2" /> Resume History
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
          
//           <Col md={9}>
//             <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
//               <Card.Body className="p-4">
//                 {/* Profile Information Tab */}
//                 {activeTab === 'profile' && (
//                   <div className="profile-info">
//                     <h4 className="mb-4">Profile Information</h4>
                    
//                     {profileError && <Alert variant="danger">{profileError}</Alert>}
//                     {profileSuccess && <Alert variant="success">{profileSuccess}</Alert>}
                    
//                     <Form onSubmit={handleProfileSubmit}>
//                       <Row>
//                         <Col md={6} className="mb-3">
//                           <Form.Group>
//                             <Form.Label className="fw-medium">First Name</Form.Label>
//                             <Form.Control
//                               type="text"
//                               name="firstName"
//                               value={profileData.firstName}
//                               onChange={handleProfileChange}
//                               placeholder="Enter your first name"
//                               style={{ 
//                                 borderRadius: '8px',
//                                 padding: '0.7rem 1rem',
//                                 border: '1px solid #e2e8f0'
//                               }}
//                             />
//                           </Form.Group>
//                         </Col>
                        
//                         <Col md={6} className="mb-3">
//                           <Form.Group>
//                             <Form.Label className="fw-medium">Last Name</Form.Label>
//                             <Form.Control
//                               type="text"
//                               name="lastName"
//                               value={profileData.lastName}
//                               onChange={handleProfileChange}
//                               placeholder="Enter your last name"
//                               style={{ 
//                                 borderRadius: '8px',
//                                 padding: '0.7rem 1rem',
//                                 border: '1px solid #e2e8f0'
//                               }}
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>
                      
//                       <Row>
//                         <Col md={6} className="mb-3">
//                           <Form.Group>
//                             <Form.Label className="fw-medium">Username</Form.Label>
//                             <div className="input-group">
//                               <span className="input-group-text bg-light border-end-0">
//                                 <FaUser className="text-muted" size={14} />
//                               </span>
//                               <Form.Control
//                                 type="text"
//                                 name="username"
//                                 value={profileData.username}
//                                 onChange={handleProfileChange}
//                                 placeholder="Enter username"
//                                 className="border-start-0 ps-0"
//                                 style={{ 
//                                   borderRadius: '0 8px 8px 0',
//                                   padding: '0.7rem 0.75rem',
//                                   background: '#f8f9fa'
//                                 }}
//                                 required
//                               />
//                             </div>
//                           </Form.Group>
//                         </Col>
                        
//                         <Col md={6} className="mb-3">
//                           <Form.Group>
//                             <Form.Label className="fw-medium">Email Address</Form.Label>
//                             <div className="input-group">
//                               <span className="input-group-text bg-light border-end-0">
//                                 <FaEnvelope className="text-muted" size={14} />
//                               </span>
//                               <Form.Control
//                                 type="email"
//                                 name="email"
//                                 value={profileData.email}
//                                 onChange={handleProfileChange}
//                                 placeholder="Enter email"
//                                 className="border-start-0 ps-0"
//                                 style={{ 
//                                   borderRadius: '0 8px 8px 0',
//                                   padding: '0.7rem 0.75rem',
//                                   background: '#f8f9fa'
//                                 }}
//                                 required
//                               />
//                             </div>
//                           </Form.Group>
//                         </Col>
//                       </Row>
                      
//                       <Row>
//                         <Col md={6} className="mb-3">
//                           <Form.Group>
//                             <Form.Label className="fw-medium">Job Title</Form.Label>
//                             <Form.Control
//                               type="text"
//                               name="jobTitle"
//                               value={profileData.jobTitle}
//                               onChange={handleProfileChange}
//                               placeholder="e.g. Software Engineer"
//                               style={{ 
//                                 borderRadius: '8px',
//                                 padding: '0.7rem 1rem',
//                                 border: '1px solid #e2e8f0'
//                               }}
//                             />
//                           </Form.Group>
//                         </Col>
                        
//                         <Col md={6} className="mb-3">
//                           <Form.Group>
//                             <Form.Label className="fw-medium">Location</Form.Label>
//                             <Form.Control
//                               type="text"
//                               name="location"
//                               value={profileData.location}
//                               onChange={handleProfileChange}
//                               placeholder="e.g. New York, NY"
//                               style={{ 
//                                 borderRadius: '8px',
//                                 padding: '0.7rem 1rem',
//                                 border: '1px solid #e2e8f0'
//                               }}
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>
                      
//                       <Form.Group className="mb-4">
//                         <Form.Label className="fw-medium">Bio</Form.Label>
//                         <Form.Control
//                           as="textarea"
//                           name="bio"
//                           value={profileData.bio}
//                           onChange={handleProfileChange}
//                           placeholder="Tell us a bit about yourself"
//                           style={{ 
//                             borderRadius: '8px',
//                             padding: '0.7rem 1rem',
//                             border: '1px solid #e2e8f0',
//                             minHeight: '120px'
//                           }}
//                         />
//                       </Form.Group>
                      
//                       <div className="d-flex justify-content-end">
//                         <Button
//                           type="submit"
//                           variant="primary"
//                           className="d-flex align-items-center"
//                           style={{
//                             background: 'linear-gradient(to right, #4361ee, #3a0ca3)',
//                             border: 'none',
//                             borderRadius: '8px',
//                             padding: '0.7rem 1.5rem',
//                             fontWeight: '500',
//                             boxShadow: '0 4px 12px rgba(67, 97, 238, 0.15)'
//                           }}
//                           disabled={profileLoading}
//                         >
//                           {profileLoading ? 'Saving...' : (
//                             <>
//                               <FaSave className="me-2" /> Save Changes
//                             </>
//                           )}
//                         </Button>
//                       </div>
//                     </Form>
//                   </div>
//                 )}
                
//                 {/* Security & Password Tab */}
//                 {activeTab === 'security' && (
//                   <div className="security-settings">
//                     <h4 className="mb-4">Security & Password</h4>
                    
//                     {passwordError && <Alert variant="danger">{passwordError}</Alert>}
//                     {passwordSuccess && <Alert variant="success">{passwordSuccess}</Alert>}
                    
//                     <Form onSubmit={handlePasswordSubmit}>
//                       <Form.Group className="mb-3">
//                         <Form.Label className="fw-medium">Current Password</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text bg-light border-end-0">
//                             <FaLock className="text-muted" size={14} />
//                           </span>
//                           <Form.Control
//                             type={showCurrentPassword ? "text" : "password"}
//                             name="currentPassword"
//                             value={passwordData.currentPassword}
//                             onChange={handlePasswordChange}
//                             placeholder="Enter your current password"
//                             className="border-start-0 border-end-0 ps-0"
//                             style={{ 
//                               borderRadius: '0',
//                               padding: '0.7rem 0.75rem',
//                               background: '#f8f9fa'
//                             }}
//                             required
//                           />
//                           <Button 
//                             variant="light"
//                             className="border border-start-0"
//                             style={{ borderRadius: '0 8px 8px 0' }}
//                             onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                           >
//                             {showCurrentPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
//                           </Button>
//                         </div>
//                       </Form.Group>
                      
//                       <Form.Group className="mb-3">
//                         <Form.Label className="fw-medium">New Password</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text bg-light border-end-0">
//                             <FaLock className="text-muted" size={14} />
//                           </span>
//                           <Form.Control
//                             type={showNewPassword ? "text" : "password"}
//                             name="newPassword"
//                             value={passwordData.newPassword}
//                             onChange={handlePasswordChange}
//                             placeholder="Enter new password"
//                             className="border-start-0 border-end-0 ps-0"
//                             style={{ 
//                               borderRadius: '0',
//                               padding: '0.7rem 0.75rem',
//                               background: '#f8f9fa'
//                             }}
//                             required
//                           />
//                           <Button 
//                             variant="light"
//                             className="border border-start-0"
//                             style={{ borderRadius: '0 8px 8px 0' }}
//                             onClick={() => setShowNewPassword(!showNewPassword)}
//                           >
//                             {showNewPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
//                           </Button>
//                         </div>
                        
//                         {/* Password strength indicator */}
//                         {passwordData.newPassword && (
//                           <div className="mt-2">
//                             <div className="d-flex justify-content-between align-items-center mb-1">
//                               <small>Password Strength: <span style={{ color: getStrengthColor() }}>{getStrengthText()}</span></small>
//                               <small>{passwordData.newPassword.length} / 6+ chars</small>
//                             </div>
//                             <div style={{ 
//                               height: '5px', 
//                               background: '#e9ecef', 
//                               borderRadius: '3px',
//                               overflow: 'hidden'
//                             }}>
//                               <div style={{ 
//                                 height: '100%', 
//                                 width: `${passwordStrength}%`, 
//                                 background: getStrengthColor(),
//                                 borderRadius: '3px',
//                                 transition: 'width 0.3s ease'
//                               }} />
//                             </div>
//                           </div>
//                         )}
//                       </Form.Group>
                      
//                       <Form.Group className="mb-4">
//                         <Form.Label className="fw-medium">Confirm New Password</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text bg-light border-end-0">
//                             <FaLock className="text-muted" size={14} />
//                           </span>
//                           <Form.Control
//                             type={showConfirmPassword ? "text" : "password"}
//                             name="confirmPassword"
//                             value={passwordData.confirmPassword}
//                             onChange={handlePasswordChange}
//                             placeholder="Confirm new password"
//                             className="border-start-0 border-end-0 ps-0"
//                             style={{ 
//                               borderRadius: '0',
//                               padding: '0.7rem 0.75rem',
//                               background: '#f8f9fa'
//                             }}
//                             required
//                           />
//                           <Button 
//                             variant="light"
//                             className="border border-start-0"
//                             style={{ borderRadius: '0 8px 8px 0' }}
//                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                           >
//                             {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
//                           </Button>
//                         </div>
                        
//                         {/* Password match indicator */}
//                         {passwordData.confirmPassword && (
//                           <div className="mt-2">
//                             <small style={{ 
//                               color: passwordData.newPassword === passwordData.confirmPassword ? '#28a745' : '#dc3545'
//                             }}>
//                               {passwordData.newPassword === passwordData.confirmPassword 
//                                 ? '✓ Passwords match' 
//                                 : '✗ Passwords do not match'}
//                             </small>
//                           </div>
//                         )}
//                       </Form.Group>
                      
//                       <div className="mb-4 p-3" style={{ 
//                         background: 'rgba(67, 97, 238, 0.05)', 
//                         borderRadius: '8px',
//                         border: '1px solid rgba(67, 97, 238, 0.1)'
//                       }}>
//                         <h6 className="mb-2 d-flex align-items-center">
//                           <FaExclamationTriangle className="me-2" style={{ color: '#f59e0b' }} />
//                           Password Requirements
//                         </h6>
//                         <ul className="mb-0 ps-4" style={{ fontSize: '0.85rem' }}>
//                           <li>At least 6 characters long</li>
//                           <li>Include uppercase letters (A-Z)</li>
//                           <li>Include lowercase letters (a-z)</li>
//                           <li>Include at least one number (0-9) or special character</li>
//                         </ul>
//                       </div>
                      
//                       <div className="d-flex justify-content-end">
//                         <Button
//                           type="submit"
//                           variant="primary"
//                           className="d-flex align-items-center"
//                           style={{
//                             background: 'linear-gradient(to right, #4361ee, #3a0ca3)',
//                             border: 'none',
//                             borderRadius: '8px',
//                             padding: '0.7rem 1.5rem',
//                             fontWeight: '500',
//                             boxShadow: '0 4px 12px rgba(67, 97, 238, 0.15)'
//                           }}
//                           disabled={passwordLoading}
//                         >
//                           {passwordLoading ? 'Updating...' : (
//                             <>
//                               <FaKey className="me-2" /> Update Password
//                             </>
//                           )}
//                         </Button>
//                       </div>
//                     </Form>
//                   </div>
//                 )}
                
//                 {/* Resume History Tab */}
//                 {activeTab === 'resumes' && (
//                   <div className="resume-history">
//                     <h4 className="mb-4">Resume History</h4>
                    
//                     {resumeHistory.length === 0 ? (
//                       <div className="text-center p-5">
//                         <FaFileAlt size={50} className="text-muted mb-3" />
//                         <h5>No Resumes Yet</h5>
//                         <p className="text-muted">You haven't created any resumes yet. Start building your first resume now!</p>
//                         <Button
//                           variant="primary"
//                           href="/resume-builder"
//                           style={{
//                             background: 'linear-gradient(to right, #4361ee, #3a0ca3)',
//                             border: 'none',
//                             borderRadius: '8px',
//                             padding: '0.7rem 1.5rem',
//                             fontWeight: '500',
//                             boxShadow: '0 4px 12px rgba(67, 97, 238, 0.15)'
//                           }}
//                         >
//                           Create Resume
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="table-responsive">
//                         <table className="table table-hover">
//                           <thead>
//                             <tr>
//                               <th>Resume Title</th>
//                               <th>Date Created</th>
//                               <th>Template</th>
//                               <th>Downloads</th>
//                               <th>Actions</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {resumeHistory.map((resume) => (
//                               <tr key={resume.id}>
//                                 <td>{resume.title}</td>
//                                 <td>{resume.created}</td>
//                                 <td>{resume.template}</td>
//                                 <td>{resume.downloads}</td>
//                                 <td>
//                                   <Button
//                                     variant="outline-primary"
//                                     size="sm"
//                                     className="me-2"
//                                     style={{
//                                       borderRadius: '6px',
//                                       fontSize: '0.8rem',
//                                       padding: '0.25rem 0.5rem'
//                                     }}
//                                   >
//                                     Edit
//                                   </Button>
//                                   <Button
//                                     variant="outline-secondary"
//                                     size="sm"
//                                     style={{
//                                       borderRadius: '6px',
//                                       fontSize: '0.8rem',
//                                       padding: '0.25rem 0.5rem'
//                                     }}
//                                   >
//                                     Download
//                                   </Button>
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
      
//       <style>{`
//         /* Custom styles for profile page */
//         .form-control:focus {
//           border-color: #4361ee;
//           box-shadow: 0 0 0 0.2rem rgba(67, 97, 238, 0.15);
//         }
        
//         .btn-primary:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 15px rgba(67, 97, 238, 0.25);
//         }
        
//         .btn-primary:active {
//           transform: translateY(0);
//         }
        
//         .profile-menu .btn:hover {
//           background-color: rgba(67, 97, 238, 0.05);
//           color: #4361ee;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProfilePage;



import React, { useState } from 'react';
import { Container, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';
import { useAuth } from '../context/authcontext';
import { FaUser, FaLock, FaFileAlt } from 'react-icons/fa';

// import ProfileInformation from './ProfileInformation';
import ChangePassword from './changepassword'; // Create this component separately
// import ChangePassword from './ChangePassword'; // Import the component we just created
// import ResumeHistory from './ResumeHistory'; // Create this component separately

const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="profile-page py-5" style={{ 
      background: 'linear-gradient(135deg, #f0f8ff 0%, #dff1ff 100%)',
      minHeight: '100vh'
    }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="fw-bold" style={{ 
              fontSize: '1.8rem',
              color: '#2d3748'
            }}>My Profile</h1>
            <p className="text-muted">Manage your account and preferences</p>
          </Col>
        </Row>
        
        <Row>
          <Col md={3} className="mb-4">
            <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <div className="position-relative d-inline-block">
                    <div style={{ 
                      width: '100px', 
                      height: '100px', 
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4361ee22, #3a0ca322)',
                      border: '2px solid #4361ee',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}>
                      <FaUser size={40} color="#4361ee" />
                    </div>
                  </div>
                  <h5 className="mt-3 mb-1">{user?.firstName ? `${user.firstName} ${user.lastName}` : user?.username}</h5>
                  <p className="text-muted small">{user?.jobTitle || 'User'}</p>
                </div>
                
                <hr />
                
                <div className="profile-menu">
                  <button 
                    className={`w-100 text-start mb-2 d-flex align-items-center border-0 ${activeTab === 'profile' ? 'active-tab' : ''}`}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      color: activeTab === 'profile' ? '#4361ee' : '#718096',
                      backgroundColor: activeTab === 'profile' ? 'rgba(67, 97, 238, 0.08)' : 'transparent',
                      fontWeight: activeTab === 'profile' ? '600' : '400',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => setActiveTab('profile')}
                  >
                    <FaUser className="me-2" /> Profile Information
                  </button>
                  
                  <button 
                    className={`w-100 text-start mb-2 d-flex align-items-center border-0 ${activeTab === 'security' ? 'active-tab' : ''}`}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      color: activeTab === 'security' ? '#4361ee' : '#718096',
                      backgroundColor: activeTab === 'security' ? 'rgba(67, 97, 238, 0.08)' : 'transparent',
                      fontWeight: activeTab === 'security' ? '600' : '400',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => setActiveTab('security')}
                  >
                    <FaLock className="me-2" /> Security & Password
                  </button>
                  
                  <button 
                    className={`w-100 text-start mb-2 d-flex align-items-center border-0 ${activeTab === 'resumes' ? 'active-tab' : ''}`}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      color: activeTab === 'resumes' ? '#4361ee' : '#718096',
                      backgroundColor: activeTab === 'resumes' ? 'rgba(67, 97, 238, 0.08)' : 'transparent',
                      fontWeight: activeTab === 'resumes' ? '600' : '400',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => setActiveTab('resumes')}
                  >
                    <FaFileAlt className="me-2" /> Resume History
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={9}>
            
            
            {activeTab === 'security' && (
              <ChangePassword />
            )}
            
            
          </Col>
        </Row>
      </Container>
      
      <style>{`
        .active-tab {
          background-color: rgba(67, 97, 238, 0.08) !important;
          color: #4361ee !important;
          font-weight: 600 !important;
        }
        
        button:hover:not(.active-tab) {
          background-color: rgba(67, 97, 238, 0.04) !important;
          color: #4361ee !important;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;