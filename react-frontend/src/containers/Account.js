import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { flexbox } from "@mui/system";
import { userInfo } from "./Login.js";

export default function Account() {
	const paperStyle = {
		padding: "50px 20px",
		width: 600,
		margin: "20px auto",
	};

	return (
		<Container>
			<Paper elevation={3} style={paperStyle}>
			<h1>Account Information</h1>
				<Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}} >
					ID:{userInfo.id} <br></br>
					Username:{userInfo.email} <br></br>
					Password:{userInfo.password} <br></br>
					Name:{userInfo.name} <br></br>
					Address:{userInfo.address} <br></br>
					Date Registered:{userInfo.dateRegistered} <br></br>
				</Paper>
			</Paper>
		</Container>
	);
}
