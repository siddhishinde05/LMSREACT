import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";

const Lessons = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const API_URL = "https://localhost:7216/";

  const [subModuleId, setSubModuleId] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonType, setLessonType] = useState("");
  const [exerciseOrInfoFile, setExerciseOrInfoFile] = useState("");

  const subModuleIdRef = useRef(null);
  const lessonTitleRef = useRef(null);
  const lessonDescriptionRef = useRef(null);
  const lessonTypeRef = useRef(null);
  const exerciseOrInfoFileRef = useRef(null);

  const handleSave = async (event) => {
    event.preventDefault();
    const subModuleIds = subModuleIdRef.current.value;
    const lessonTitles = lessonTitleRef.current.value;
    const lessonDescriptions = lessonDescriptionRef.current.value;
    const lessonTypes = lessonTypeRef.current.value;
    const exerciseOrInfoFiles = exerciseOrInfoFileRef.current.value;
    const currentDate = new Date().toISOString();
    const data = {
      subModuleId: subModuleIds,
      lessonTitle: lessonTitles,
      lessonDescription: lessonDescriptions,
      lessonType: lessonTypes,
      exerciseOrInfoFile: exerciseOrInfoFiles,
      createdOn: currentDate,
      createdBy: 0,
      isDeleted: false,
    };

    try {
      const response = await fetch(API_URL + "api/Lesson", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result);
        handleClose(); // Close the modal on success
      } else {
        const errorText = await response.text();
        alert(`Save failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error during save:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="md">
      <Modal.Header closeButton>
        <Modal.Title>Lessons</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mb-3">
          <div>
            <b>
              <Form.Label>Sub Module Id</Form.Label>
            </b>
            <input
              ref={subModuleIdRef}
              type="text"
              className="form-control"
              placeholder="Sub Module Id"
              value={subModuleId}
              onChange={(e) => setSubModuleId(e.target.value)}
            />
            <br />
            <b>
              <Form.Label>Lesson Title</Form.Label>
            </b>
            <input
              ref={lessonTitleRef}
              type="text"
              className="form-control"
              placeholder="Lesson Title"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
            />
            <br />
            <b>
              <Form.Label>Lesson Description</Form.Label>
            </b>
            <input
              ref={lessonDescriptionRef}
              type="text"
              className="form-control"
              placeholder="Lesson Description"
              value={lessonDescription}
              onChange={(e) => setLessonDescription(e.target.value)}
            />
            <br />
            <b>
              <Form.Label>Video Sourse</Form.Label>
            </b>
            <select
              ref={lessonTypeRef}
              className="form-control"
              value={lessonType}
              onChange={(e) => setLessonType(e.target.value)}
            >
              <option value="">Select Lesson Type</option>
              <option value="youtube">YouTube</option>
              <option value="vimeo">Vimeo</option>
            </select>
            <br />
            <b>
              <Form.Label>Exercise Or Info File</Form.Label>
            </b>
            <input
              ref={exerciseOrInfoFileRef}
              type="text"
              className="form-control"
              placeholder="Exercise Or Info File"
              value={exerciseOrInfoFile}
              onChange={(e) => setExerciseOrInfoFile(e.target.value)}
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
                onClick={handleClose}
              >
                Cancel
              </Button>
            </center>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Lessons;
