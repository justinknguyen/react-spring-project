import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./containers/Login";

export default function Links() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
    </Routes>
  );
}