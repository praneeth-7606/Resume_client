// // import React, { useState, useEffect } from 'react';
// // import { Container, Navbar as BootstrapNavbar, Nav, Button, NavDropdown } from 'react-bootstrap';
// // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // import { useAuth } from '../context/authcontext';
// // import { FaUserCircle, FaSignOutAlt, FaHome, FaFileAlt, FaUserEdit } from 'react-icons/fa';

// // const Navbar = () => {
// //   const { user, logout } = useAuth();
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [scrolled, setScrolled] = useState(false);
// //   const [expanded, setExpanded] = useState(false);

// //   // Handle scroll effect for navbar
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       const offset = window.scrollY;
// //       if (offset > 30) {
// //         setScrolled(true);
// //       } else {
// //         setScrolled(false);
// //       }
// //     };

// //     window.addEventListener('scroll', handleScroll);
// //     return () => {
// //       window.removeEventListener('scroll', handleScroll);
// //     };
// //   }, []);

// //   const handleLogout = async () => {
// //     await logout();
// //     navigate('/login');
// //     setExpanded(false);
// //   };

// //   const closeNavbar = () => setExpanded(false);

// //   // Determine if current path is active
// //   const isActive = (path) => {
// //     return location.pathname === path ? 'active' : '';
// //   };

// //   // Color Theme - ADJUST YOUR COLOR HERE
// //   // Changed to a soft mint green background
// //   const bgColor = scrolled ? 'rgba(236, 253, 245, 0.95)' : 'rgba(236, 253, 245, 0.8)';
// //   const textColor = 'rgba(40, 50, 82, 0.9)';
// //   const primaryColor = '#10B981'; // Changed to a green tone
// //   const secondaryColor = '#059669'; // Darker green
// //   const accentColor = '#34D399'; // Lighter green
  
// //   // Button styling - both buttons will use this
// //   const buttonStyle = {
// //     background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
// //     fontSize: '0.85rem',
// //     padding: '0.35rem 1.2rem',
// //     fontWeight: 500,
// //     letterSpacing: '0.3px',
// //     color: 'white',
// //     border: 'none',
// //     boxShadow: '0 2px 5px rgba(16, 185, 129, 0.2)',
// //     width: '85px',
// //     display: 'flex',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     height: '35px'
// //   };

// //   return (
// //     <BootstrapNavbar 
// //       expanded={expanded}
// //       onToggle={setExpanded}
// //       expand="lg" 
// //       fixed="top"
// //       className="navbar-slim py-1"
// //       style={{
// //         transition: 'all 0.3s ease-in-out',
// //         backgroundColor: bgColor,
// //         backdropFilter: scrolled ? 'blur(8px)' : 'none',
// //         borderBottom: scrolled ? '1px solid rgba(209, 250, 229, 0.8)' : 'none',
// //         height: scrolled ? '56px' : '64px',
// //       }}
// //     >
// //       <Container fluid className="px-4">
// //         <BootstrapNavbar.Brand 
// //           as={Link} 
// //           to="/" 
// //           className="d-flex align-items-center"
// //           onClick={closeNavbar}
// //           style={{ color: textColor }}
// //         >
// //           <div className="d-flex align-items-center justify-content-center rounded-circle" 
// //             style={{ 
// //               width: '32px', 
// //               height: '32px', 
// //               background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
// //               boxShadow: '0 2px 10px rgba(16, 185, 129, 0.15)'
// //             }}>
// //             <FaFileAlt className="text-white" size={16} />
// //           </div>
// //           <span className="brand-text ms-2" 
// //                 style={{ 
// //                   fontSize: '1.1rem', 
// //                   fontWeight: 600,
// //                   background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
// //                   WebkitBackgroundClip: 'text',
// //                   WebkitTextFillColor: 'transparent'
// //                 }}>
// //             Resume<span style={{ fontWeight: 300 }}>Pro</span>
// //           </span>
// //         </BootstrapNavbar.Brand>
        
// //         <BootstrapNavbar.Toggle 
// //           aria-controls="responsive-navbar-nav" 
// //           className="border-0 shadow-none p-1" 
// //           style={{ fontSize: '0.8rem' }}
// //         />
        
