import React from "react";
import { Link } from 'react-router-dom';
import "./AdminEdit.css";

export default function AdminEdit() {
  return (
    <div className="AdminEdit">
      <div className="lander">
        <h1><Link className="link" to='/react-spring-project/editstudent'>Edit Student</Link></h1>
        <br></br>
        <h1><Link className="link" to='/react-spring-project/editcourse'>Edit Course</Link></h1>
      </div>
    </div>
  );
}