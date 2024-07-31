import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import fetchWithAuth from "./fetchWithAuth";
import { Form, Button, Modal, Accordion } from "react-bootstrap";
import SubModules from "./SubModules";

const Module = () => {
  const navigate = useNavigate();
  const API_URL = "https://localhost:7216/";
  const jwtToken = localStorage.getItem("token");
  const [modules, setModules] = useState([]);
  const [moduleName, setModuleName] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editModuleIndex, setEditModuleIndex] = useState(null);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    const courseId = localStorage.getItem("createdCourseId");
    console.log("Fetching modules for courseId:", courseId);
    try {
      const response = await fetchWithAuth(
        `${API_URL}api/Module/GetModuleListOfCourse/${courseId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data. Status: " + response.status);
      }

      const result = await response.json();
      console.log("Fetched modules:", result.data);
      setModules(result.data || []);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const currentDate = new Date().toISOString();
    const courseId = localStorage.getItem("createdCourseId");
    const data = {
      courseId: courseId,
      moduleName: moduleName,
      moduleDescription: moduleDescription,
      createdOn: currentDate,
      createdBy: 0,
      isDeleted: false,
    };

    try {
      console.log("jwtToken is: " + jwtToken);
      let response;
      if (editModuleIndex !== null) {
        const moduleId = modules[editModuleIndex].id;
        response = await fetchWithAuth(
          `${API_URL}api/Module/UpdateModule/${moduleId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
      } else {
        // Create new module
        response = await fetchWithAuth(API_URL + "api/Module/AddModule", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Module saved successfully");
        localStorage.setItem("createdModuleId", result.data.moduleId);
        if (editModuleIndex !== null) {
          const updatedModules = [...modules];
          updatedModules[editModuleIndex] = {
            ...modules[editModuleIndex],
            ...data,
          };
          setModules(updatedModules);
        } else {
          // Add the new module to the state
          const newModule = {
            id: result.id, // Assuming result contains the newly created module's ID
            moduleName: moduleName,
            description: moduleDescription,
          };
          setModules((prevModules) => [...prevModules, newModule]);
        }

        setModuleName("");
        setModuleDescription("");
        setShowModal(false);
        setEditModuleIndex(null);
      } else {
        const errorText = await response.text();
        console.error(
          "Save failed:",
          response.status,
          response.statusText,
          errorText
        );
        alert(`Save failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error during save:", error);
    }
  };

  const handleEdit = (index) => {
    const moduleToEdit = modules[index];
    setModuleName(moduleToEdit.moduleName); // Set moduleName to current value
    setModuleDescription(moduleToEdit.description); // Set description to current value
    setEditModuleIndex(index);
    setShowModal(true);
  };

  return (
    <div className="container">
      <div className="d-flex flex-column">
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          {modules.map((module, index) => (
            <Accordion.Item key={index} eventKey={index.toString()}>
              <Accordion.Header>
                <h5>
                  <b>{module.moduleName}</b>&nbsp;
                  <i
                    className="bi bi-pencil-square float-end"
                    onClick={() => handleEdit(index)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </h5>
              </Accordion.Header>
              <Accordion.Body>
                <p>{module.description}</p>
                <SubModules />
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
      <br />
      <Button
        variant="primary"
        type="button"
        className="left-align"
        onClick={() => {
          setShowModal(true);
          setEditModuleIndex(null); // Clear edit state to ensure new module creation
        }}
      >
        Create Module <i className="bi bi-plus"></i>
      </Button>
      &nbsp;
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editModuleIndex !== null ? "Edit Module" : "Create Module"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formModuleName">
              <b>
                <Form.Label>Module Name</Form.Label>
              </b>
              <Form.Control
                type="text"
                placeholder="Enter Module Name"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCourseDescription">
              <b>
                <Form.Label>Module Description</Form.Label>
              </b>
              <Form.Control
                type="text"
                placeholder="Enter module description"
                value={moduleDescription}
                onChange={(e) => setModuleDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editModuleIndex !== null ? "Save Changes" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Module;
