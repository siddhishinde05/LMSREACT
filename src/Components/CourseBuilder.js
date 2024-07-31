import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Modal, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import fetchWithAuth from "./fetchWithAuth"; // Import the utility function
import Module from "./Module";
const CourseBuilder = () => {
  const navigate = useNavigate();
  const API_URL = "https://localhost:7216/";

  const [modules, setModules] = useState([]);



  return (
    <div>
      <Module/>
    </div>
  );
};

export default CourseBuilder;
