import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SpecialistDashboard = () => {
  const [children, setChildren] = useState([]);
  const specialist = JSON.parse(localStorage.getItem("specialist"));

  useEffect(() => {
    const childrenKey = `children_${specialist.username}`;
    const children = JSON.parse(localStorage.getItem(childrenKey)) || [];
    setChildren(children);
  }, [specialist.username]);

  return (
    <div>
      <h2>{specialist.username}'s Dashboard</h2>
      <Link to="/add-child">
        <button>Add Child</button>
      </Link>
      <h3>Children List</h3>
      <ul>
        {children.map((child) => (
          <li key={child.id}>
            <Link to={`/child/${child.id}`}>{child.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpecialistDashboard;
