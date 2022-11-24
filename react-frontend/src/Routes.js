import React from "react";
import { Route, Routes } from "react-router-dom";

import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Home from "./containers/Home";
import Enroll from "./containers/Enroll";
import CourseView from "./containers/CourseView";
import CourseEdit from "./containers/CourseEdit";
import AddStudent from "./containers/AddStudent";


export default function Links() {
  return (
    <Routes>
        <Route path="/react-spring-project/" element={<Login />} />
        <Route path="/react-spring-project/home" element={<Home />} />
        <Route path="/react-spring-project/enroll" element={<Enroll />} />
        <Route path="/react-spring-project/courseview" element={<CourseView />} />
        <Route path="/react-spring-project/courseedit" element={<CourseEdit />} />
        <Route path="/react-spring-project/addstudent" element={<AddStudent />} />
        {
          /* Finally, catch all unmatched routes */
        }
        <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}