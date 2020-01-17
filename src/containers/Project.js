import React, { useState, useEffect } from "react";
import { Container, Header, Image, Button } from "semantic-ui-react";
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
      <Container fluid className="page">
        <Container
          fluid
          className="hero"
          style={{
            background: `url(http://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Afognak_coastline.jpg/1280px-Afognak_coastline.jpg) no-repeat left top`,
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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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

{
  /* <Button
          primary
          size="huge"
          content="Pledge Today"
          onClick={() => redirect("/pledge")}
          {/* as={Link}
          to="/pledge" 
        ></Button> */
}
