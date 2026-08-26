import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";


import Login from "./pages/Login";
import StudentFeedback from "./pages/StudentFeedback";
import AdminDashboard from "./pages/AdminDashboard";

import "./App.css";

function App() {

  return (

    <BrowserRouter>
    

      <Routes>
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/student/feedback"
          element={<StudentFeedback />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;