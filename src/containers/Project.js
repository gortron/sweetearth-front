import React, { useState, useEffect } from "react";
import { Container, Header, Image, Button } from "semantic-ui-react";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";

const Project = props => {
  const { data, getProjects } = props;

  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!data) getProjects();
    if (data && !project) findProject();
  });

  const findProject = () => {
    // This function converts pathname to project.name, then filters that project from data.
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
      <Container fluid className="page">
        <Header
          inverted
          as="h1"
          content={project.name}
          style={{ fontSize: "3em" }}
        ></Header>
        <p>{project.description}</p>
        <Image fluid src={project.imgUrl}></Image>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Button
          primary
          size="huge"
          content="Pledge Today"
          as={Link}
          to="/pledge"
        ></Button>
      </Container>
    );
  };

  return handleRender();
};

export default Project;
