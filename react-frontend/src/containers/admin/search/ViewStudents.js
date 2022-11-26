import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react';

export default function ViewStudents() {
  const paperStyle = {padding:'50px 20px', width:600, margin:'20px auto'}
  const [students,setStudents] = useState([])

  useEffect(()=>{
    fetch("http://localhost:8080/api/v1/student")
    .then(res=>res.json())
    .then(result=>{
      setStudents(result);
    })
  },[])

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
      <h1>Students</h1>
        {students.map(student=>(
          <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}} key={student.id}>
            UCID:{student.ucid},
            Username:{student.username},
            Password:{student.password} <br></br>
            Courses:{student.subjects}
          </Paper>
        ))}
      </Paper>
     
    </Container>
  );
}


