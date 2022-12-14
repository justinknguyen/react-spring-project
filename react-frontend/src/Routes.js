import React from "react";
import { Route, Routes } from "react-router-dom";

import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Home from "./containers/Home";
import Account from "./containers/Account";

import AddStudent from "./containers/admin/add/AddStudent";
import AddCourse from "./containers/admin/add/AddCourse";
import AddStudentCourse from "./containers/admin/add/AddStudentCourse";
import AdminAdd from "./containers/admin/add/AdminAdd";

import AdminRemove from "./containers/admin/remove/AdminRemove";
import RemoveCourse from "./containers/admin/remove/RemoveCourse";
import RemoveStudent from "./containers/admin/remove/RemoveStudent";
import RemoveStudentCourse from "./containers/admin/remove/RemoveStudentCourse";

import AdminEdit from "./containers/admin/edit/AdminEdit";
import EditStudent from "./containers/admin/edit/EditStudent";
import EditCourse from "./containers/admin/edit/EditCourse";

import AdminSearch from "./containers/admin/search/AdminSearch";
import ViewStudents from "./containers/admin/search/ViewStudents";
import ViewCourses from "./containers/admin/search/ViewCourses";
import SearchCourse from "./containers/admin/search/SearchCourse";
import SearchStudent from "./containers/admin/search/SearchStudent";

import StudentAdd from "./containers/student/add/StudentAdd";
import StudentRemove from "./containers/student/remove/StudentRemove";
import StudentSearch from "./containers/student/search/StudentSearch";
import ViewStudentCourses from "./containers/student/search/ViewStudentCourses";

export default function Links() {
  return (
    <Routes>
        <Route path="/react-spring-project/" element={<Login />} />
        <Route path="/react-spring-project/signup" element={<Signup />} />
        <Route path="/react-spring-project/home" element={<Home />} />
        <Route path="/react-spring-project/account" element={<Account />} />

        <Route path="/react-spring-project/adminadd" element={<AdminAdd />} />
        <Route path="/react-spring-project/addstudent" element={<AddStudent />} />
        <Route path="/react-spring-project/addcourse" element={<AddCourse />} />
        <Route path="/react-spring-project/addstudentcourse" element={<AddStudentCourse />} />

        <Route path="/react-spring-project/adminremove" element={<AdminRemove />} />
        <Route path="/react-spring-project/removecourse" element={<RemoveCourse />} />
        <Route path="/react-spring-project/removestudent" element={<RemoveStudent />} />
        <Route path="/react-spring-project/removestudentcourse" element={<RemoveStudentCourse />} />

        <Route path="/react-spring-project/adminedit" element={<AdminEdit />} />
        <Route path="/react-spring-project/editstudent" element={<EditStudent />} />
        <Route path="/react-spring-project/editcourse" element={<EditCourse />} />

        <Route path="/react-spring-project/adminsearch" element={<AdminSearch />} />
        <Route path="/react-spring-project/viewstudents" element={<ViewStudents />} />
        <Route path="/react-spring-project/viewcourses" element={<ViewCourses />} />
        <Route path="/react-spring-project/searchcourse" element={<SearchCourse />} />
        <Route path="/react-spring-project/searchstudent" element={<SearchStudent />} />

        <Route path="/react-spring-project/studentadd" element={<StudentAdd />} />
        <Route path="/react-spring-project/studentremove" element={<StudentRemove />} />
        <Route path="/react-spring-project/studentsearch" element={<StudentSearch />} />
        <Route path="/react-spring-project/viewstudentcourses" element={<ViewStudentCourses />} />
        {
          /* Finally, catch all unmatched routes */
        }
        <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}