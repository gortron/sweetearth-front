import React, { useState, useEffect } from "react";
import { Container, Header, Card } from "semantic-ui-react";
import ProjectCard from "../components/ProjectCard";

const Project = props => {
  const { data, getProjects } = props;

  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!data) getProjects();
    if (data && !project) findProject();
  });

  const findProject = () => {
    // Write a function that filters this project from all of the projects. It will need to look at the URL, figure out its name, then filter for name.
    let projectPath = window.location.pathname.split("/").slice(-1)[0];
    let projectName = projectPath.split("-").join(" ");
    let capitalizedProjectName = projectName.replace(/\b\w/g, l =>
      l.toUpperCase()
    );
    let project = data.filter(
      project => project.attributes.name === capitalizedProjectName
    )[0];
    setProject({ ...project.attributes });
  };

  const handleRender = () => {
    return !data || !project ? (
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
