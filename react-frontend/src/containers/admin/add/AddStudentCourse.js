import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function AddStudentCourse() {
	const paperStyle = {
		padding: "50px 20px",
		width: 600,
		margin: "20px auto",
	};
	const [isError, setIsError] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [sid, setSid] = useState("");
	const [cid, setCid] = useState("");

	const handleClick = (e) => {
		e.preventDefault();
		// const studentcourse = { sid, cid };
		// console.log(studentcourse);
		// TODO: send data to database
		fetch(
			"http://localhost:8080/api/v1/course/" + cid + "/students/" + sid,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				// body:JSON.stringify(studentcourse)
			}
		)
			.then(() => {
				console.log("New Student Added to Course");
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
				<h1>Add Student to Course</h1>
				<p>Enroll a student in a course</p>

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
						label="Student ID"
						variant="outlined"
						fullWidth
						value={sid}
						onChange={(e) => setSid(e.target.value)}
					/>
					<TextField
						required
						id="outlined-required"
						label="Course ID (e.g., ENSF608)"
						variant="outlined"
						fullWidth
						value={cid}
						onChange={(e) => setCid(e.target.value)}
					/>

					<Button variant="contained" onClick={handleClick}>
						Submit
					</Button>
				</Box>
			</Paper>
			<Paper elevation={3} style={paperStyle}>
				<h1>Response</h1>
				{isSubmitted ? (
					<div>Student successfully added to course! </div>
				) : (
					<div></div>
				)}
				{isError ? <div>Error. Please try again.</div> : <div></div>}
			</Paper>
		</Container>
	);
}
