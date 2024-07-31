import React from "react";
import Sidebar from "./Sidebar";
import NavbarComponent from "./NavbarComponent";
import { Form, Button, Table, Modal } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <NavbarComponent />

      <div style={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />
        <div
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1, // This will make the div take the remaining space
            padding: "20px", // Optional: to add some spacing inside the content area
            overflow: "auto", // Ensures that the content area is scrollable if it overflows
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
