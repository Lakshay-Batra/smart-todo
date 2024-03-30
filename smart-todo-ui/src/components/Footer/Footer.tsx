import "./Footer.css";
import { Col, Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <footer className="footer position-fixed bottom-0 py-3">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-md-left text-center mb-md-0 mb-3">
            <a
              href="https://github.com/Lakshay-Batra"
              className="social-icon mr-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/batra-lakshay/"
              className="social-icon mr-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-linkedin"></i>
            </a>
            <a
              href="https://twitter.com/lakshay_batra_"
              className="social-icon mr-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-twitter"></i>
            </a>
            <a
              href="https://medium.com/@lakshay_33480"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-medium"></i>
            </a>
          </Col>
          <Col md={6} className="text-md-right text-center">
            <p className="mb-0">
              &copy; Lakshay Batra {new Date().getFullYear()}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
