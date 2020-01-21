import React, { useEffect, useContext } from "react";
import { store } from "../store.js";
import { useProjectsDispatch } from "../utils/utility_functions";
import { Container, Header, Card } from "semantic-ui-react";
import ProjectCard from "../components/ProjectCard";

const Projects = props => {
  // const { context, data, getProjects, checkoutProject } = props;
  const { page } = props;
  const { state, dispatch } = useContext(store);
  const { mobile, projects } = state;

  useProjectsDispatch(`http://localhost:3000/projects`, store, "projects");

  useEffect(() => {
    // if (!projects) dispatch({ type: "projects", payload: getProjects() });
  });

  const handleTitle = () => {
    let title = "";
    if (page === "projects") {
      title =
        "These projects are validated, and curated for their ecological impact.";
    }
    return title;
  };

  return (
    <Container className={page}>
      <Header
        as="h1"
        content={handleTitle()}
        style={{ fontSize: "3em" }}
      ></Header>
      <Card.Group itemsPerRow={mobile ? 1 : 2}>
        {!projects ? (
          <p>Loading...</p>
        ) : (
          projects.map((project, idx) => {
            return (
              <ProjectCard
                key={idx}
                project={project}
                page={page}
              ></ProjectCard>
            );
          })
        )}
      </Card.Group>
    </Container>
  );
};

export default Projects;
