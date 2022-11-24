import React from "react";
import { Link } from 'react-router-dom';
import "./AdminAdd.css";

export default function AdminAdd() {
  return (
    <div className="AdminAdd">
      <div className="lander">
        <h1><Link to='/react-spring-project/addstudent'>Add Student</Link></h1>
        <br></br>
        <h1><Link to='/react-spring-project/addcourse'>Add Course</Link></h1>
        <br></br>
        <h1><Link to='/react-spring-project/addstudentcourse'>Add Student to Course</Link></h1>
      </div>
    </div>
  );
}