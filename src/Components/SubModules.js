import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import fetchWithAuth from "./fetchWithAuth";
import { Link } from "react-router-dom";
import { Form, Button, Modal, Accordion } from "react-bootstrap";
import Lessons from "./Lessons";

const SubModules = () => {
  const navigate = useNavigate();
  const API_URL = "https://localhost:7216/";
  const jwtToken = localStorage.getItem("token");
  const [subModules, setSubModules] = useState([]);
  const [moduleId, setModuleId] = useState("");
  const [subModuleName, setSubModuleName] = useState("");
  const [subModuleDescription, setSubModuleDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showLessonsModal, setShowLessonsModal] = useState(false);
  const [editSubModuleIndex, setEditSubModuleIndex] = useState(null);

  const subModuleNameRef = useRef(null);
  const subModuleDescriptionRef = useRef(null);

  useEffect(() => {
    const storedModuleId = localStorage.getItem("createdModuleId");
    setModuleId(storedModuleId);
    if (storedModuleId) {
      fetchSubModules(storedModuleId);
    }
  }, []);

  const fetchSubModules = async (moduleId) => {
    console.log("Fetching sub modules for moduleId:", moduleId);

    if (!moduleId) {
      console.error("No moduleId found in localStorage.");
      alert("No moduleId found. Please select a module first.");
      return;
    }

    try {
      const response = await fetchWithAuth(
        `${API_URL}api/SubModule/GetSubModuleListOfModule/${moduleId}`,
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
      console.log("Fetched sub modules:", result.data);
      setSubModules(result.data || []);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const currentDate = new Date().toISOString();
    const moduleId = parseInt(localStorage.getItem("createdModuleId"), 10);
    const subModuleNames = subModuleNameRef.current.value;
    const subModuleDescriptions = subModuleDescriptionRef.current.value;
 
    const data = {
      moduleId: moduleId,
      subModuleName: subModuleNames,
      subModuleDescription: subModuleDescriptions,
      createdOn: currentDate,
      createdBy: 0,
      isDeleted: true,
    };

    try {
      let response;
      if (editSubModuleIndex !== null) {
        const subModuleId = subModules[editSubModuleIndex].id;
        response = await fetchWithAuth(`${API_URL}api/SubModule/${subModuleId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetchWithAuth(`${API_URL}api/SubModule/AddSubModule`, {
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
        alert(result.message || "Sub module saved successfully");

        if (editSubModuleIndex !== null) {
          const updatedSubModules = [...subModules];
          updatedSubModules[editSubModuleIndex] = {
            ...subModules[editSubModuleIndex],
            ...data,
          };
          setSubModules(updatedSubModules);
        } else {
          setSubModules((prevSubModules) => [
            ...prevSubModules,
            {
              id: result.id, // Assuming result contains the newly created module's ID
              name: subModuleNames,
              description: subModuleDescriptions,
            },
          ]);
        }
        setModuleId("");
        setSubModuleName("");
        setSubModuleDescription("");
        setShowModal(false);
        setEditSubModuleIndex(null);
      } else {
        const errorText = await response.text();
        console.error(`Save failed: ${response.status} ${response.statusText}`);
        console.error("Response text:", errorText);
        alert(`Save failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error during save:", error);
    }
  };

  const handleEdit = (index) => {
    const subModuleToEdit = subModules[index];
    setSubModuleName(subModuleToEdit.subModuleName);
    setSubModuleDescription(subModuleToEdit.subModuleDescription);
    setEditSubModuleIndex(index);
    setShowModal(true);
  };

  return (
    <div className="container">
      <div className="d-flex flex-column">
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          {subModules.map((subModule, index) => (
            <Accordion.Item key={index} eventKey={index.toString()}>
              <Accordion.Header>
                <h5>
                  <b>{subModule.name}</b>
                  <i
                    className="bi bi-pencil-square float-end"
                    onClick={() => handleEdit(index)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </h5>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  {subModule.description}
                  <br />
                  <br />
                  <Button
                    variant="success"
                    type="button"
                    className="left-align"
                    onClick={() => setShowLessonsModal(true)}
                  >
                    Lessons +
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    variant="success"
                    type="button"
                    className="left-align"
                  >
                    Quiz +
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    variant="success"
                    type="button"
                    className="left-align"
                  >
                    Assignment +
                  </Button>
                </p>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

        <div className="row">
          <div className="col-auto">
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Add Sub-Module
            </Button>
          </div>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Sub-Module</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row mb-3">
              <div className="col-md-12">
                <b>
                  <Form.Label>Sub-Module Name</Form.Label>
                </b>
                <input
                  ref={subModuleNameRef}
                  type="text"
                  className="form-control"
                  placeholder="Sub-Module Name"
                  value={subModuleName}
                  onChange={(e) => setSubModuleName(e.target.value)}
                />
                <br />
                <b>
                  <Form.Label>Sub-Module Description</Form.Label>
                </b>
                <input
                  ref={subModuleDescriptionRef}
                  type="text"
                  className="form-control"
                  placeholder="Sub-Module Description"
                  value={subModuleDescription}
                  onChange={(e) => setSubModuleDescription(e.target.value)}
                />
                <br />
                <center>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-3"
                    onClick={handleSave}
                  >
                    Submit
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    variant="danger"
                    type="button"
                    className="mt-3"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                </center>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Lessons
          show={showLessonsModal}
          handleClose={() => setShowLessonsModal(false)}
        />
      </div>
    </div>
  );
};

export default SubModules;
