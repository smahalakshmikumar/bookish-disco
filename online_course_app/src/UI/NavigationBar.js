import React, { useEffect } from "react";
import { Nav, Navbar, Form, FormControl } from "react-bootstrap";
import SelectedCourse from "../components/SelectedCourse/SelectedCourse.js";

export const NavigationBar = (props) => {
  return (
    <Navbar bg="primary" expand="lg" sticky="top" top="0" position="fixed">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Brand href="/">Let's Learn</Navbar.Brand>

      {!props.isLogin ? (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link style={{ color: "black", backgroundColor: "white" }}>
                Hello {props.userName}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/CourseList">List of Courses</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/SelectedCourse">Selected Course</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/MyCourses">My Courses</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/">Log Out</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      ) : null}
    </Navbar>
  );
};
export default NavigationBar;
