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
        {isAuthenticated ? (
          <LinkContainer to="/react-spring-project/home">
            <Navbar.Brand className="font-weight-bold text-muted">
              Student Registration
            </Navbar.Brand>
          </LinkContainer>
        ) : (
          <Navbar.Brand className="font-weight-bold text-muted">
              Student Registration
          </Navbar.Brand>
        )}
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
          {isAuthenticated ? ( 
            isuserType ? ( // student view
              <> 
                <LinkContainer to="/react-spring-project/studentsearch">
                  <Nav.Link>Search</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/react-spring-project/studentadd">
                  <Nav.Link>Add</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/react-spring-project/studentremove">
                  <Nav.Link>Remove</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/react-spring-project/account">
                  <Nav.Link>Account</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (  // admin view
              <>
                <LinkContainer to="/react-spring-project/adminsearch">
                  <Nav.Link>Search</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/react-spring-project/adminadd">
                  <Nav.Link>Add</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/react-spring-project/adminremove">
                  <Nav.Link>Remove</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/react-spring-project/adminedit">
                  <Nav.Link>Edit</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/react-spring-project/account">
                  <Nav.Link>Account</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )
          ) : (
            <>
            <LinkContainer to="/react-spring-project/signup">
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
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
