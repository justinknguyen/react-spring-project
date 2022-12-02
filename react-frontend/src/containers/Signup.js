import React, { useState, useEffect } from "react";
import { useAppContext } from "../lib/contextLib";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import "./Signup.css";

export default function Signup() {
  const nav = useNavigate();

  // React States
  const [isError, setIsError] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { userHasAuthenticated } = useAppContext();

  const [userDB, setUserDB] = useState();

  const errors = {
    uname: "email address already exists",
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

      var { uname, pass, nme, addr } = document.forms[0];

      // Find user login info
      const userData = userDB?.find((user) => user.email === uname.value);

      // Compare user info
      if (userData) {
        // Email found
        setErrorMessages({ name: "uname", message: errors.uname });
        console.log("Error. Email Address Exists.");
      } else {
        // Email not found
        const newUser = {
          email: uname.value,
          password: pass.value,
          name: nme.value,
          address: addr.value
        };
        console.log(newUser);
        fetch("http://localhost:8080/api/v1/registereduser/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then(() => {
            console.log(newUser);
            console.log("New User Added");
            setIsSubmitted(true);
            setIsError(false);
          })
          .catch(() => {
            console.log("Error");
            setIsError(true);
            setIsSubmitted(false);
          });
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
        <div className="input-container">
          <label>Name </label>
          <input type="text" name="nme" required />
          {renderErrorMessage("nme")}
        </div>
        <div className="input-container">
          <label>Address </label>
          <input type="text" name="addr" required />
          {renderErrorMessage("addr")}
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
        <div className="title">Sign Up</div>
        {isSubmitted ? <div>You've successfully signed up! Please login.</div> : renderForm}
      </div>
    </div>
  );
}