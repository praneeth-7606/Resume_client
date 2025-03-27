import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';

import { Container } from 'react-bootstrap';

// Components
import ResumeTemplatesGallery from './components/upload_template';
import UploadSkillMatrix from './components/uploadskillmatrix';
import UploadResume from './components/uploadresume';
import GenerateResume from './components/generate_resume';
import EmployeeList from './components/search_employee';
import Navbar from './components/navbar';
import Login from './components/login';
import Signup from './components/signup';
import ForgotPassword from './components/forgotpassword';
import ResetPassword from './components/resetpassword';
import ProfilePage from './components/profile'; // Updated component name for clarity
import LandingPage from './components/landingpage';
import ProtectedRoute from './components/protectedroute';
import ChangePassword from './components/changepassword';
// import ChangePassword from './components/ChangePassword'; // Import the new ChangePassword component

// Auth Provider
import { AuthProvider, useAuth } from './context/authcontext';

// Main Resume Builder Component
function ResumeBuilder() {
  const [filePaths, setFilePaths] = useState({
    skillMatrix: '',
    resume: '',
    template: ''
  });

  const [fileInfo, setFileInfo] = useState({
    skillMatrix: '',
    resume: '',
    template: ''
  });

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState(1);
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Select Template', 'Upload Skills & Select Employee', 'Upload Resume', 'Generate'];

  useEffect(() => {
    setFadeIn(true);
    
    // Add scroll effect handler
    const header = document.querySelector('.fixed-header-container');
    const scrollThreshold = 50;
    
    function handleScroll() {
      if (header && window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else if (header) {
        header.classList.remove('scrolled');
      }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const progressPercentage = ((activeStep + 1) / steps.length) * 100;

  // Handle step changes with scrolling to top
  const handleStepChange = (newStep) => {
    setActiveStep(newStep);
    // Scroll to top on navigation
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const renderActiveComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <ResumeTemplatesGallery
            setFilePaths={setFilePaths}
            setFileInfo={setFileInfo}
            setSelectedTemplateId={setSelectedTemplateId}
          />
        );
      case 1:
        return (
          <>
            <UploadSkillMatrix
              setFilePaths={setFilePaths}
              setFileInfo={setFileInfo}
              fileInfo={fileInfo}
            />
            {filePaths.skillMatrix && (
              <div className="employee-list-container mt-4">
                <h4 className="section-subtitle">Select Employee</h4>
                <EmployeeList
                  selectedEmployee={selectedEmployee}
                  setSelectedEmployee={setSelectedEmployee}
                />
              </div>
            )}
          </>
        );
      case 2:
        return <UploadResume setFilePaths={setFilePaths} setFileInfo={setFileInfo} />;
      case 3:
        return (
          <GenerateResume
            filePaths={filePaths}
            fileInfo={fileInfo}
            selectedEmployee={selectedEmployee}
            setResult={setResult}
            setShowResult={setShowResult}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
            selectedTemplateId={selectedTemplateId}
            setSelectedTemplateId={setSelectedTemplateId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`app-container ${fadeIn ? 'fade-in' : ''}`}>
      <Container>
        <div className="fixed-header-container">
          <div className="card mb-5 shadow border-0 text-center">
            <div className="card-body">
              <h1 className="display-4 fw-bold mb-0">Resume Automation Tool</h1>
              <p className="lead mt-0">Create professional resumes in minutes</p>
              <div className="progress-tracker mt-2">
                <div className="progress-indicator">
                  <div className="custom-progress" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <div className="row justify-content-between">
                  {steps.map((step, index) => (
                    <div key={index} className="col text-center" onClick={() => handleStepChange(index)}>
                      <div className={`step-bubble ${activeStep >= index ? 'active' : ''}`}>{index + 1}</div>
                      <div className={`step-label ${activeStep === index ? 'current' : ''}`}>{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-content">
          <div className="card mb-4 shadow border-0 full-width-card">
            <div className="card-body">
              <h3 className="mb-3">{steps[activeStep]}</h3>
              <div className="horizontal-flow-container">{renderActiveComponent()}</div>
              <div className="d-flex justify-content-between mt-4">
                <button 
                  className="btn btn-secondary navigation-btn" 
                  onClick={() => handleStepChange(Math.max(0, activeStep - 1))}
                >
                  <i className="nav-icon prev-icon"></i> Previous
                </button>
                <button 
                  className="btn btn-primary navigation-btn" 
                  onClick={() => handleStepChange(Math.min(steps.length - 1, activeStep + 1))}
                >
                  Next <i className="nav-icon next-icon"></i>
                </button>
              </div>
            </div>
          </div>
          {showResult && (
            <div className="card mb-4 shadow border-0">
              <div className="card-body">
                <h3 className="mb-3">Generated Resume</h3>
                <div className="result-container">
                  <div className="resume-preview p-4 border rounded" dangerouslySetInnerHTML={{ __html: result }} />
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                    {/* Download and Print buttons commented out as in your original code */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <footer className="text-center py-4 mt-5">
          <p className="text-muted mb-0">
            <img src="/footer-logo-1.png" alt="Description" className="img-fluid" />
          </p>
        </footer>
      </Container>
    </div>
  );
}

// Main App component with routing
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <div className="content flex-grow-1" style={{ paddingTop: '76px' }}>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* Profile related routes - all protected */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              
              <Route path="/profile/change-password" element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              } />
              
              {/* Resume builder route */}
              <Route path="/resume-builder" element={
                <ProtectedRoute>
                  <ResumeBuilder />
                </ProtectedRoute>
              } />
              
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/landing" replace />} />
              
              {/* Catch-all route for 404 */}
              <Route path="*" element={
                <div className="container text-center py-5">
                  <h1>404 - Page Not Found</h1>
                  <p>The page you are looking for doesn't exist.</p>
                  <Link to="/" className="btn btn-primary">Go Home</Link>
                </div>
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
// import './App.css';

// import { Container } from 'react-bootstrap';

// // Components
// import ResumeTemplatesGallery from './components/upload_template';
// import UploadSkillMatrix from './components/uploadskillmatrix';
// import UploadResume from './components/uploadresume';
// import GenerateResume from './components/generate_resume';
// import EmployeeList from './components/search_employee';
// import Navbar from './components/navbar';
// import Login from './components/login';
// import Signup from './components/signup';
// import ForgotPassword from './components/forgotpassword'; // New component
// import ResetPassword from './components/resetpassword'; // New component
// import LandingPage from './components/landingpage';
// import ProtectedRoute from './components/protectedroute';
// import Profile from './components/profile';

// // Auth Provider
// import { AuthProvider, useAuth } from './context/authcontext';

// // Main Resume Builder Component
// function ResumeBuilder() {
//   const [filePaths, setFilePaths] = useState({
//     skillMatrix: '',
//     resume: '',
//     template: ''
//   });

//   const [fileInfo, setFileInfo] = useState({
//     skillMatrix: '',
//     resume: '',
//     template: ''
//   });

//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [selectedTemplateId, setSelectedTemplateId] = useState(1);
//   const [result, setResult] = useState('');
//   const [showResult, setShowResult] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [fadeIn, setFadeIn] = useState(false);
//   const [activeStep, setActiveStep] = useState(0);

//   const steps = ['Select Template', 'Upload Skills & Select Employee', 'Upload Resume', 'Generate'];

//   useEffect(() => {
//     setFadeIn(true);
    
//     // Add scroll effect handler
//     const header = document.querySelector('.fixed-header-container');
//     const scrollThreshold = 50;
    
//     function handleScroll() {
//       if (header && window.scrollY > scrollThreshold) {
//         header.classList.add('scrolled');
//       } else if (header) {
//         header.classList.remove('scrolled');
//       }
//     }
    
//     window.addEventListener('scroll', handleScroll);
//     handleScroll(); // Initial check
    
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const progressPercentage = ((activeStep + 1) / steps.length) * 100;

//   // Handle step changes with scrolling to top
//   const handleStepChange = (newStep) => {
//     setActiveStep(newStep);
//     // Scroll to top on navigation
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   };

//   const renderActiveComponent = () => {
//     switch (activeStep) {
//       case 0:
//         return (
//           <ResumeTemplatesGallery
//             setFilePaths={setFilePaths}
//             setFileInfo={setFileInfo}
//             setSelectedTemplateId={setSelectedTemplateId}
//           />
//         );
//       case 1:
//         return (
//           <>
//             <UploadSkillMatrix
//               setFilePaths={setFilePaths}
//               setFileInfo={setFileInfo}
//               fileInfo={fileInfo}
//             />
//             {filePaths.skillMatrix && (
//               <div className="employee-list-container mt-4">
//                 <h4 className="section-subtitle">Select Employee</h4>
//                 <EmployeeList
//                   selectedEmployee={selectedEmployee}
//                   setSelectedEmployee={setSelectedEmployee}
//                 />
//               </div>
//             )}
//           </>
//         );
//       case 2:
//         return <UploadResume setFilePaths={setFilePaths} setFileInfo={setFileInfo} />;
//       case 3:
//         return (
//           <GenerateResume
//             filePaths={filePaths}
//             fileInfo={fileInfo}
//             selectedEmployee={selectedEmployee}
//             setResult={setResult}
//             setShowResult={setShowResult}
//             isGenerating={isGenerating}
//             setIsGenerating={setIsGenerating}
//             selectedTemplateId={selectedTemplateId}
//             setSelectedTemplateId={setSelectedTemplateId}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={`app-container ${fadeIn ? 'fade-in' : ''}`}>
//       <Container>
//         <div className="fixed-header-container">
//           <div className="card mb-5 shadow border-0 text-center">
//             <div className="card-body">
//               <h1 className="display-4 fw-bold mb-0">Resume Automation Tool</h1>
//               <p className="lead mt-0">Create professional resumes in minutes</p>
//               <div className="progress-tracker mt-2">
//                 <div className="progress-indicator">
//                   <div className="custom-progress" style={{ width: `${progressPercentage}%` }}></div>
//                 </div>
//                 <div className="row justify-content-between">
//                   {steps.map((step, index) => (
//                     <div key={index} className="col text-center" onClick={() => handleStepChange(index)}>
//                       <div className={`step-bubble ${activeStep >= index ? 'active' : ''}`}>{index + 1}</div>
//                       <div className={`step-label ${activeStep === index ? 'current' : ''}`}>{step}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="main-content">
//           <div className="card mb-4 shadow border-0 full-width-card">
//             <div className="card-body">
//               <h3 className="mb-3">{steps[activeStep]}</h3>
//               <div className="horizontal-flow-container">{renderActiveComponent()}</div>
//               <div className="d-flex justify-content-between mt-4">
//                 <button 
//                   className="btn btn-secondary navigation-btn" 
//                   onClick={() => handleStepChange(Math.max(0, activeStep - 1))}
//                 >
//                   <i className="nav-icon prev-icon"></i> Previous
//                 </button>
//                 <button 
//                   className="btn btn-primary navigation-btn" 
//                   onClick={() => handleStepChange(Math.min(steps.length - 1, activeStep + 1))}
//                 >
//                   Next <i className="nav-icon next-icon"></i>
//                 </button>
//               </div>
//             </div>
//           </div>
//           {showResult && (
//             <div className="card mb-4 shadow border-0">
//               <div className="card-body">
//                 <h3 className="mb-3">Generated Resume</h3>
//                 <div className="result-container">
//                   <div className="resume-preview p-4 border rounded" dangerouslySetInnerHTML={{ __html: result }} />
//                   <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
//                     {/* Download and Print buttons commented out as in your original code */}
//                     {/* <button className="btn btn-primary me-md-2" onClick={() => {
//                       const blob = new Blob([result], { type: 'text/html' });
//                       const url = URL.createObjectURL(blob);
//                       const a = document.createElement('a');
//                       a.href = url;
//                       a.download = 'generated_resume.html';
//                       document.body.appendChild(a);
//                       a.click();
//                       document.body.removeChild(a);
//                     }}>
//                       Download HTML
//                     </button>
//                     <button className="btn btn-secondary" onClick={() => {
//                       const printWindow = window.open('', '_blank');
//                       printWindow.document.write(result);
//                       printWindow.document.close();
//                       printWindow.focus();
//                       printWindow.print();
//                     }}>
//                       Print Resume
//                     </button> */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         <footer className="text-center py-4 mt-5">
//           <p className="text-muted mb-0">
//             <img src="/footer-logo-1.png" alt="Description" className="img-fluid" />
//           </p>
//         </footer>
//       </Container>
//     </div>
//   );
// }

// // Main App component with routing
// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="d-flex flex-column min-vh-100">
//           <Navbar />
//           <div className="content flex-grow-1" style={{ paddingTop: '76px' }}>
//             <Routes>
//               {/* Public routes */}
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/landing" element={<LandingPage />} />
//               <Route path="/forgot-password" element={<ForgotPassword />} /> {/* New route */}
//               <Route path="/reset-password" element={<ResetPassword />} /> {/* New route */}
//               <Route path="/reset-password" element={<Profile />} /> {/* New route */}
              
//               {/* Protected routes */}
//               <Route path="/resume-builder" element={
//                 <ProtectedRoute>
//                   <ResumeBuilder />
//                 </ProtectedRoute>
//               } />
              
//               {/* Default redirect */}
//               <Route path="/" element={<Navigate to="/landing" replace />} />
              
//               {/* Catch-all route for 404 */}
//               <Route path="*" element={
//                 <div className="container text-center py-5">
//                   <h1>404 - Page Not Found</h1>
//                   <p>The page you are looking for doesn't exist.</p>
//                   <Link to="/" className="btn btn-primary">Go Home</Link>
//                 </div>
//               } />
//             </Routes>
//           </div>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;