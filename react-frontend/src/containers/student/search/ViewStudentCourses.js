import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react';

export default function ViewStudentCourses() {
  const paperStyle = {padding:'50px 20px', width:600, margin:'20px auto'}
  const [courses,setCourses] = useState([])

  useEffect(()=>{
    fetch("http://localhost:8080/api/v1/course")
    .then(res=>res.json())
    .then(result=>{
      setCourses(result);
    })
  },[])

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
      <h1>Enrolled Courses</h1>
        {courses.map(course=>(
          <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}} key={course.id}>
            ID:{course.id},
            Name:{course.name},
            Capacity:{course.capacity}
          </Paper>
        ))}
      </Paper>
     
    </Container>
  );
}


