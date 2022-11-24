import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useState } from 'react';

export default function AddStudent() {
  const paperStyle = {padding:'50px 20px', width:600, margin:'20px auto'}
  const [id,setId] = useState('')
  const [fname,setFname] = useState('')
  const [lname,setLname] = useState('')
  const [uname,setUname] = useState('')
  const [pass,setPass] = useState('')

  const handleClick=(e)=>{
    e.preventDefault()
    const student={id, fname, lname, uname, pass}
    console.log(student)
    // TODO: send data to database
  }

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1><u>Add Student</u></h1>

    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '54ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Student ID" variant="outlined" fullWidth
      value = {id}
      onChange={(e)=>setId(e.target.value)}
      />
      <TextField id="outlined-basic" label="First Name" variant="outlined" fullWidth
      value = {fname}
      onChange={(e)=>setFname(e.target.value)}
      />
      <TextField id="outlined-basic" label="Last Name" variant="outlined" fullWidth
      value = {lname}
      onChange={(e)=>setLname(e.target.value)}
      />
      <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth
      value = {uname}
      onChange={(e)=>setUname(e.target.value)}
      />
      <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth
      value = {pass}
      onChange={(e)=>setPass(e.target.value)}
      />
      <Button variant="contained" onClick={handleClick}>
        Submit
      </Button>
    </Box>
    </Paper>
    </Container>
  );
}


