import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./Navbar2";
import { Link } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const API_URL = "https://localhost:7216/";

  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [profilePicture, setProfilePicture] = useState(""); // State to hold the selected profile picture file

  const firstNameRef = useRef(null);
  const middleNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailIdRef = useRef(null);
  const passwordRef = useRef(null);
  const mobileNoRef = useRef(null);
  const profilePictureURLRef = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = async () => {
    const firstNames = firstNameRef.current.value;
    const middleNames = middleNameRef.current.value;
    const lastNames = lastNameRef.current.value;
    const emailIds = emailIdRef.current.value;
    const mobileNos = mobileNoRef.current.value;
    const passwords = passwordRef.current.value;
    //const profilePictureURLs = profilePictureURLRef.current.value;

    const currentDate = new Date().toISOString();

    const data = {
      firstName: firstNames,
      middleName: middleNames,
      lastName: lastNames,
      emailId: emailIds,
      mobileNo: mobileNos,
      password: passwords,
      roleId: 0,
      createdOn: currentDate,
      createdBy: 0,
      isDeleted: false,
      profilePicture: "/img/" + profilePicture,
      // ? await convertFileToBase64(profilePicture)
      // : null,
    };

    console.log("Data is: " + data.createdOn);
    try {
      const response = await fetch(API_URL + "api/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result); // Show success message
      } else {
        console.error("Save failed");
      }
    } catch (error) {
      console.error("Error during save:", error);
    }
  };

  // Function to convert file to base64 string
  //   const convertFileToBase64 = (file) => {
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => resolve(reader.result.split(",")[1]);
  //       reader.onerror = (error) => reject(error);
  //     });
  //   };
  // Function to handle file selection
  const handleFileChange = (e) => {
    // const file = e.target.files[0];
    // setProfilePicture(file);
    e.preventDefault();
    //console.log(`Selected file - ${e.target.files[0].name}`);
    setProfilePicture(`${e.target.files[0].name}`);
  };
  //console.log("profile pictu re is:" +profilePicture)
  return (
    <div>
      <Navbar2 />
      <div className="container">
        <div className="header">
          <h1 className="text-center">Registration</h1>
          <hr />
          <div className="row mb-3 offset-sm-3">
            <div className="col-md-4">
              <b>
                <Form.Label>First Name</Form.Label>
              </b>

              <input
                ref={firstNameRef}
                type="text"
                className="form-control"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <b>
                <Form.Label>Middle Name</Form.Label>
              </b>

              <input
                ref={middleNameRef}
                type="text"
                className="form-control"
                placeholder="Middle Name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3 offset-sm-3">
            <div className="col-md-4">
              <b>
                <Form.Label>Last Name</Form.Label>
              </b>

              <input
                ref={lastNameRef}
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <b>
                <Form.Label>Email Id</Form.Label>
              </b>

              <input
                ref={emailIdRef}
                type="text"
                className="form-control"
                placeholder="Email Id"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3 offset-sm-3">
            <div className="col-md-4">
              <b>
                <Form.Label>Mobile No.</Form.Label>
              </b>

              <input
                ref={mobileNoRef}
                type="text"
                className="form-control"
                placeholder="Mobile Number"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <b>
                <Form.Label>Password</Form.Label>
              </b>

              <input
                ref={passwordRef}
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row mb-3 offset-sm-3">
          <div className="col-md-4">
            <b>
              <Form.Label>File Upload</Form.Label>
            </b>

            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="col">
          <center>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSave}
            >
              Submit
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-danger" type="button">
              Cancel
            </button>{" "}
            <br />
            <br />
            <span>
              Already registered?&nbsp;
              <Link to="/login" style={{ color: "#022E77" }}>
                Login 
              </Link>
            </span>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Registration;
