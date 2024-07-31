import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import './App.css';
import Registration from "./Components/Registration";
import Test from "./Components/Test";
import FileUpload from "./Components/FileUpload";
import Login from "./Components/Login";
import Batch from "./Components/Batch";
import Module from "./Components/Module";
import SubModules from "./Components/SubModules";
import Courses from "./Components/Courses";
import Lessons from "./Components/Lessons";
import Default from "./Components/DefaultPage";
import Layout from "./Components/Layout";
import Sidebar from "./Components/Sidebar";
import DefaultPage from "./Components/DefaultPage";
import Home from "./Components/Home";
import CreateCourse from "./Components/CreateCourse";
import CourseBuilder from "./Components/CourseBuilder";
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavbarComponent from "./Components/NavbarComponent";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/DefaultPage" element={<Layout><DefaultPage/></Layout>} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/FileUpload" element={<Layout><FileUpload /></Layout>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Batch" element={<Layout><Batch /></Layout>} />
          <Route path="/Module" element={<Layout><Module /></Layout>} />
          <Route path="/SubModules" element={<Layout><SubModules /></Layout>} />
          <Route path="/Courses" element={<Layout><Courses /></Layout>} />
          <Route path="/CreateCourse" element={<Layout><CreateCourse /></Layout>} />
          <Route path="/CourseBuilder" element={<Layout><CourseBuilder/></Layout>} />
          <Route path="/Lessons" element={<Layout><Lessons /></Layout>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
