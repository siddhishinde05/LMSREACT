import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar2 from "./Navbar2";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const API_URL = "https://localhost:7216/";

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const emailIdRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailIds = emailIdRef.current.value;
    const passwords = passwordRef.current.value;
    const data = {
      emailId: emailIds,
      password: passwords,
    };

    console.log("Data is:", data);

    try {
      const response = await fetch(API_URL + "api/Authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();

        localStorage.setItem("token", result.token);
        localStorage.setItem("userid", result.data.userId);
        localStorage.setItem("roleid", result.data.roleId);
        localStorage.setItem(
          "profilepictureurl",
          result.data.profilePictureURL
        );

        alert("Login successful!");
        navigate("/DefaultPage");
      } else {
        const errorText = await response.text();
        console.error(
          "Login failed with status:",
          response.status,
          "and message:",
          errorText
        );
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <div>
      <Navbar2 />
      <div className="container">
        <div className="header">
          <h1 className="text-center">Login</h1>
          <hr />
          <div className="row mb-3">
            <div className="col-md-6 offset-sm-3">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <b>
                    <Form.Label>Email address</Form.Label>
                  </b>
                  <Form.Control
                    ref={emailIdRef}
                    type="text"
                    placeholder="Enter email"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mt-3">
                  <b>
                    <Form.Label>Password</Form.Label>
                  </b>
                  <Form.Control
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <center>
                  <Button
                    variant="primary"
                    type="Login"
                    className="mt-3"
                    onClick={handleSubmit}
                  >
                    Login
                  </Button>
                  &nbsp;&nbsp;
                  <Button variant="danger" type="Cancel" className="mt-3">
                    Cancel
                  </Button>{" "}
                  <br />
                  <br />
                  <span>
                  Not Registered yet?
                  &nbsp;
                    <Link to="/Registration" style={{ color: "#022E77" }}>
                      Register
                    </Link>
                  </span>
                </center>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
