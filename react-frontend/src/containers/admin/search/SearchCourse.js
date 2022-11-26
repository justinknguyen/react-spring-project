import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react';

export default function SearchCourse() {
  const paperStyle = {padding:'50px 20px', width:600, margin:'20px auto'}
  const [isError, setIsError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [id,setId] = useState('')
  const [course,setCourse] = useState()

  const handleClick=(e)=>{
    e.preventDefault()
    const c={id}
    console.log(c)
    // TODO: send data to database
    
  }

  useEffect(()=>{
    fetch("http://localhost:8080/api/v1/course")
    .then(res=>res.json())
    .then(result=>{
      setCourse(result);
    })
  })

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1>Search Course</h1>
        <p>Search a course from the database</p>

    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: 500, maxWidth: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField required id="outlined-required" label="Course ID (e.g., ENSF608)" variant="outlined" fullWidth
      value = {id}
      onChange={(e)=>setId(e.target.value)}
      />
      
      <Button variant="contained" onClick={handleClick}>
        Submit
      </Button>
    </Box>
    </Paper>
      <Paper elevation={3} style={paperStyle}>
        <h1>Response</h1>
        {isSubmitted ? <div>ID:{course.id},
                            Name:{course.name},
                            Capacity:{course.capacity}</div> : 
                        <div></div>}
        {isError ? <div>Error. Please try again.</div> : 
                        <div></div>}
      </Paper>
     
    </Container>
  );
}

