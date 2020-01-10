import React, { useState, useEffect } from "react";
import { Container, Header, Card } from "semantic-ui-react";
import ProjectCard from "../components/ProjectCard";

const Project = props => {
  const { data, getProjects } = props;
  // const project = data.filter(project => project);
  // const [project, setProject] = useState(null);

  useEffect(() => {
    // !data ? getProjects() : null;
    if (!data) getProjects();
    // let proj = data.filter(proj => )
  });

  const findProject = () => {
    // Write a function that filters this project from all of the projects. It will need to look at the URL, figure out its name, then filter for name.
    let projectPath = window.location.pathname.split("/").slice(-1)[0];
    let projectName = projectPath.split("-");
  };

  // const getProject = async () => {
  //   const endpoint = "http://localhost:3000" + window.location.pathname;
  //   const response = await fetch(endpoint);
  //   const data = await response.json();
  //   const proj = data.data.attributes;
  //   setProject(proj);
  // };

  const handleRender = () => {
    return !data ? (
      <p>Loading...</p>
    ) : (
      <Container className="content">
        {/* <Header
          inverted
          as="h1"
          content={project.name}
          style={{ fontSize: "3em" }}
        ></Header> */}
      </Container>
    );
  };

  return handleRender();
};

export default Project;
