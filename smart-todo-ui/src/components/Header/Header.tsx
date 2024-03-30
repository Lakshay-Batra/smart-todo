import "./Header.css";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <Navbar bg="dark">
      <Navbar.Brand href="#" className="ms-4">
        <img src="images/brand-icon.png" alt="" height={50} width={50} />
      </Navbar.Brand>
      <div className="footnote-container">
        <span>| &nbsp; powered by OpenAI</span>
      </div>
    </Navbar>
  );
}

export default Header;
