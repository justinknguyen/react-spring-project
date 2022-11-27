import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

export default function AddStudent() {
	const paperStyle = {
		padding: "50px 20px",
		width: 600,
		margin: "20px auto",
	};
	const [isError, setIsError] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [id, setId] = useState("");
	const [uname, setUname] = useState("");
	const [pass, setPass] = useState("");

	const handleClick = (e) => {
		e.preventDefault();
		const student = {
			username: uname,
			password: pass,
			ucid: id,
			subjects: null,
		};
		console.log(student);
		// TODO: send data to database
		fetch("http://localhost:8080/api/v1/student", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(student),
		})
			.then(() => {
				console.log(student);
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
				<h1>Add Student</h1>
				<p>Add a student to the database</p>

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
					<TextField
						required
						id="outlined-required"
						label="UCID"
						variant="outlined"
						fullWidth
						value={id}
						onChange={(e) => setId(e.target.value)}
					/>
					<TextField
						required
						id="outlined-required"
						label="Username"
						variant="outlined"
						fullWidth
						value={uname}
						onChange={(e) => setUname(e.target.value)}
					/>
					<TextField
						required
						id="outlined-required"
						label="Password"
						variant="outlined"
						fullWidth
						value={pass}
						onChange={(e) => setPass(e.target.value)}
					/>
					<Button variant="contained" onClick={handleClick}>
						Submit
					</Button>
				</Box>
			</Paper>
			<Paper elevation={3} style={paperStyle}>
				<h1>Response</h1>
				{isSubmitted ? (
					<div>Student successfully added to database!</div>
				) : (
					<div></div>
				)}
				{isError ? <div>Error. Please try again.</div> : <div></div>}
			</Paper>
		</Container>
	);
}
