import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { Form, Button, Table, Modal } from "react-bootstrap";
const Navbar2 = () => {
    return (
      <Navbar expand="lg" className="bg-custom-color-nav">
        <Container>
          <h1>LMS</h1>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">{/* Add any other Nav Links here */}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };
  
  export default Navbar2;
  