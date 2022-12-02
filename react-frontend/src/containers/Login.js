import React, { useState, useEffect } from "react";
import { useAppContext } from "../lib/contextLib";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import "./Login.css";
export var userInfo = undefined;

export default function Login() {
  const nav = useNavigate();

  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { userHasAuthenticated } = useAppContext();

  const [userDB, setUserDB] = useState();

  const errors = {
    uname: "invalid email address",
    pass: "invalid password"
  };

  useEffect(() => {
		// get registered users
    fetch("http://localhost:8080/api/v1/registereduser/all", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUserDB(data);
        })
        .catch(() => {
          console.log("Error");
        });
	}, []);

  const handleSubmit = (event) => {
      //Prevent page reload
      event.preventDefault();

      var { uname, pass } = document.forms[0];

      // Find user login info
      const userData = userDB?.find((user) => user.email === uname.value);

      // Compare user info
      if (userData) {
        if (userData.password !== pass.value) {
          // Invalid password
          setErrorMessages({ name: "pass", message: errors.pass });
          console.log("Error. Invalid Password.");
        } else {
          userInfo = userData;
          setIsSubmitted(true);
          userHasAuthenticated(true)
          nav("/react-spring-project/home");
        }
      } else {
        // Email not found
        setErrorMessages({ name: "uname", message: errors.uname });
        console.log("Error. Invalid Email.");
      }

  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
  );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Login</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}