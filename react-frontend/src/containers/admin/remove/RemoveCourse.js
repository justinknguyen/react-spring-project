import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function RemoveCourse() {
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
		const course = { id };
		console.log(id);
		// TODO: send data to database
		fetch("http://localhost:8080/api/v1/course/" + id, {
			// mode: "no-cors",
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			// body:JSON.stringify(course)
		})
			.then((response) => {
				console.log(response);
				setIsSubmitted(true);
				setIsError(false);
			})
			.catch((e) => {
				console.log(e);
				setIsError(true);
				setIsSubmitted(false);
			});
	};

	return (
		<Container>
			<Paper elevation={3} style={paperStyle}>
				<h1>Remove Course</h1>
				<p>Remove a course from the database</p>

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
						label="Course Name (e.g., ENSF608)"
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
					<div>Course successfully removed from database!</div>
				) : (
					<div></div>
				)}
				{isError ? <div>Error. Please try again.</div> : <div></div>}
			</Paper>
		</Container>
	);
}
