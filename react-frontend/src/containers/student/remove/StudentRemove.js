import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useState } from 'react';

export default function StudentRemove() {
  const paperStyle = {padding:'50px 20px', width:600, margin:'20px auto'}
  const [isError, setIsError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cid,setCid] = useState('')

  const handleClick=(e)=>{
    e.preventDefault()
    const course={cid}
    console.log(course)
    // TODO: send data to database
    fetch("http://localhost:8080/api/v1/course", 
    {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(course)
    }).then(()=>{
      console.log("Course Removed")
      setIsSubmitted(true);
      setIsError(false);
    }).catch(()=>{
      console.log("Error")
      setIsError(true);
      setIsSubmitted(false);
    })
  }

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1>Remove Course</h1>
        <p>Unenroll from a course</p>

    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: 500, maxWidth: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField required id="outlined-required" label="Course Name (e.g., ENSF608)" variant="outlined" fullWidth
      value = {cid}
      onChange={(e)=>setCid(e.target.value)}
      />
      
      <Button variant="contained" onClick={handleClick}>
        Submit
      </Button>
    </Box>
    </Paper>
    <Paper elevation={3} style={paperStyle}>
        <h1>Response</h1>
        {isSubmitted ? <div>You've successfully unenrolled from this course!</div> : 
                        <div></div>}
        {isError ? <div>Error. Please try again.</div> : 
                        <div></div>}
      </Paper>
    </Container>
  );
}


