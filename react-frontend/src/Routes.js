import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";

export default function Links() {
  return (
    <Routes>
        <Route path="/react-spring-project/" element={<Login />} />
        {
          /* Finally, catch all unmatched routes */
        }
        <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}