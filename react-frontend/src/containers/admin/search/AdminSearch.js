import React from "react";
import { Link } from 'react-router-dom';
import "./AdminSearch.css";

export default function AdminSearch() {
  return (
    <div className="AdminSearch">
      <div className="lander">
        <h1><Link className="link" to='/react-spring-project/searchstudent'>Search Student</Link></h1>
        <br></br>
        <h1><Link className="link" to='/react-spring-project/searchcourse'>Search Course</Link></h1>
        <br></br>
        <h1><Link className="link" to='/react-spring-project/viewallstudents'>View All Students</Link></h1>
        <br></br>
        <h1><Link className="link" to='/react-spring-project/viewallcourses'>View All Courses</Link></h1>
      </div>
    </div>
  );
}