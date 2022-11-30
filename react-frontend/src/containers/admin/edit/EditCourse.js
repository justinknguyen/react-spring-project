import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";

export default function EditCourse() {
	const paperStyle = {
		padding: "50px 20px",
		width: 600,
		margin: "20px auto",
	};
	const [isError, setIsError] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [dept, setDept] = useState("");
	const [id, setId] = useState("");
	const [startdate, setStartdate] = useState(null);
	const [enddate, setEnddate] = useState(null);
	const [capacity, setCapacity] = useState("");
	const [newId, setNewId] = useState("");
	const [hasPrerequisite, setHasPrerequisite] = useState(false);

	const handleClick = (e) => {
		e.preventDefault();
		let query = "";
		query +=
			dept !== "" && newId !== ""
				? "newCourseName=" + dept + newId + "&"
				: "";
		query += capacity !== "" ? "capacity=" + capacity + "&" : "";
		query += "hasPrerequisite=" + hasPrerequisite + "&";
		query += startdate
			? "startTime=" +
			  new Date(startdate.$d).toISOString().substring(0, 10) +
			  "&"
			: "";
		query += enddate
			? "endTime=" +
			  new Date(enddate.$d).toISOString().substring(0, 10) +
			  "&"
			: "";
		console.log(query);
		// query +=
		fetch("http://localhost:8080/api/v1/course/" + id + "?" + query, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			// body: JSON.stringify({ newCourseName: dept + newId }),
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
				<h1>Edit Course</h1>
				<p>Edit a course's information</p>

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
						required
						id="outlined-required"
						label="Course ID (e.g., ENSF608)"
						variant="outlined"
						fullWidth
						value={id}
						onChange={(e) => setId(e.target.value)}
					/>
					<p>Edit:</p>
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
						value={newId}
						onChange={(e) => setNewId(e.target.value)}
					/>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							label="Start Date"
							value={startdate}
							onChange={(newDate) => setStartdate(newDate)}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							label="End Date"
							value={enddate}
							onChange={(newDate) => setEnddate(newDate)}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
					<TextField
						id="outlined-basic"
						label="Capacity"
						variant="outlined"
						fullWidth
						value={capacity}
						onChange={(e) => setCapacity(e.target.value)}
					/>

					<div>
						<span>Has Prerequiste?</span>
						<Checkbox
							label="hasPrerequisite"
							onChange={() =>
								setHasPrerequisite(!hasPrerequisite)
							}
						></Checkbox>
					</div>

					{/* <TextField
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
					/> */}

					<Button variant="contained" onClick={handleClick}>
						Submit
					</Button>
				</Box>
			</Paper>
			<Paper elevation={3} style={paperStyle}>
				<h1>Response</h1>
				{isSubmitted ? <div>worked</div> : <div></div>}
				{isError ? <div>Error. Please try again.</div> : <div></div>}
			</Paper>
		</Container>
	);
}
