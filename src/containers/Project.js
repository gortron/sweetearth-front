import React, { useState, useEffect, useContext } from "react";
import { store } from "../store.js";
import { Container, Header, Image, Button, Icon } from "semantic-ui-react";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";
import { getProjects } from "../utils/utility_functions";

const Project = props => {
  const { state, dispatch } = useContext(store);
  const { projects } = state;
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!projects) dispatch({ type: "projects", payload: getProjects() });
    if (projects && !project) findProject();
  });

  const findProject = () => {
    // This function converts pathname to project.name, then filters that project from data.
    // let projectName = this.props.match.params
    let projectPath = window.location.pathname.split("/").slice(-1)[0];
    let projectName = projectPath.split("-").join(" ");
    let capitalizedProjectName = projectName.replace(/\b\w/g, l =>
      l.toUpperCase()
    );

    let project = projects.filter(
      project => project.name === capitalizedProjectName
    )[0];
    setProject({ ...project });
  };

  const checkoutProject = () => {
    // project
    //   ? dispatch({ type: "checkout", payload: project })
    //   : dispatch({ type: "checkout", payload: null });
    dispatch({ type: "checkout", payload: project ? project : null });
  };

  const handleRender = () => {
    return !projects || !project ? (
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
          onClick={() => checkoutProject()}
          as={Link}
          to={`/pledge`}
        ></Button>
      </Container>
    );
  };

  return handleRender();
};

export default Project;
