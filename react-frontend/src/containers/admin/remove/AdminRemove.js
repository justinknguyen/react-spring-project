import React from "react";
import { Link } from 'react-router-dom';
import "./AdminRemove.css";

export default function AdminRemove() {
  return (
    <div className="AdminRemove">
      <div className="lander">
        <h1><Link to='/react-spring-project/removestudent'>Remove Student</Link></h1>
        <br></br>
        <h1><Link to='/react-spring-project/removecourse'>Remove Course</Link></h1>
        <br></br>
        <h1><Link to='/react-spring-project/removestudentcourse'>Remove Student from Course</Link></h1>
      </div>
    </div>
  );
}