import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import fetchWithAuth from "./fetchWithAuth";
import CourseBuilder from "./CourseBuilder";

const CreateCourse = () => {
  const navigate = useNavigate();
  const API_URL = "https://localhost:7216/";
  const jwtToken = localStorage.getItem("token");

  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [maximumStudents, setMaximumStudents] = useState("");
  const [modules, setModules] = useState([]);
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (courseId) {
      fetchModules();
    }
  }, [courseId]);

  const fetchData = async () => {
    try {
      const response = await fetchWithAuth(`${API_URL}api/Course/GetCourseList`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data. Status: " + response.status);
      }
      const result = await response.json();
      const dataList = result.GetData || result.data || [];

      if (dataList.length > 0) {
        const latestCourse = dataList[dataList.length - 1];
        setCourseTitle(latestCourse.courseTitle);
        setCourseId(latestCourse.id);
      }
    } catch (error) {
      console.error("Error during data fetching:", error.message);
    }
  };

  // const fetchModules = async () => {
  //   if (!courseId) {
  //     console.error("Course ID is null, cannot fetch modules.");
  //     return;
  //   }

  //   try {
  //     const response = await fetchWithAuth(
  //       `${API_URL}api/Module/GetModuleListOfCourse/${courseId}`,
  //       {
  //         headers: { Authorization: `Bearer ${jwtToken}` },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch modules. Status: " + response.status);
  //     }
  //     const result = await response.json();
  //     setModules(result.modules || []);
  //   } catch (error) {
  //     console.error("Error fetching modules:", error);
  //   }
  // };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb3">
        <h1 className="mb-0">Create Course</h1>
        <Button variant="primary" onClick={handleBack}>
          Back
        </Button>
      </div>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h5>
              <b>Course Info</b>
            </h5>
          </Accordion.Header>
          <Accordion.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formCourseTitle">
                    <b>
                      <Form.Label>Course Title</Form.Label>
                    </b>
                    <Form.Control
                      type="text"
                      placeholder="Enter course title"
                      value={courseTitle}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formCourseDescription">
                    <b>
                      <Form.Label>Course Description</Form.Label>
                    </b>
                    <Form.Control
                      type="text"
                      placeholder="Enter course description"
                      value={courseDescription}
                      onChange={(e) => setCourseDescription(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formMaximumStudents">
                    <b>
                      <Form.Label>Maximum Students</Form.Label>
                    </b>
                    <Form.Control
                      type="text"
                      placeholder="Enter maximum students"
                      value={maximumStudents}
                      onChange={(e) => setMaximumStudents(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <h5>
              <b>Course Builder</b>
            </h5>
          </Accordion.Header>
          <Accordion.Body>
            <CourseBuilder />
            {modules.length > 0 && (
              <div>
                <h5>Modulessssss</h5>
                <Accordion defaultActiveKey={["0"]} alwaysOpen>
                  {modules.map((module, index) => (
                    <Accordion.Item key={index} eventKey={index.toString()}>
                      <Accordion.Header>
                        <b>{module.name}</b>
                      </Accordion.Header>
                      <Accordion.Body>{module.description}</Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            )}
            
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default CreateCourse;
  