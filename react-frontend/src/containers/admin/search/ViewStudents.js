import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { flexbox } from "@mui/system";

export default function ViewStudents() {
	const paperStyle = {
		padding: "50px 20px",
		width: 600,
		margin: "20px auto",
	};
	const [students, setStudents] = useState([]);
	const [sortedStudents, setSortedStudents] = useState([]);
	const [showSorted, setShowSorted] = useState(false);

	//From https://stackoverflow.com/questions/21131224/sorting-json-object-based-on-attribute
	function sortByKey(array, key) {
		return array.sort(function (a, b) {
			var x = Number(a[key]);
			var y = Number(b[key]);
			return x < y ? -1 : x > y ? 1 : 0;
		});
	}

	useEffect(() => {
		fetch("http://localhost:8080/api/v1/student")
			.then((res) => res.json())
			.then((result) => {
				setStudents(result);
				// Create deep copy and sort by ucid
				setSortedStudents(
					sortByKey(JSON.parse(JSON.stringify(result)), "ucid")
				);
			});
	}, []);

	function handleClick() {
		setShowSorted(!showSorted);
		console.log(showSorted);
		// console.log(students);
		// console.log(sortedStudents);
	}

	return (
		<Container>
			<Paper elevation={3} style={paperStyle}>
				<h1>
					Students
					<Button onClick={handleClick}>
						{showSorted ? "normal" : "sorted"}
					</Button>
				</h1>
				{showSorted
					? sortedStudents.map((student) => (
							<Paper
								elevation={6}
								style={{
									margin: "10px",
									padding: "15px",
									textAlign: "left",
								}}
								key={student.studentId}
							>
								UCID:{student.ucid}, Username:{student.username}
								, Password:{student.password} <br></br>
								Courses:{student.subjects}
							</Paper>
					  ))
					: students.map((student) => (
							<Paper
								elevation={6}
								style={{
									margin: "10px",
									padding: "15px",
									textAlign: "left",
								}}
								key={student.studentId}
							>
								UCID:{student.ucid}, Username:{student.username}
								, Password:{student.password} <br></br>
								Courses:{student.subjects}
							</Paper>
					  ))}
			</Paper>
		</Container>
	);
}
