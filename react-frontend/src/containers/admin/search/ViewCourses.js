import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

export default function ViewCourses() {
	const paperStyle = {
		padding: "50px 20px",
		width: 600,
		margin: "20px auto",
	};
	const [courses, setCourses] = useState([]);
	const [sortedCourses, setSortedCourses] = useState([]);
	const [showSorted, setShowSorted] = useState(false);

	//From https://stackoverflow.com/questions/21131224/sorting-json-object-based-on-attribute
	function sortByKey(array, key) {
		return array.sort(function (a, b) {
			var x = Number(a[key].slice(4));
			var y = Number(b[key].slice(4));
			return x < y ? -1 : x > y ? 1 : 0;
		});
	}

	function handleClick() {
		setShowSorted(!showSorted);
		console.log(sortedCourses);
	}

	useEffect(() => {
		fetch("http://localhost:8080/api/v1/course")
			.then((res) => res.json())
			.then((result) => {
				setCourses(result);
				setSortedCourses(
					sortByKey(JSON.parse(JSON.stringify(result)), "name")
				);
			});
	}, []);

	return (
		<Container>
			<Paper elevation={3} style={paperStyle}>
				<h1>
					Courses
					<Button onClick={handleClick}>
						{showSorted ? "normal" : "sorted"}
					</Button>
				</h1>
				{showSorted
					? sortedCourses.map((course) => (
							<Paper
								elevation={6}
								style={{
									margin: "10px",
									padding: "15px",
									textAlign: "left",
								}}
								key={course.courseId}
							>
								Name:{course.name}, Capacity:
								{course.capacity} <br></br>
								Start Time:{course.startTime}, End Time:
								{course.endTime} <br></br>
								Has Prerequisite:
								{course.hasPrerequisite ? "yes" : "no"},{" "}
								<br></br>
								Enrolled Students:
								{course.enrolledStudents.map((student) => {
									return <span>{student.username}, </span>;
								})}
							</Paper>
					  ))
					: courses.map((course) => (
							<Paper
								elevation={6}
								style={{
									margin: "10px",
									padding: "15px",
									textAlign: "left",
								}}
								key={course.courseId}
							>
								Name:{course.name}, Capacity:
								{course.capacity} <br></br>
								Start Time:{course.startTime}, End Time:
								{course.endTime} <br></br>
								Has Prerequisite:
								{course.hasPrerequisite ? "yes" : "no"},{" "}
								<br></br>
								Enrolled Students:
								{course.enrolledStudents.map((student) => {
									return <span>{student.username}, </span>;
								})}
							</Paper>
					  ))}
			</Paper>
		</Container>
	);
}
