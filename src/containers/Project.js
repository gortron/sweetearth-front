import React, { useState, useEffect } from "react";
import { Container, Header, Card } from "semantic-ui-react";
import ProjectCard from "../components/ProjectCard";

const Project = () => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!project) getProject();
  });

  const getProject = async () => {
    const endpoint = "http://localhost:3000" + window.location.pathname;
    const response = await fetch(endpoint);
    const data = await response.json();
    const proj = data.data.attributes;
    setProject(proj);
  };

  const handleRender = () => {
    return !project ? (
      <p>Loading...</p>
    ) : (
      <Container className="content">
        <Header
          inverted
          as="h1"
          content={project.name}
          style={{ fontSize: "3em" }}
        ></Header>
      </Container>
    );
  };

  return handleRender();
};

export default Project;
