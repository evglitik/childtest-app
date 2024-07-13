import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import SpecialistDashboard from "./components/SpecialistDashboard";
import ChildProfile from "./components/ChildProfile";
import AddChild from "./components/AddChild";
import SkillTest from "./components/SkillTest";
import Profile from "./components/Profile";

function App() {
  const specialist = JSON.parse(localStorage.getItem("specialist"));

  const handleRegister = (newUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem("specialist", JSON.stringify(user));
      window.location.href = "/dashboard";
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Router>
      <div>
        {specialist && (
          <header>
            <span>{specialist.username}</span>
            <button
              onClick={() => {
                localStorage.removeItem("specialist");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </header>
        )}
        <Routes>
          <Route
            path="/profile"
            element={specialist ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={
              specialist ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/register"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/dashboard"
            element={specialist ? <SpecialistDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/child/:id"
            element={specialist ? <ChildProfile /> : <Navigate to="/" />}
          />
          <Route
            path="/add-child"
            element={specialist ? <AddChild /> : <Navigate to="/" />}
          />
          <Route
            path="/test/:id"
            element={specialist ? <SkillTest /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
