import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddChild = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const specialist = JSON.parse(localStorage.getItem("specialist"));
    const childrenKey = `children_${specialist.username}`;
    const children = JSON.parse(localStorage.getItem(childrenKey)) || [];

    const newChild = {
      id: Date.now().toString(),
      name,
      age: parseInt(age, 10),
      skills: [],
    };

    children.push(newChild);
    localStorage.setItem(childrenKey, JSON.stringify(children));
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Add Child</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Child</button>
      </form>
    </div>
  );
};

export default AddChild;
