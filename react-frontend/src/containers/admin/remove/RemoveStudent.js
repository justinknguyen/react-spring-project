import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

export default function RemoveStudent() {
	const paperStyle = {
		padding: "50px 20px",
		width: 600,
		margin: "20px auto",
	};
	const [isError, setIsError] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [id, setId] = useState("");

	const handleClick = (e) => {
		e.preventDefault();
		const student = { id };
		console.log(student);
		// TODO: send data to database
		fetch("http://localhost:8080/api/v1/student/" + id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			// body:JSON.stringify(student)
		})
			.then((response) => {
				console.log("Student Removed");
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
				<h1>Remove Student</h1>
				<p>Remove a student from the database</p>

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
						label="UCID (e.g., 30030377)"
						variant="outlined"
						fullWidth
						value={id}
						onChange={(e) => setId(e.target.value)}
					/>

					<Button variant="contained" onClick={handleClick}>
						Submit
					</Button>
				</Box>
			</Paper>
			<Paper elevation={3} style={paperStyle}>
				<h1>Response</h1>
				{isSubmitted ? (
					<div>Student successfully removed from database!</div>
				) : (
					<div></div>
				)}
				{isError ? <div>Error. Please try again.</div> : <div></div>}
			</Paper>
		</Container>
	);
}
