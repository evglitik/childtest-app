import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [children, setChildren] = useState([]);
  const specialist = JSON.parse(localStorage.getItem("specialist"));

  useEffect(() => {
    const childrenKey = `children_${specialist.username}`;
    const savedChildren = JSON.parse(localStorage.getItem(childrenKey)) || [];
    setChildren(savedChildren);
  }, [specialist.username]);

  return (
    <div>
      <h2>Profile</h2>
      <Link to="/add-child">
        <button>Add New Child</button>
      </Link>
      <ul>
        {children.map((child, index) => (
          <li key={index}>
            <Link to={`/child/${child.id}`}>{child.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
