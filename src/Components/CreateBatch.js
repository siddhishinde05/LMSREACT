import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Table, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import fetchWithAuth from "./fetchWithAuth"; // Import the utility function
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker CSS
import DatePicker from "react-datepicker";
import CreateBatch from "./CreateBatch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import CSS

const Batch = () => {
  const navigate = useNavigate();
  const API_URL = "https://localhost:7216/";

  const [batchName, setBatchName] = useState("");
  const [batchStartDate, setBatchStartDate] = useState(new Date());
  const [batchDuration, setBatchDuration] = useState("");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editBatchIndex, setEditBatchIndex] = useState(null);

  const batchNameRef = useRef(null);
  const batchDurationRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchWithAuth(API_URL + "api/Batch/GetBatch", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
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

  const handleEdit = (batch) => {
    console.log("Editing batch:", batch); 
    setBatchName(batch.batchName);
    setBatchStartDate(new Date(batch.batchStartDate));
    setBatchDuration(batch.batchDuration);
    setShowModal(true);
    setEditBatchIndex(batch.batchID);
    localStorage.setItem('createdBatchID', batch.batchID); // Store batchID
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    console.log("Updating batch with index:", editBatchIndex);

    const batchNames = batchNameRef.current.value;
    const batchDurations = batchDurationRef.current.value;
    const formattedBatchStartDate = batchStartDate.toISOString();
    const currentDate = new Date().toISOString();
    const batchID = localStorage.getItem('createdBatchID');

    if (!batchID) {
      console.error("Batch ID is missing. Cannot update batch.");
      return;
    }

    const data = {
      batchID: batchID,
      batchName: batchNames,
      batchStartDate: formattedBatchStartDate,
      batchDuration: batchDurations,
      createdOn: currentDate,
      createdBy: 0,
      isDeleted: false,
    };

    try {
      console.log("data: " + JSON.stringify(data));
      const response = await fetchWithAuth(API_URL + 'api/Batch', {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message || "Batch updated successfully!");
        fetchData();
        setShowModal(false);
      } else {
        const errorText = await response.text();
        console.error("Update failed:", response.status, response.statusText, errorText);
        toast.error(`Update failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error during update:", error);
      toast.error("Error during update: " + error.message);
    }
  };

  const handleDelete = async (batchId) => {
    console.log("Deleting batch with ID:", batchId);
    try {
      const response = await fetchWithAuth(`${API_URL}api/Batch?id=${batchId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        toast.success("Batch deleted successfully!");
        fetchData(); // Refresh data after delete
      } else {
        const errorText = await response.text();
        console.error(
          "Delete failed:",
          response.status,
          response.statusText,
          errorText
        );
        toast.error(`Delete failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error during delete:", error);
      toast.error("Error during delete: " + error.message);
    }
  };

  const confirmDelete = (batchID) => {
    console.log("Confirming delete for batch ID:", batchID);
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this batch?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(batchID),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <>
      <div className="container">
        <ToastContainer />
        <div className="header">
          <div className="d-flex justify-content-end">{<CreateBatch />}</div>
        </div>
        <div className="batch-list">
          <h2>
            <i className="bi bi-calendar2-check fs-1"></i>&nbsp;Batch Details
          </h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Batch Name</th>
                <th>Start Date</th>
                <th>Duration</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((batch, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{batch.batchName}</td>
                  <td>{batch.batchStartDate}</td>
                  <td>{batch.batchDuration}</td>
                  <td>
                    <Button
                      variant="success"
                      type="button"
                      onClick={() => handleEdit(batch)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      type="button"
                      onClick={() => confirmDelete(batch.batchId)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Batch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBatchName">
              <b>
                <Form.Label>Edit Batch Name</Form.Label>
              </b>
              <Form.Control
                type="text"
                placeholder="Enter Batch Name"
                ref={batchNameRef}
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBatchStartDate">
              <Form.Label>
                <b>Edit Batch Start Date</b>
              </Form.Label>
              <div className="row px-3">
                <DatePicker
                  selected={batchStartDate}
                  onChange={(date) => setBatchStartDate(date)}
                  dateFormat="yyyy-MM-dd HH:mm:ss.sss"
                  className="form-control"
                  placeholderText="Select Batch Start Date"
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formBatchDuration">
              <b>
                <Form.Label>Edit Batch Duration</Form.Label>
              </b>
              <Form.Control
                type="text"
                placeholder="Enter Batch Duration"
                ref={batchDurationRef}
                value={batchDuration}
                onChange={(e) => setBatchDuration(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Batch;
