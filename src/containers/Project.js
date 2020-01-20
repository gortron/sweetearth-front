import React, { useState, useEffect } from "react";
import { Container, Header, Image, Button, Icon } from "semantic-ui-react";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";

const Project = props => {
  const { data, getProjects, checkoutProject } = props;

  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!data) getProjects();
    if (data && !project) findProject();
  });

  const findProject = () => {
    // This function converts pathname to project.name, then filters that project from data.
    // let projectName = this.props.match.params
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
      <Container fluid className="project">
        <Container
          fluid
          className="hero"
          style={{
            background: `url(${project.imgUrl}) no-repeat left top`,
            backgroundSize: "cover"
          }}
        >
          <Header
            inverted
            as="h1"
            content={project.name}
            style={{ fontSize: "3em" }}
          ></Header>
          <p style={{ color: "white", fontSize: "1.33em" }}>
            <i>{project.description}</i>
          </p>
        </Container>

        <Container className="project-content">
          <h3>
            <i>Drawdown</i> solution type - {project.category}
          </h3>
          <h4>Estimated reduction (tons CO2) - {project.emissionReduction}</h4>
          <p>{project.content}</p>
          <p>
            <a href={project.siteUrl}>🌎 Project Website</a>
          </p>
        </Container>

        <Button
          primary
          size="huge"
          content="Pledge Today"
          onClick={() => checkoutProject(project)}
          as={Link}
          to={`/pledge`}
        ></Button>
      </Container>
    );
  };

  return handleRender();
};

export default Project;
