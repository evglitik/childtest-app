import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const ChildProfile = () => {
  const { id } = useParams();
  const [child, setChild] = useState(null);
  const specialist = JSON.parse(localStorage.getItem("specialist"));
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const childrenKey = `children_${specialist.username}`;
    const children = JSON.parse(localStorage.getItem(childrenKey)) || [];
    const child = children.find((child) => child.id === id);
    setChild(child);
  }, [id, specialist.username]);

  if (!child) {
    return <div>Child not found</div>;
  }

  return (
    <div>
      <h2>{child.name}'s Profile</h2>
      <p>Age: {child.age}</p>
      <button onClick={handleBackClick}>Back to Specialist Dashboard</button>
      <p>Skills:</p>
      <ul>
        {child.skills &&
          child.skills.map((skill, index) => (
            <li key={index}>
              {skill.skill} ({skill.type})
            </li>
          ))}
      </ul>
      <Link to={`/test/${child.id}`}>
        <button>Start Skill Test</button>
      </Link>
    </div>
  );
};

export default ChildProfile;
