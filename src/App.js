
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import ResumeTemplatesGallery from './components/upload_template';
// import UploadSkillMatrix from './components/uploadskillmatrix';
// import UploadResume from './components/uploadresume';
// import GenerateResume from './components/generate_resume';
// import EmployeeList from './components/search_employee';
// import { Container, Row, Col, Card } from 'react-bootstrap';

// function App() {
//   // State for file paths
//   const [filePaths, setFilePaths] = useState({
//     skillMatrix: '',
//     resume: '',
//     template: ''
//   });

//   // State for file info display
//   const [fileInfo, setFileInfo] = useState({
//     skillMatrix: '',
//     resume: '',
//     template: ''
//   });

//   // State for the selected employee
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
  
//   // State for the selected template ID
//   const [selectedTemplateId, setSelectedTemplateId] = useState(1); // Default to template 1
  
//   // State for generation results
//   const [result, setResult] = useState('');
//   const [showResult, setShowResult] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);

//   // State for UI animation
//   const [fadeIn, setFadeIn] = useState(false);
//   const [activeStep, setActiveStep] = useState(0);

//   // Trigger fade-in animation on component mount
//   useEffect(() => {
//     setFadeIn(true);
//   }, []);

//   // Auto-update active step based on filled information
//   useEffect(() => {
//     if (filePaths.template) {
//       setActiveStep(1);
//     }
//     if (filePaths.template && filePaths.skillMatrix) {
//       setActiveStep(2);
//     }
//     if (filePaths.template && filePaths.skillMatrix && (filePaths.resume || selectedEmployee)) {
//       setActiveStep(3);
//     }
//     if (filePaths.template && filePaths.skillMatrix && filePaths.resume && selectedEmployee) {
//       setActiveStep(4);
//     }
//     if (showResult) {
//       setActiveStep(5);
//     }
//   }, [filePaths, selectedEmployee, showResult]);

//   return (
//     <div className={`app-container ${fadeIn ? 'fade-in' : ''}`}>
//       <Container>
//         {/* Header */}
//         <Card className="mb-5 shadow border-0 text-center">
//           <Card.Body>
//             <h1 className="display-4 fw-bold mb-0">
//               Resume Automation Tool
//             </h1>
//             <p className="lead mt-2">Create professional resumes in minutes</p>
            
//             {/* Progress Tracker */}
//             <div className="progress-tracker mt-4">
//               <Row className="justify-content-center">
//                 {['Select Template', 'Upload Skills', 'Upload Resume', 'Generate'].map((step, index) => (
//                   <Col key={index} xs="auto" className="text-center">
//                     <div className={`progress-step ${activeStep >= index ? 'active' : ''}`}>
//                       <div className="step-number">{index + 1}</div>
//                       <div className="step-label">{step}</div>
//                     </div>
//                     {index < 3 && (
//                       <div className={`connector ${activeStep > index ? 'active' : ''}`}></div>
//                     )}
//                   </Col>
//                 ))}
//               </Row>
//             </div>
//           </Card.Body>
//         </Card>

//         {/* Main Content */}
//         <Row>
//           <Col lg={12}>
//             <div className="content-section mb-4">
//               <ResumeTemplatesGallery
//                 setFilePaths={setFilePaths}
//                 setFileInfo={setFileInfo}
//                 setSelectedTemplateId={setSelectedTemplateId}
//               />
//             </div>

//             <div className="content-section mb-4">
//               <UploadSkillMatrix
//                 setFilePaths={setFilePaths}
//                 setFileInfo={setFileInfo}
//                 fileInfo={fileInfo}
//               />
//             </div>

//             {/* Only show employee list if skill matrix is uploaded */}
//             {filePaths.skillMatrix && (
//               <div className="content-section mb-4">
//                 <EmployeeList
//                   selectedEmployee={selectedEmployee}
//                   setSelectedEmployee={setSelectedEmployee}
//                 />
//               </div>
//             )}

//             <div className="content-section mb-4">
//               <UploadResume
//                 setFilePaths={setFilePaths}
//                 setFileInfo={setFileInfo}
//               />
//             </div>

//             <div className="content-section mb-4">
//               <GenerateResume
//                 filePaths={filePaths}
//                 fileInfo={fileInfo}
//                 selectedEmployee={selectedEmployee}
//                 setResult={setResult}
//                 setShowResult={setShowResult}
//                 isGenerating={isGenerating}
//                 setIsGenerating={setIsGenerating}
//                 selectedTemplateId={selectedTemplateId}
//                 setSelectedTemplateId={setSelectedTemplateId}
//               />
//             </div>

