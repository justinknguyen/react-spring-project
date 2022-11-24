import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useState } from 'react';

export default function AddCourse() {
  const paperStyle = {padding:'50px 20px', width:600, margin:'20px auto'}
  const [id,setId] = useState('')
  const [name,setName] = useState('')
  const [p1id,setP1id] = useState('')
  const [p1name,setP1name] = useState('')
  const [p2id,setP2id] = useState('')
  const [p2name,setP2name] = useState('')
  const [p3id,setP3id] = useState('')
  const [p3name,setP3name] = useState('')

  const handleClick=(e)=>{
    e.preventDefault()
    const course={id, name}
    console.log(course)
    // TODO: send data to database
  }

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1>Add Course</h1>
        <p>Add a course to the database</p>

    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: 500, maxWidth: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField required id="outlined-required" label="Course Name" variant="outlined" fullWidth
      value = {name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField required id="outlined-required" label="Course ID" variant="outlined" fullWidth
      value = {id}
      onChange={(e)=>setId(e.target.value)}
      />

      <p>Optional</p>
      <TextField id="outlined-basic" label="1. Prerequiste Course Name" variant="outlined" fullWidth
      value = {p1name}
      onChange={(e)=>setP1name(e.target.value)}
      />
      <TextField id="outlined-basic" label="1. Prerequiste Course ID" variant="outlined" fullWidth
      value = {p1id}
      onChange={(e)=>setP1id(e.target.value)}
      />
      <TextField id="outlined-basic" label="2. Prerequiste Course Name" variant="outlined" fullWidth
      value = {p2name}
      onChange={(e)=>setP2name(e.target.value)}
      />
      <TextField id="outlined-basic" label="2. Prerequiste Course ID" variant="outlined" fullWidth
      value = {p2id}
      onChange={(e)=>setP2id(e.target.value)}
      />
      <TextField id="outlined-basic" label="3. Prerequiste Course Name" variant="outlined" fullWidth
      value = {p3name}
      onChange={(e)=>setP3name(e.target.value)}
      />
      <TextField id="outlined-basic" label="3. Prerequiste Course ID" variant="outlined" fullWidth
      value = {p3id}
      onChange={(e)=>setP3id(e.target.value)}
      />
      
      <Button variant="contained" onClick={handleClick}>
        Submit
      </Button>
    </Box>
    </Paper>
    </Container>
  );
}