// //         <BootstrapNavbar.Collapse id="responsive-navbar-nav">
// //           <Nav className="ms-auto align-items-center">
// //             {user ? (
// //               <>
// //                 {/* Show these links only when logged in */}
// //                 <Nav.Link 
// //                   as={Link} 
// //                   to="/" 
// //                   className={`mx-1 nav-link ${isActive('/')}`}
// //                   onClick={closeNavbar}
// //                   style={{ 
// //                     color: textColor, 
// //                     fontSize: '0.9rem',
// //                     padding: '0.4rem 0.8rem' 
// //                   }}
// //                 >
// //                   <FaHome className="me-1 mb-1" size={14} />
// //                   Dashboard
// //                 </Nav.Link>
                
// //                 <Nav.Link 
// //                   as={Link} 
// //                   to="/resume-builder" 
// //                   className={`mx-1 nav-link ${isActive('/resume-builder')}`}
// //                   onClick={closeNavbar}
// //                   style={{ 
// //                     color: textColor, 
// //                     fontSize: '0.9rem',
// //                     padding: '0.4rem 0.8rem' 
// //                   }}
// //                 >
// //                   <FaFileAlt className="me-1 mb-1" size={14} />
// //                   Builder
// //                 </Nav.Link>
                
// //                 <NavDropdown 
// //                   title={
// //                     <div className="d-inline-flex align-items-center">
// //                       <div className="position-relative d-flex align-items-center justify-content-center rounded-circle" 
// //                         style={{ 
// //                           width: '28px', 
// //                           height: '28px', 
// //                           background: `linear-gradient(135deg, ${primaryColor}22, ${accentColor}22)`,
// //                           border: `1px solid ${primaryColor}33`,
// //                           overflow: 'hidden' 
// //                         }}>
// //                         <FaUserCircle size={18} style={{ color: primaryColor }} />
// //                       </div>
// //                       <span className="ms-2" style={{ fontSize: '0.9rem', color: textColor }}>
// //                         {user.username || user.email?.split('@')[0] || 'User'}
// //                       </span>
// //                     </div>
// //                   } 
// //                   id="user-dropdown"
// //                   align="end"
// //                   className="mx-1"
// //                   style={{ padding: '0.35rem 0' }}
// //                 >
// //                   <NavDropdown.Item as={Link} to="/profile" onClick={closeNavbar} className="py-2" style={{ fontSize: '0.9rem' }}>
// //                     <FaUserEdit className="me-2" style={{ color: primaryColor }} />
// //                     My Profile
// //                   </NavDropdown.Item>
// //                   <NavDropdown.Divider />
// //                   <NavDropdown.Item onClick={handleLogout} className="py-2" style={{ fontSize: '0.9rem', color: '#ff5a5f' }}>
// //                     <FaSignOutAlt className="me-2" />
// //                     Logout
// //                   </NavDropdown.Item>
// //                 </NavDropdown>
// //               </>
// //             ) : (
// //               <>
// //                 {/* Show these when not logged in - BOTH BUTTONS STYLED THE SAME WAY NOW WITH EQUAL SIZES */}
// //                 <div className="d-flex align-items-center">
// //                   <Button
// //                     as={Link}
// //                     to="/login"
// //                     className="rounded-pill"
// //                     onClick={closeNavbar}
// //                     style={buttonStyle}
// //                   >
// //                     Sign In
// //                   </Button>
                  
// //                   <Button
// //                     as={Link}
// //                     to="/signup"
// //                     className="ms-3 rounded-pill"
// //                     onClick={closeNavbar}
// //                     style={buttonStyle}
// //                   >
// //                     Sign Up
// //                   </Button>
// //                 </div>
// //               </>
// //             )}
// //           </Nav>
// //         </BootstrapNavbar.Collapse>
// //       </Container>
// //     </BootstrapNavbar>
// //   );
// // };

// // // Add this CSS to your styles/index.css or App.css
// // const NavbarStyles = () => (
// //   <style >{`
// //     .navbar-slim .nav-link.active {
// //       font-weight: 600;
// //       position: relative;
// //     }
    
// //     .navbar-slim .nav-link.active::after {
// //       content: '';
// //       position: absolute;
// //       bottom: -2px;
// //       left: 50%;
// //       transform: translateX(-50%);
// //       width: 30%;
// //       height: 3px;
// //       border-radius: 3px;
// //       background: linear-gradient(90deg, #10B981, #34D399);
// //     }
    
// //     .navbar-slim .navbar-toggler:focus {
// //       box-shadow: none;
// //     }
    
