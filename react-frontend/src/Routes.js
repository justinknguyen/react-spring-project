import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./containers/Login";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";

export default function Links() {
  return (
    <Routes>
        <Route path="/react-spring-project/" element={<Login />} />
        <Route path="/react-spring-project/home" element={<Home />} />
        {
          /* Finally, catch all unmatched routes */
        }
        <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}