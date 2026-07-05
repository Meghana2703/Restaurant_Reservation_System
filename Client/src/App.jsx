import { Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookTable from "./pages/BookTable";
import MyReservation from "./pages/MyReservation";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/book" element={<BookTable />} />
      <Route path="/my-reservations" element={<MyReservation />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
    </>
  );
}

export default App;