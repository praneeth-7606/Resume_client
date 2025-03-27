import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import { useAuth } from '../context/authcontext';

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="hero-section py-5 bg-light" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">Resume Automation Tool</h1>
              <p className="lead mb-4">
                Create professional, tailored resumes in minutes using our AI-powered resume generator.
                Transform your career prospects with expertly crafted resumes for any job application.
              </p>
              
              {user ? (
                <Button 
                  as={Link} 
                  to="/resume-builder" 
                  variant="primary" 
                  size="lg" 
                  className="me-3"
                >
                  Start Building
                </Button>
              ) : (
                <div>
                  <Button 
                    as={Link} 
                    to="/signup" 
                    variant="primary" 
                    size="lg" 
                    className="me-3"
                  >
                    Get Started
                  </Button>
                  <Button 
                    as={Link} 
                    to="/login" 
                    variant="outline-primary" 
                    size="lg"
                  >
                    Sign In
                  </Button>
                </div>
              )}
            </Col>
            <Col lg={6}>
              {/* <img 
                src="/resume-preview.png" 
                alt="Resume Builder" 
                className="img-fluid rounded shadow-lg"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/600x400?text=Resume+Automation';
                }}
              /> */}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <div className="features-section py-5">
        <Container>
          <h2 className="text-center mb-5">Key Features</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-file-earmark-text fs-1 text-primary"></i>
                  </div>
                  <Card.Title>Professional Templates</Card.Title>
                  <Card.Text>
                    Choose from a variety of professionally designed resume templates 
                    that are tailored for different industries and career levels.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-lightning-charge fs-1 text-primary"></i>
                  </div>
                  <Card.Title>Quick Generation</Card.Title>
                  <Card.Text>
                    Generate tailored resumes in minutes, not hours. 
                    Our tool streamlines the resume creation process.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-person-check fs-1 text-primary"></i>
                  </div>
                  <Card.Title>Employee Profiles</Card.Title>
                  <Card.Text>
                    Manage multiple employee profiles and create customized 
                    resumes for different roles and projects.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Call to Action */}
      <div className="cta-section py-5 bg-primary text-white">
        <Container className="text-center">
          <h2 className="mb-4">Ready to build your professional resume?</h2>
          {user ? (
            <Button 
              as={Link} 
              to="/resume-builder" 
              variant="light" 
              size="lg"
            >
              Start Building Now
            </Button>
          ) : (
            <Button 
              as={Link} 
              to="/signup" 
              variant="light" 
              size="lg"
            >
              Create Your Free Account
            </Button>
          )}
        </Container>
      </div>
    </div>
  );
};

export default LandingPage;