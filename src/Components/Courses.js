import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Table, Row, Col, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import fetchWithAuth from "./fetchWithAuth";
import { Link } from "react-router-dom";
import Module from "./Module";
const Courses = ({ courseId }) => {
  const navigate = useNavigate();
  const API_URL = "https://localhost:7216/";

  const jwtToken = localStorage.getItem("token");
  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const courseTitleRef = useRef(null);
  const courseDescriptionRef = useRef(null);
  const maximumStudentsRef = useRef(null);
  const isCoverPhotoRef = useRef(null);
  const isCoverVideoRef = useRef(null);
  const coverDocURLRef = useRef(null);
  const isPaidRef = useRef(null);
  const courseDurationInHrsRef = useRef(null);
  const courseDurationInMinsRef = useRef(null);
  const materialsIncludedRef = useRef(null);
  const instructionsRef = useRef(null);
  const courseFacultiesRef = useRef(null);
  const brochureRef = useRef(null);
  const faqRef = useRef(null);
  const partnershipWithRef = useRef(null);
  const BatchRef = useRef(null);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const courseTitles = courseTitleRef.current.value;
    const courseDescriptions = courseDescriptionRef.current.value;

    const data = {
      courseTitle: courseTitles,
      courseDescription: courseDescriptions,
      createdOn: new Date().toISOString(),
      createdBy: 0,
    };

    try {
      const response = await fetchWithAuth(API_URL + "api/Course/AddCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("course id is: " + result.data.courseId);
        alert(result.message || "Course saved successfully!");
        console.log(result.data.courseId);
        localStorage.setItem("savedCourseTitle", courseTitles);
        localStorage.setItem("createdCourseId", result.data.courseId);
        fetchData();
        setShowModal(false);
        navigate("/CreateCourse");
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
  
  const fetchData = async () => {
    try {
      const response = await fetchWithAuth(
        API_URL + "api/Course/GetCourseList",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data. Status: " + response.status);
      }
      const result = await response.json();
      console.log("Fetched data:", result);
      setData(result.GetData || result.data || []);
    } catch (error) {
      console.error("Error during data fetching:", error.message);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="d-flex justify-content-end">
          {/* <Module courseId={courseId} /> */}
          <Button
            variant="primary"
            type="button"
            className="right-align"
            onClick={() => setShowModal(true)}
          >
            Create Course +
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="primary"
            type="button"
            as={Link}
            to="/CreateCourse"
            onClick={handleBack}
          >
            Back
          </Button>
        </div>
      </div>

      <div className="courses-list">
        <h2>
          <i className="bi bi-mortarboard fs-1"></i>&nbsp;Courses
        </h2>
        {/* <Form>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formCourseTitle">
                <b>
                  <Form.Label>Course Title</Form.Label>
                </b>
                <Form.Control
                  type="text"
                  placeholder="Enter course title"
                  ref={courseTitleRef} // Attach ref here
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
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
                  ref={courseDescriptionRef} // Attach ref here
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            variant="primary"
            type="button"
            className="center-align"
            onClick={handleSave}
          >
            Create Course +
          </Button>
        </Form> */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h2>Create Course</h2>
              {/* {editBatchIndex !== null ? "Edit Batch" : "Create Batch"} */}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCourseTitle">
                <b>
                  <Form.Label>Course Title</Form.Label>
                </b>
                <Form.Control
                  type="text"
                  placeholder="Enter course title"
                  ref={courseTitleRef} // Attach ref here
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formCourseDescription">
                <b>
                  <Form.Label>Course Description</Form.Label>
                </b>
                <Form.Control
                  type="text"
                  placeholder="Enter course description"
                  ref={courseDescriptionRef} // Attach ref here
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {/* {editBatchIndex !== null ? "Update" : "Save"} */}
              Create
            </Button>
          </Modal.Footer>
        </Modal>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Course Description</th>
              <th>Maximum Students</th>
              <th>Batch</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course) => (
              <tr key={course.courseID}>
                <td>{course.courseTitle}</td>
                <td>{course.courseDescription}</td>
                <td>{course.maximunStudents}</td>
                <td>{course.batch}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Courses;