// //     .navbar-slim .navbar-toggler-icon {
// //       width: 1.2em;
// //       height: 1.2em;
// //     }
    
// //     /* Custom dropdown styling */
// //     .navbar-slim .dropdown-menu {
// //       border-radius: 12px;
// //       border: none;
// //       box-shadow: 0 8px 16px rgba(0,0,0,0.08);
// //       padding: 0.5rem 0;
// //       margin-top: 8px;
// //       border: 1px solid rgba(209, 250, 229, 0.8);
// //       animation: dropdownFade 0.2s ease-out;
// //     }
    
// //     .navbar-slim .dropdown-item:hover {
// //       background-color: rgba(16, 185, 129, 0.05);
// //     }
    
// //     .navbar-slim .dropdown-divider {
// //       margin: 0.3rem 0;
// //       border-color: rgba(209, 250, 229, 0.8);
// //     }
    
// //     /* Button hover effects */
// //     .navbar-slim .btn {
// //       transition: all 0.3s ease;
// //     }
    
// //     .navbar-slim .btn:hover {
// //       transform: translateY(-2px);
// //       box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
// //     }
    
// //     .navbar-slim .btn:active {
// //       transform: translateY(0);
// //     }
    
// //     @keyframes dropdownFade {
// //       from { opacity: 0; transform: translateY(-5px); }
// //       to { opacity: 1; transform: translateY(0); }
// //     }
// //   `}</style>
// // );

// // const NavbarWithStyles = () => (
// //   <>
// //     <NavbarStyles />
// //     <Navbar />
// //   </>
// // );

// // export default NavbarWithStyles;








