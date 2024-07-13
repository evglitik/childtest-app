import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const specialist = JSON.parse(localStorage.getItem("specialist"));

  const handleLogout = () => {
    localStorage.removeItem("specialist");
    navigate("/");
  };

  return (
    <header>
      {specialist && (
        <div>
          <span>{specialist.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;
