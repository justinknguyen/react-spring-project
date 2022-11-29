import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

export default function EditStudent() {
	const paperStyle = {
		padding: "50px 20px",
		width: 600,
		margin: "20px auto",
	};
	const [isError, setIsError] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [id, setId] = useState("");
	// const [fname, setFname] = useState("");
	// const [lname, setLname] = useState("");
	// const [uname, setUname] = useState("");
	const [oldPass, setOldPass] = useState("");
	const [newPass, setNewPass] = useState("");
	const student = useState("");

	const handleClick = (e) => {
		e.preventDefault();
		// student = { id, fname, lname, uname, pass };
		console.log(student);
		// TODO: send data to database
		fetch(
			"http://localhost:8080/api/v1/student/" +
				id +
				"/" +
				oldPass +
				"/" +
				newPass,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(student),
			}
		)
			.then(() => {
				console.log("New Student Added");
				setIsSubmitted(true);
				setIsError(false);
			})
			.catch(() => {
				console.log("Error");
				setIsError(true);
				setIsSubmitted(false);
			});
	};

	return (
		<Container>
			<Paper elevation={3} style={paperStyle}>
				<h1>Edit Student</h1>
				<p>Edit a student's information</p>

				<Box
					component="form"
					sx={{
						"& > :not(style)": {
							m: 1,
							width: 500,
							maxWidth: "100%",
						},
					}}
					noValidate
					autoComplete="off"
				>
					<p>Target:</p>
					<TextField
						id="outlined-basic"
						label="Student ID"
						variant="outlined"
						fullWidth
						value={id}
						onChange={(e) => setId(e.target.value)}
					/>
					<p>Edit:</p>
					{/* <TextField id="outlined-basic" label="Student ID" variant="outlined" fullWidth
      value = {id}
      onChange={(e)=>setId(e.target.value)}
      />
      <TextField id="outlined-basic" label="First Name" variant="outlined" fullWidth
      value = {fname}
      onChange={(e)=>setFname(e.target.value)}
      />
      <TextField id="outlined-basic" label="Last Name" variant="outlined" fullWidth
      value = {lname}
      onChange={(e)=>setLname(e.target.value)}
      />
      <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth
      value = {uname}
      onChange={(e)=>setUname(e.target.value)}
      /> */}
					<TextField
						id="outlined-basic"
						label="Old Password"
						variant="outlined"
						fullWidth
						value={oldPass}
						onChange={(e) => setOldPass(e.target.value)}
					/>
					<TextField
						id="outlined-basic"
						label="New Password"
						variant="outlined"
						fullWidth
						value={newPass}
						onChange={(e) => setNewPass(e.target.value)}
					/>

					<Button variant="contained" onClick={handleClick}>
						Submit
					</Button>
				</Box>
			</Paper>
			<Paper elevation={3} style={paperStyle}>
				<h1>Response</h1>
				{isSubmitted ? (
					<div>
						Password Changed
						{/* ID:{student.id}, First Name:{student.fname}, Last Name:
						{student.lname}, Username:{student.uname}, Password:
						{student.pass}, */}
					</div>
				) : (
					<div></div>
				)}
				{isError ? <div>Error. Please try again.</div> : <div></div>}
			</Paper>
		</Container>
	);
}