import React, { useState, useEffect } from 'react';
import { Container, Navbar as BootstrapNavbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import { 
  FaUserCircle, 
  FaSignOutAlt, 
  FaHome, 
  FaFileAlt, 
  FaUserEdit,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaKey
} from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showDropdownAnimation, setShowDropdownAnimation] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setExpanded(false);
  };

  const closeNavbar = () => setExpanded(false);

  // Determine if current path is active
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  // Color Theme aligned with login/signup pages
  const bgColor = scrolled 
    ? 'rgba(255, 255, 255, 0.95)' 
    : 'rgba(255, 255, 255, 0.8)';
  const primaryColor = '#4361ee';
  const secondaryColor = '#3a0ca3';
  const textColor = '#2d3748';
  const lightColor = '#f0f8ff';
  
  return (
    <BootstrapNavbar 
      expanded={expanded}
      onToggle={setExpanded}
      expand="lg" 
      fixed="top"
      className="navbar-custom py-2"
      style={{
        transition: 'all 0.3s ease-in-out',
        backgroundColor: bgColor,
        backdropFilter: 'blur(10px)',
        borderBottom: scrolled ? `1px solid rgba(67, 97, 238, 0.1)` : 'none',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
        height: scrolled ? '65px' : '80px',
        zIndex: 1030
      }}
    >
      <Container>
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/" 
          className="d-flex align-items-center"
          onClick={closeNavbar}
        >
          <div className="d-flex align-items-center justify-content-center rounded-circle me-2" 
            style={{ 
              width: '40px', 
              height: '40px', 
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              boxShadow: '0 3px 12px rgba(67, 97, 238, 0.2)',
              transition: 'all 0.3s ease'
            }}>
            <FaFileAlt className="text-white" size={18} />
          </div>
          <div className="brand-text">
            <span style={{ 
              fontSize: '1.3rem', 
              fontWeight: 700,
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.5px'
            }}>
              Resume<span style={{ fontWeight: 300 }}>Pro</span>
            </span>
          </div>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle 
          aria-controls="responsive-navbar-nav" 
          className="custom-toggler border-0 shadow-none p-1"
          style={{ 
            backgroundColor: `rgba(67, 97, 238, 0.1)`,
            borderRadius: '8px',
            padding: '0.5rem !important'
          }}
        >
          <FaBars style={{ color: primaryColor }} />
        </BootstrapNavbar.Toggle>
        
        <BootstrapNavbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {user ? (
              <>
                {/* Show these links only when logged in */}
                <Nav.Link 
                  as={Link} 
                  to="/" 
                  className={`nav-link-custom mx-1 ${isActive('/')}`}
                  onClick={closeNavbar}
                  style={{ 
                    color: textColor, 
                    fontSize: '0.9rem',
                    fontWeight: location.pathname === '/' ? 600 : 500,
                    padding: '0.5rem 0.8rem',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <FaHome className="me-2 nav-icon" />
                  Dashboard
                </Nav.Link>
                
                <Nav.Link 
                  as={Link} 
                  to="/resume-builder" 
                  className={`nav-link-custom mx-1 ${isActive('/resume-builder')}`}
                  onClick={closeNavbar}
                  style={{ 
                    color: textColor, 
                    fontSize: '0.9rem',
                    fontWeight: location.pathname === '/resume-builder' ? 600 : 500,
                    padding: '0.5rem 0.8rem',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <FaFileAlt className="me-2 nav-icon" />
                  Builder
                </Nav.Link>
                
                <NavDropdown 
                  title={
                    <div className="d-inline-flex align-items-center">
                      <div className="position-relative d-flex align-items-center justify-content-center rounded-circle" 
                        style={{ 
                          width: '36px', 
                          height: '36px', 
                          background: `linear-gradient(135deg, ${primaryColor}22, ${secondaryColor}22)`,
                          border: `2px solid ${primaryColor}`,
                          overflow: 'hidden',
                          transition: 'all 0.3s ease'
                        }}>
                        <FaUserCircle size={20} style={{ color: primaryColor }} />
                      </div>
                      <span className="ms-2" style={{ 
                        fontSize: '0.9rem', 
                        color: textColor,
                        fontWeight: 500
                      }}>
                        {user.username || user.email?.split('@')[0] || 'User'}
                      </span>
                    </div>
                  } 
                  id="user-dropdown"
                  align="end"
                  className="mx-1 dropdown-custom"
                  style={{ padding: '0.35rem 0' }}
                  onToggle={(isOpen) => setShowDropdownAnimation(isOpen)}
                >
                  <div className={`dropdown-menu-animated ${showDropdownAnimation ? 'show-animation' : ''}`}>
                    
                    
                    <NavDropdown.Item 
                      as={Link} 
                      to="/profile/change-password" 
                      onClick={closeNavbar} 
                      className="dropdown-item-custom py-2"
                    >
                      <FaKey className="me-2" style={{ color: primaryColor }} />
                      Change Password
                    </NavDropdown.Item>
                    
                    <NavDropdown.Divider />
                    <NavDropdown.Item 
                      onClick={handleLogout} 
                      className="dropdown-item-custom py-2"
                      style={{ color: '#f56565' }}
                    >
                      <FaSignOutAlt className="me-2" />
                      Logout
                    </NavDropdown.Item>
                  </div>
                </NavDropdown>
              </>
            ) : (
              <>
                {/* Show these when not logged in */}
                <div className="d-flex align-items-center">
                  <Link
                    to="/login"
                    className="btn-nav login-btn me-3"
                    onClick={closeNavbar}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: primaryColor,
                      backgroundColor: 'rgba(67, 97, 238, 0.1)',
                      border: `1px solid ${primaryColor}`,
                      borderRadius: '10px',
                      padding: '0.5rem 1.2rem',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    }}
                  >
                    <FaSignInAlt className="me-2" />
                    Sign In
                  </Link>
                  
                  <Link
                    to="/signup"
                    className="btn-nav signup-btn"
                    onClick={closeNavbar}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: '#fff',
                      background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                      border: 'none',
                      borderRadius: '10px',
                      padding: '0.6rem 1.2rem',
                      boxShadow: '0 4px 12px rgba(67, 97, 238, 0.2)',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    }}
                  >
                    <FaUserPlus className="me-2" />
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>

      <style>{`
        /* Custom hover effects */
        .navbar-custom .nav-link-custom:hover {
          background-color: rgba(67, 97, 238, 0.07);
          transform: translateY(-2px);
        }
        
        .navbar-custom .nav-link-custom.active {
          background-color: rgba(67, 97, 238, 0.1);
          color: ${primaryColor} !important;
          font-weight: 600;
          transform: translateY(-2px);
        }
        
        .navbar-custom .nav-link-custom.active .nav-icon {
          color: ${primaryColor};
        }
        
        /* Brand hover effect */
        .navbar-custom .navbar-brand:hover .rounded-circle {
          transform: scale(1.05) rotate(5deg);
          box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
        }
        
        /* Buttons hover effects */
        .btn-nav.login-btn:hover {
          background-color: rgba(67, 97, 238, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(67, 97, 238, 0.1);
        }
        
        .btn-nav.signup-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(67, 97, 238, 0.3);
          background: linear-gradient(135deg, #3a0ca3, #4361ee);
        }
        
        /* Dropdown styling */
        .dropdown-custom .dropdown-menu {
          border: none;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 0.5rem;
          margin-top: 10px;
          border: 1px solid rgba(67, 97, 238, 0.1);
          overflow: hidden;
        }
        
        .dropdown-item-custom {
          border-radius: 8px;
          margin-bottom: 2px;
          transition: all 0.2s ease;
        }
        
        .dropdown-item-custom:hover {
          background-color: rgba(67, 97, 238, 0.07);
        }
        
        .dropdown-menu-animated {
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(-10px);
        }
        
        .dropdown-menu-animated.show-animation {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Divider styling */
        .dropdown-divider {
          margin: 0.3rem 0;
          border-color: rgba(67, 97, 238, 0.1);
        }
        
        /* Toggle animation */
        .navbar-toggler:focus {
          box-shadow: none;
        }
        
        /* For mobile view */
        @media (max-width: 991.98px) {
          .navbar-custom .navbar-collapse {
            background-color: rgba(255, 255, 255, 0.98);
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            margin-top: 0.5rem;
            border: 1px solid rgba(67, 97, 238, 0.1);
          }
          
          .navbar-custom .nav-link-custom {
            margin: 0.3rem 0;
            padding: 0.7rem 1rem !important;
          }
          
          .btn-nav {
            margin: 0.5rem 0;
            width: 100%;
            justify-content: center;
          }
          
          .login-btn {
            margin-right: 0 !important;
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </BootstrapNavbar>
  );
};

export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { Container, Navbar as BootstrapNavbar, Nav, Button, NavDropdown } from 'react-bootstrap';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/authcontext';
// import { 
//   FaUserCircle, 
//   FaSignOutAlt, 
//   FaHome, 
//   FaFileAlt, 
//   FaUserEdit,
//   FaSignInAlt,
//   FaUserPlus,
//   FaBars
// } from 'react-icons/fa';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [scrolled, setScrolled] = useState(false);
//   const [expanded, setExpanded] = useState(false);
//   const [showDropdownAnimation, setShowDropdownAnimation] = useState(false);

//   // Handle scroll effect for navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       const offset = window.scrollY;
//       if (offset > 30) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//     setExpanded(false);
//   };

//   const closeNavbar = () => setExpanded(false);

//   // Determine if current path is active
//   const isActive = (path) => {
//     return location.pathname === path ? 'active' : '';
//   };

//   // Color Theme aligned with login/signup pages
//   const bgColor = scrolled 
//     ? 'rgba(255, 255, 255, 0.95)' 
//     : 'rgba(255, 255, 255, 0.8)';
//   const primaryColor = '#4361ee';
//   const secondaryColor = '#3a0ca3';
//   const textColor = '#2d3748';
//   const lightColor = '#f0f8ff';
  
//   return (
//     <BootstrapNavbar 
//       expanded={expanded}
//       onToggle={setExpanded}
//       expand="lg" 
//       fixed="top"
//       className="navbar-custom py-2"
//       style={{
//         transition: 'all 0.3s ease-in-out',
//         backgroundColor: bgColor,
//         backdropFilter: 'blur(10px)',
//         borderBottom: scrolled ? `1px solid rgba(67, 97, 238, 0.1)` : 'none',
//         boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
//         height: scrolled ? '65px' : '80px',
//         zIndex: 1030
//       }}
//     >
//       <Container>
//         <BootstrapNavbar.Brand 
//           as={Link} 
//           to="/" 
//           className="d-flex align-items-center"
//           onClick={closeNavbar}
//         >
//           <div className="d-flex align-items-center justify-content-center rounded-circle me-2" 
//             style={{ 
//               width: '40px', 
//               height: '40px', 
//               background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
//               boxShadow: '0 3px 12px rgba(67, 97, 238, 0.2)',
//               transition: 'all 0.3s ease'
//             }}>
//             <FaFileAlt className="text-white" size={18} />
//           </div>
//           <div className="brand-text">
//             <span style={{ 
//               fontSize: '1.3rem', 
//               fontWeight: 700,
//               background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               letterSpacing: '0.5px'
//             }}>
//               Resume<span style={{ fontWeight: 300 }}>Pro</span>
//             </span>
//           </div>
//         </BootstrapNavbar.Brand>
        
//         <BootstrapNavbar.Toggle 
//           aria-controls="responsive-navbar-nav" 
//           className="custom-toggler border-0 shadow-none p-1"
//           style={{ 
//             backgroundColor: `rgba(67, 97, 238, 0.1)`,
//             borderRadius: '8px',
//             padding: '0.5rem !important'
//           }}
//         >
//           <FaBars style={{ color: primaryColor }} />
//         </BootstrapNavbar.Toggle>
        
//         <BootstrapNavbar.Collapse id="responsive-navbar-nav">
//           <Nav className="ms-auto align-items-center">
//             {user ? (
//               <>
//                 {/* Show these links only when logged in */}
//                 <Nav.Link 
//                   as={Link} 
//                   to="/" 
//                   className={`nav-link-custom mx-1 ${isActive('/')}`}
//                   onClick={closeNavbar}
//                   style={{ 
//                     color: textColor, 
//                     fontSize: '0.9rem',
//                     fontWeight: location.pathname === '/' ? 600 : 500,
//                     padding: '0.5rem 0.8rem',
//                     borderRadius: '8px',
//                     transition: 'all 0.2s ease'
//                   }}
//                 >
//                   <FaHome className="me-2 nav-icon" />
//                   Dashboard
//                 </Nav.Link>
                
//                 <Nav.Link 
//                   as={Link} 
//                   to="/resume-builder" 
//                   className={`nav-link-custom mx-1 ${isActive('/resume-builder')}`}
//                   onClick={closeNavbar}
//                   style={{ 
//                     color: textColor, 
//                     fontSize: '0.9rem',
//                     fontWeight: location.pathname === '/resume-builder' ? 600 : 500,
//                     padding: '0.5rem 0.8rem',
//                     borderRadius: '8px',
//                     transition: 'all 0.2s ease'
//                   }}
//                 >
//                   <FaFileAlt className="me-2 nav-icon" />
//                   Builder
//                 </Nav.Link>
                
//                 <NavDropdown 
//                   title={
//                     <div className="d-inline-flex align-items-center">
//                       <div className="position-relative d-flex align-items-center justify-content-center rounded-circle" 
//                         style={{ 
//                           width: '36px', 
//                           height: '36px', 
//                           background: `linear-gradient(135deg, ${primaryColor}22, ${secondaryColor}22)`,
//                           border: `2px solid ${primaryColor}`,
//                           overflow: 'hidden',
//                           transition: 'all 0.3s ease'
//                         }}>
//                         <FaUserCircle size={20} style={{ color: primaryColor }} />
//                       </div>
//                       <span className="ms-2" style={{ 
//                         fontSize: '0.9rem', 
//                         color: textColor,
//                         fontWeight: 500
//                       }}>
//                         {user.username || user.email?.split('@')[0] || 'User'}
//                       </span>
//                     </div>
//                   } 
//                   id="user-dropdown"
//                   align="end"
//                   className="mx-1 dropdown-custom"
//                   style={{ padding: '0.35rem 0' }}
//                   onToggle={(isOpen) => setShowDropdownAnimation(isOpen)}
//                 >
//                   <div className={`dropdown-menu-animated ${showDropdownAnimation ? 'show-animation' : ''}`}>
//                     <NavDropdown.Item 
//                       as={Link} 
//                       to="/reset-password" 
//                       onClick={closeNavbar} 
//                       className="dropdown-item-custom py-2"
//                     >
//                       <FaUserEdit className="me-2" style={{ color: primaryColor }} />
//                       My Profile
//                     </NavDropdown.Item>
//                     <NavDropdown.Divider />
//                     <NavDropdown.Item 
//                       onClick={handleLogout} 
//                       className="dropdown-item-custom py-2"
//                       style={{ color: '#f56565' }}
//                     >
//                       <FaSignOutAlt className="me-2" />
//                       Logout
//                     </NavDropdown.Item>
//                   </div>
//                 </NavDropdown>
//               </>
//             ) : (
//               <>
//                 {/* Show these when not logged in */}
//                 <div className="d-flex align-items-center">
//                   <Link
//                     to="/login"
//                     className="btn-nav login-btn me-3"
//                     onClick={closeNavbar}
//                     style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       fontSize: '0.9rem',
//                       fontWeight: 500,
//                       color: primaryColor,
//                       backgroundColor: 'rgba(67, 97, 238, 0.1)',
//                       border: `1px solid ${primaryColor}`,
//                       borderRadius: '10px',
//                       padding: '0.5rem 1.2rem',
//                       transition: 'all 0.3s ease',
//                       textDecoration: 'none'
//                     }}
//                   >
//                     <FaSignInAlt className="me-2" />
//                     Sign In
//                   </Link>
                  
//                   <Link
//                     to="/signup"
//                     className="btn-nav signup-btn"
//                     onClick={closeNavbar}
//                     style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       fontSize: '0.9rem',
//                       fontWeight: 500,
//                       color: '#fff',
//                       background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
//                       border: 'none',
//                       borderRadius: '10px',
//                       padding: '0.6rem 1.2rem',
//                       boxShadow: '0 4px 12px rgba(67, 97, 238, 0.2)',
//                       transition: 'all 0.3s ease',
//                       textDecoration: 'none'
//                     }}
//                   >
//                     <FaUserPlus className="me-2" />
//                     Sign Up
//                   </Link>
//                 </div>
//               </>
//             )}
//           </Nav>
//         </BootstrapNavbar.Collapse>
//       </Container>

//       <style>{`
//         /* Custom hover effects */
//         .navbar-custom .nav-link-custom:hover {
//           background-color: rgba(67, 97, 238, 0.07);
//           transform: translateY(-2px);
//         }
        
//         .navbar-custom .nav-link-custom.active {
//           background-color: rgba(67, 97, 238, 0.1);
//           color: ${primaryColor} !important;
//           font-weight: 600;
//           transform: translateY(-2px);
//         }
        
//         .navbar-custom .nav-link-custom.active .nav-icon {
//           color: ${primaryColor};
//         }
        
//         /* Brand hover effect */
//         .navbar-custom .navbar-brand:hover .rounded-circle {
//           transform: scale(1.05) rotate(5deg);
//           box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
//         }
        
//         /* Buttons hover effects */
//         .btn-nav.login-btn:hover {
//           background-color: rgba(67, 97, 238, 0.15);
//           transform: translateY(-2px);
//           box-shadow: 0 4px 8px rgba(67, 97, 238, 0.1);
//         }
        
//         .btn-nav.signup-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 15px rgba(67, 97, 238, 0.3);
//           background: linear-gradient(135deg, #3a0ca3, #4361ee);
//         }
        
//         /* Dropdown styling */
//         .dropdown-custom .dropdown-menu {
//           border: none;
//           border-radius: 12px;
//           box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
//           padding: 0.5rem;
//           margin-top: 10px;
//           border: 1px solid rgba(67, 97, 238, 0.1);
//           overflow: hidden;
//         }
        
//         .dropdown-item-custom {
//           border-radius: 8px;
//           margin-bottom: 2px;
//           transition: all 0.2s ease;
//         }
        
//         .dropdown-item-custom:hover {
//           background-color: rgba(67, 97, 238, 0.07);
//         }
        
//         .dropdown-menu-animated {
//           transition: all 0.3s ease;
//           opacity: 0;
//           transform: translateY(-10px);
//         }
        
//         .dropdown-menu-animated.show-animation {
//           opacity: 1;
//           transform: translateY(0);
//         }
        
//         /* Divider styling */
//         .dropdown-divider {
//           margin: 0.3rem 0;
//           border-color: rgba(67, 97, 238, 0.1);
//         }
        
//         /* Toggle animation */
//         .navbar-toggler:focus {
//           box-shadow: none;
//         }
        
//         /* For mobile view */
//         @media (max-width: 991.98px) {
//           .navbar-custom .navbar-collapse {
//             background-color: rgba(255, 255, 255, 0.98);
//             border-radius: 12px;
//             box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
//             padding: 1rem;
//             margin-top: 0.5rem;
//             border: 1px solid rgba(67, 97, 238, 0.1);
//           }
          
//           .navbar-custom .nav-link-custom {
//             margin: 0.3rem 0;
//             padding: 0.7rem 1rem !important;
//           }
          
//           .btn-nav {
//             margin: 0.5rem 0;
//             width: 100%;
//             justify-content: center;
//           }
          
//           .login-btn {
//             margin-right: 0 !important;
//             margin-bottom: 0.5rem;
//           }
//         }
//       `}</style>
//     </BootstrapNavbar>
//   );
// };

// export default Navbar;