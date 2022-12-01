import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

function Navbar_({ loginCheck, setLoginCheck }) {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("jwtoken");
    window.alert("Logged Out");
    setLoginCheck(false);
    navigate("/");
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Hotels.com</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              {loginCheck ? (
                <button onClick={Logout}>Log Out</button>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbar_;
