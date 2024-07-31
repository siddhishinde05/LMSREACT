import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../App.css";

const Home = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      {" "}
      <Container>
        <img src="../Images/TSMH Logo.png"/>
        <h1 href="#home">LMS</h1>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="right-align">
            <Button as={Link} to="/Registration" className="ml-auto">
              Registration
            </Button>
            <Button as={Link} to="/Login" className="ml-auto">
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Home;
