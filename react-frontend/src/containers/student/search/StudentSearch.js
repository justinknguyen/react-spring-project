import React from "react";
import { Link } from 'react-router-dom';
import "./StudentSearch.css";

export default function StudentSearch() {
  return (
    <div className="StudentSearch">
      <div className="lander">
        <h1><Link className="link" to='/react-spring-project/searchcourse'>Search Course</Link></h1>
        <br></br>
        <h1><Link className="link" to='/react-spring-project/viewstudentcourses'>View Enrolled Courses</Link></h1>
        <br></br>
        <h1><Link className="link" to='/react-spring-project/viewcourses'>View All Courses</Link></h1>
      </div>
    </div>
  );
}