//             {/* Results Section */}
//             {showResult && (
//               <Card className="mb-4 shadow border-0">
//                 <Card.Body>
//                   <h3 className="mb-3">Generated Resume</h3>
//                   <div className="result-container">
//                     <div className="resume-preview p-4 border rounded">
//                       <div dangerouslySetInnerHTML={{ __html: result }} />
//                     </div>
//                     <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
//                       {/* <button className="btn btn-primary me-md-2" onClick={() => {
//                         const blob = new Blob([result], { type: 'text/html' });
//                         const url = URL.createObjectURL(blob);
//                         const a = document.createElement('a');
//                         a.href = url;
//                         a.download = 'generated_resume.html';
//                         document.body.appendChild(a);
//                         a.click();
//                         document.body.removeChild(a);
//                       }}>
//                         Download HTML
//                       </button> */}
//                       {/* <button className="btn btn-secondary" onClick={() => {
//                         // Print functionality
//                         const printWindow = window.open('', '_blank');
//                         printWindow.document.write(result);
//                         printWindow.document.close();
//                         printWindow.focus();
//                         printWindow.print();
//                       }}>
//                         Print Resume
//                       </button> */}
//                     </div>
//                   </div>
//                 </Card.Body>
//               </Card>
//             )}
//           </Col>
//         </Row>
        
//         {/* Footer */}
//         <footer className="text-center py-4 mt-5">
//           {/* <p className="text-muted mb-0">   </p> */}
//           <p className="text-muted mb-0">
//   <img src="/footer-logo-1.png" alt="Description" className="img-fluid" />
// </p>

//         </footer>
//       </Container>
//     </div>
//   );
// }

// export default App;




import React, { useState, useEffect } from 'react';
import './App.css';
import ResumeTemplatesGallery from './components/upload_template';
import UploadSkillMatrix from './components/uploadskillmatrix';
import UploadResume from './components/uploadresume';
import GenerateResume from './components/generate_resume';
import EmployeeList from './components/search_employee';
import { Container, Row, Col, Card } from 'react-bootstrap';

