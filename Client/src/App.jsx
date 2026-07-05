import { Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookTable from "./pages/BookTable";
import MyReservation from "./pages/MyReservation";
import AdminTemp from "./pages/AdminTemp";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/home" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route
    path="/book"
    element={
      <ProtectedRoute>
        <BookTable />
      </ProtectedRoute>
    }
  />

  <Route
    path="/my-reservations"
    element={
      <ProtectedRoute>
        <MyReservation />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin"
    element={
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    }
  />
</Routes>
    </>
  );
}

export default App;