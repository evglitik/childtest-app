import React, { useState } from "react";

const skillsList = [
  { age: 3, skill: "Identify colors" },
  { age: 3, skill: "Count to 10" },
  { age: 4, skill: "Draw shapes" },
  { age: 4, skill: "Recognize letters" },
  // додайте більше навичок для різних вікових груп
];

const Test = ({ child, updateChildren }) => {
  const [skills, setSkills] = useState(child.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const handleSkillChange = (skill, canDo) => {
    const updatedSkills = skills.map((s) =>
      s.skill === skill ? { ...s, canDo } : s
    );
    setSkills(updatedSkills);
    const children = JSON.parse(localStorage.getItem("children")) || [];
    const updatedChildren = children.map((c) =>
      c.id === child.id ? { ...c, skills: updatedSkills } : c
    );
    localStorage.setItem("children", JSON.stringify(updatedChildren));
    updateChildren(updatedChildren);
  };

  const addSkill = (e) => {
    e.preventDefault();
    const newSkillEntry = { skill: newSkill, canDo: false };
    const updatedSkills = [...skills, newSkillEntry];
    setSkills(updatedSkills);
    const children = JSON.parse(localStorage.getItem("children")) || [];
    const updatedChildren = children.map((c) =>
      c.id === child.id ? { ...c, skills: updatedSkills } : c
    );
    localStorage.setItem("children", JSON.stringify(updatedChildren));
    updateChildren(updatedChildren);
    setNewSkill("");
  };

  return (
    <div>
      <h3>Skills Test for {child.name}</h3>
      <form onSubmit={addSkill}>
        <input
          type="text"
          placeholder="Add new skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <button type="submit">Add Skill</button>
      </form>
      <ul>
        {skillsList
          .filter((skill) => skill.age <= child.age)
          .map((skill, index) => (
            <li key={index}>
              {skill.skill}
              <label>
                <input
                  type="checkbox"
                  checked={
                    skills.find((s) => s.skill === skill.skill)?.canDo || false
                  }
                  onChange={(e) =>
                    handleSkillChange(skill.skill, e.target.checked)
                  }
                />
                Can do
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Test;
