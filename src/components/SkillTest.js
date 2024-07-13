import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import skills from "../skills";

const SkillTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [child, setChild] = useState(null);
  const [currentSkills, setCurrentSkills] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const specialist = JSON.parse(localStorage.getItem("specialist"));
    const childrenKey = `children_${specialist.username}`;
    const children = JSON.parse(localStorage.getItem(childrenKey)) || [];
    const child = children.find((c) => c.id === id);
    setChild(child);
    if (child) {
      const age = child.age.toString();
      setCurrentSkills(skills[age] || {});
    }
  }, [id]);

  const handleTest = (skillType, skillIndex, passed) => {
    if (!passed) {
      setResults((prevResults) => [
        ...prevResults,
        { type: skillType, index: skillIndex },
      ]);
    }
  };

  const saveResults = () => {
    const specialist = JSON.parse(localStorage.getItem("specialist"));
    const childrenKey = `children_${specialist.username}`;
    const children = JSON.parse(localStorage.getItem(childrenKey)) || [];
    const updatedChildren = children.map((c) => {
      if (c.id === child.id) {
        const failedSkills = results.map((result) => ({
          skill: currentSkills[result.type][result.index],
          type: result.type,
        }));
        c.skills = failedSkills;
      }
      return c;
    });
    localStorage.setItem(childrenKey, JSON.stringify(updatedChildren));
    navigate(`/child/${child.id}`);
  };

  if (!child) {
    return <div>Child not found</div>;
  }

  return (
    <div>
      <h2>Testing {child.name}</h2>
      {Object.keys(currentSkills).map((skillType) => (
        <div key={skillType}>
          <h3>{skillType}</h3>
          <ul>
            {currentSkills[skillType].map((skill, index) => (
              <li key={index}>
                {skill}
                <button onClick={() => handleTest(skillType, index, true)}>
                  Passed
                </button>
                <button onClick={() => handleTest(skillType, index, false)}>
                  Failed
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={saveResults}>Save Results</button>
    </div>
  );
};

export default SkillTest;
