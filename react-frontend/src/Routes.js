import React from "react";
import { Route, Routes } from "react-router-dom";

import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Home from "./containers/Home";

import AddStudent from "./containers/admin/add/AddStudent";
import AddCourse from "./containers/admin/add/AddCourse";
import AddStudentCourse from "./containers/admin/add/AddStudentCourse";
import AdminAdd from "./containers/admin/add/AdminAdd";

import AdminRemove from "./containers/admin/remove/AdminRemove";
import AdminEdit from "./containers/admin/edit/AdminEdit";
import AdminSearch from "./containers/admin/search/AdminSearch";

import StudentAdd from "./containers/student/add/StudentAdd";
import StudentSearch from "./containers/student/search/StudentSearch";

export default function Links() {
  return (
    <Routes>
        <Route path="/react-spring-project/" element={<Login />} />
        <Route path="/react-spring-project/home" element={<Home />} />

        <Route path="/react-spring-project/adminadd" element={<AdminAdd />} />
        <Route path="/react-spring-project/addstudent" element={<AddStudent />} />
        <Route path="/react-spring-project/addcourse" element={<AddCourse />} />
        <Route path="/react-spring-project/addstudentcourse" element={<AddStudentCourse />} />

        <Route path="/react-spring-project/adminremove" element={<AdminRemove />} />
        <Route path="/react-spring-project/adminedit" element={<AdminEdit />} />
        <Route path="/react-spring-project/adminsearch" element={<AdminSearch />} />

        <Route path="/react-spring-project/studentadd" element={<StudentAdd />} />
        <Route path="/react-spring-project/studentsearch" element={<StudentSearch />} />
        {
          /* Finally, catch all unmatched routes */
        }
        <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}