function App() {
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
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
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
          <Card className="mb-5 shadow border-0 text-center">
            <Card.Body>
              <h1 className="display-4 fw-bold mb-0">Resume Automation Tool</h1>
              <p className="lead mt-0">Create professional resumes in minutes</p>
              <div className="progress-tracker mt-2">
                <div className="progress-indicator">
                  <div className="custom-progress" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <Row className="justify-content-between">
                  {steps.map((step, index) => (
                    <Col key={index} className="text-center" onClick={() => handleStepChange(index)}>
                      <div className={`step-bubble ${activeStep >= index ? 'active' : ''}`}>{index + 1}</div>
                      <div className={`step-label ${activeStep === index ? 'current' : ''}`}>{step}</div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="main-content">
          <Card className="mb-4 shadow border-0 full-width-card">
            <Card.Body>
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
            </Card.Body>
          </Card>
          {showResult && (
            <Card className="mb-4 shadow border-0">
              <Card.Body>
                <h3 className="mb-3">Generated Resume</h3>
                <div className="result-container">
                  <div className="resume-preview p-4 border rounded" dangerouslySetInnerHTML={{ __html: result }} />
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                    {/* <button className="btn btn-primary me-md-2" onClick={() => {
                      const blob = new Blob([result], { type: 'text/html' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'generated_resume.html';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    }}>
                      Download HTML
                    </button>
                    <button className="btn btn-secondary" onClick={() => {
                      const printWindow = window.open('', '_blank');
                      printWindow.document.write(result);
                      printWindow.document.close();
                      printWindow.focus();
                      printWindow.print();
                    }}>
                      Print Resume
                    </button> */}
                  </div>
                </div>
              </Card.Body>
            </Card>
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

export default App;

// import React, { useState, useEffect } from 'react';
// import './App.css';
// import ResumeTemplatesGallery from './components/upload_template';
// import UploadSkillMatrix from './components/uploadskillmatrix';
// import UploadResume from './components/uploadresume';
// import GenerateResume from './components/generate_resume';
// import EmployeeList from './components/search_employee';
// import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';

// function App() {
//   // State for file paths
//   const [filePaths, setFilePaths] = useState({
//     skillMatrix: '',
//     resume: '',
//     template: ''
//   });

//   // State for file info display
//   const [fileInfo, setFileInfo] = useState({
//     skillMatrix: '',
//     resume: '',
//     template: ''
//   });

//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [selectedTemplateId, setSelectedTemplateId] = useState(1); // Default to template 1
//   const [result, setResult] = useState('');
//   const [showResult, setShowResult] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [fadeIn, setFadeIn] = useState(false);
  
//   // State for active step and component display
//   const [activeStep, setActiveStep] = useState(0);
//   const steps = ['Select Template', 'Upload Skills & Select Employee', 'Upload Resume', 'Generate'];

//   // Trigger fade-in animation on component mount
//   useEffect(() => {
//     setFadeIn(true);
//   }, []);

//   // Calculate progress percentage - no auto-changing of steps
//   const progressPercentage = ((activeStep + 1) / steps.length) * 100;

//   // Determine which component to show based on activeStep
//   const renderActiveComponent = () => {
//     switch(activeStep) {
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
//         return (
//           <UploadResume
//             setFilePaths={setFilePaths}
//             setFileInfo={setFileInfo}
//           />
//         );
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
//         {/* Header */}
//         <Card className="mb-5 shadow border-0 text-center">
//           <Card.Body>
//             <h1 className="display-4 fw-bold mb-0">
//               Resume Automation Tool
//             </h1>
//             <p className="lead mt-2">Create professional resumes in minutes</p>
            
//             {/* Horizontal Progress Tracker */}
//             <div className="progress-tracker mt-4">
//               <div className="progress-indicator">
//                 <div className="custom-progress" style={{ width: `${progressPercentage}%` }}></div>
//               </div>
//               <Row className="justify-content-between">
//                 {steps.map((step, index) => (
//                   <Col key={index} className="text-center" onClick={() => setActiveStep(index)}>
//                     <div className={`step-bubble ${activeStep >= index ? 'active' : ''}`}>
//                       {index + 1}
//                     </div>
//                     <div className={`step-label ${activeStep === index ? 'current' : ''}`}>
//                       {step}
//                     </div>
//                   </Col>
//                 ))}
//               </Row>
//             </div>
//           </Card.Body>
//         </Card>

//         {/* Main Content - Horizontal Flow */}
//         <Card className="mb-4 shadow border-0 full-width-card">
//           <Card.Body>
//             <h3 className="mb-3">{steps[activeStep]}</h3>
//             <div className="horizontal-flow-container">
//               {renderActiveComponent()}
//             </div>
            
//             {/* Navigation Buttons */}
//             <div className="d-flex justify-content-between mt-4">
//               <button 
//                 className="btn btn-secondary navigation-btn" 
//                 onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
//               >
//                 <i className="nav-icon prev-icon"></i> Previous
//               </button>
//               <button 
//                 className="btn btn-primary navigation-btn" 
//                 onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
//               >
//                 Next <i className="nav-icon next-icon"></i>
//               </button>
//             </div>
//           </Card.Body>
//         </Card>

//         {/* Results Section */}
//         {showResult && (
//           <Card className="mb-4 shadow border-0">
//             <Card.Body>
//               <h3 className="mb-3">Generated Resume</h3>
//               <div className="result-container">
//                 <div className="resume-preview p-4 border rounded">
//                   <div dangerouslySetInnerHTML={{ __html: result }} />
//                 </div>
//                 <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
//                   <button className="btn btn-primary me-md-2" onClick={() => {
//                     const blob = new Blob([result], { type: 'text/html' });
//                     const url = URL.createObjectURL(blob);
//                     const a = document.createElement('a');
//                     a.href = url;
//                     a.download = 'generated_resume.html';
//                     document.body.appendChild(a);
//                     a.click();
//                     document.body.removeChild(a);
//                   }}>
//                     Download HTML
//                   </button>
//                   <button className="btn btn-secondary" onClick={() => {
//                     const printWindow = window.open('', '_blank');
//                     printWindow.document.write(result);
//                     printWindow.document.close();
//                     printWindow.focus();
//                     printWindow.print();
//                   }}>
//                     Print Resume
//                   </button>
//                 </div>
//               </div>
//             </Card.Body>
//           </Card>
//         )}
        
//         {/* Footer */}
//         <footer className="text-center py-4 mt-5">
//           <p className="text-muted mb-0">
//             <img src="/footer-logo-1.png" alt="Description" className="img-fluid" />
//           </p>
//         </footer>
//       </Container>
//     </div>
//   );
// }

// export default App;