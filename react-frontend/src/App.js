import React, { useState } from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

import Routes from "./Routes";
import { AppContext } from "./lib/contextLib";
import { useNavigate } from "react-router-dom";

import "./App.css";

function App() {
  const nav = useNavigate();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isuserType, userType] = useState(false);

  function handleLogout() {
    userHasAuthenticated(false);
    nav("/react-spring-project/");
  }

  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/react-spring-project/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Student Registration
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
          {isAuthenticated ? ( 
            isuserType ? (
              <>
                <LinkContainer to="/react-spring-project/enroll">
                  <Nav.Link>Enroll</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/react-spring-project/courseview">
                  <Nav.Link>View Courses</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/react-spring-project/courseedit">
                  <Nav.Link>Edit Courses</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
              <LinkContainer to="/react-spring-project/enroll">
                  <Nav.Link>Add Student</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/react-spring-project/enroll">
                  <Nav.Link>Add Course</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/react-spring-project/courseview">
                  <Nav.Link>View Courses</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/react-spring-project/courseedit">
                  <Nav.Link>Edit Courses</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )
          ) : (
            <>
              <LinkContainer to="/react-spring-project/">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </>
          )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, 
                                    isuserType, userType}}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
