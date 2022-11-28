import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { set } from "date-fns";
import { Checkbox } from "@mui/material";
import { Row } from "react-bootstrap";
// import { AdapterJalali } from "@mui/x-date-pickers/AdapterJalali";

export default function AddCourse() {
	const paperStyle = {
		padding: "50px 20px",
		width: 600,
		margin: "20px auto",
	};
	const [isError, setIsError] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [dept, setDept] = useState("");
	const [id, setId] = useState("");
	// const [name, setName] = useState("");
	const [p1, setP1] = useState("");
	const [p2, setP2] = useState("");
	const [p3, setP3] = useState("");
	const [startdate, setStartdate] = useState();
	const [capacity, setCapacity] = useState(0);
	const [hasPrerequisite, setHasPrerequisite] = useState(false);

	const handleClick = (e) => {
		e.preventDefault();
		const course = {
			name: dept + id,
			startTime: new Date(startdate.$d).toISOString().substring(0, 10),
			capacity: capacity,
			hasPrerequisite: hasPrerequisite,
		};
		console.log(course.starttime);

		fetch("http://localhost:8080/api/v1/course", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(course),
		})
			.then(() => {
				console.log("New Course Added");
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
				<h1>Add Course</h1>
				<p>Add a course to the database</p>

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
						label="Department (e.g., ENGG)"
						variant="outlined"
						fullWidth
						value={dept}
						onChange={(e) => setDept(e.target.value)}
					/>
					<TextField
						required
						id="outlined-required"
						label="Course ID (e.g., ENSF608)"
						variant="outlined"
						fullWidth
						value={id}
						onChange={(e) => setId(e.target.value)}
					/>

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							label="Start Date"
							value={startdate}
							onChange={(newDate) => setStartdate(newDate)}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
					{/* 
					<TextField
						required
						id="outlined-required"
						label="Max Students"
						variant="outlined"
						fullWidth
						value={capacity}
						onChange={(e) => setCapacity(e.target.value)}
					/> */}
					{/* <div style={{ flexDirection: Row }}>
						<span>Has Prerequiste?</span>
						<Checkbox
							label="hasPrerequisite"
							onChange={() =>
								setHasPrerequisite(!hasPrerequisite)
							}
						></Checkbox>
					</div> */}

					<p>Optional (course must exist in database)</p>
					<TextField
						id="outlined-basic"
						label="1. Prerequiste Course ID"
						variant="outlined"
						fullWidth
						value={p1}
						onChange={(e) => setP1(e.target.value)}
					/>

					<TextField
						id="outlined-basic"
						label="2. Prerequiste Course ID"
						variant="outlined"
						fullWidth
						value={p2}
						onChange={(e) => setP2(e.target.value)}
					/>

					<TextField
						id="outlined-basic"
						label="3. Prerequiste Course ID"
						variant="outlined"
						fullWidth
						value={p3}
						onChange={(e) => setP3(e.target.value)}
					/>

					<Button variant="contained" onClick={handleClick}>
						Submit
					</Button>
				</Box>
			</Paper>
			<Paper elevation={3} style={paperStyle}>
				<h1>Response</h1>
				{isSubmitted ? (
					<div>Course successfully added to database!</div>
				) : (
					<div></div>
				)}
				{isError ? <div>Error. Please try again.</div> : <div></div>}
			</Paper>
		</Container>
	);
}
