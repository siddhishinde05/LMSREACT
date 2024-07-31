import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "/SiddhiProjects/LmsFrontend/lmsfrontend/src/App.css";

const Sidebar = () => {
  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-custom-color">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li className="nav-item">
            <Link to="/DefaultPage" className="nav-link align-middle px-0">
              <h6>
                <i className="bi bi-house fs-4"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Home</span>
              </h6>
            </Link>
          </li>

          {/* <li className="nav-item">
                <Link to="/Registration" className="nav-link px-0 align-middle">
                  <h6>
                    <i className="bi bi-box-arrow-in-right fs-5"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">Registration</span>
                  </h6>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Login" className="nav-link px-0 align-middle">
                  <h6>
                    <i className="bi bi-box-arrow-in-right fs-5"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">Login</span>
                  </h6>
                </Link>
              </li> */}
          <li className="nav-item">
            <Link to="/Courses" className="nav-link px-0 align-middle">
              <h6>
                <i className="bi bi-mortarboard fs-5"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Courses</span>
              </h6>{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Batch" className="nav-link align-middle px-0">
              <h6>
                <i className="bi bi-calendar2-check fs-5"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Batch</span>
              </h6>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/Module" className="nav-link px-0 align-middle">
              <h6>
                <i className="bi bi-journal-bookmark fs-5"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Module</span>
              </h6>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/SubModules" className="nav-link px-0 align-middle">
              <h6>
                <i className="bi bi-journal-check fs-5"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Sub-Module</span>
              </h6>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Lessons" className="nav-link px-0 align-middle">
              <h6>
                <i className="bi bi-blockquote-left fs-4"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Lessons</span>
              </h6>
            </Link>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default Sidebar;
