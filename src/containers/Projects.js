import React, { useEffect, useContext } from "react";
import { store } from "../store.js";
import { useProjectsDispatch } from "../utils/queries";
import { Container, Header, Card } from "semantic-ui-react";
import ProjectCard from "../components/ProjectCard";

const Projects = props => {
  const { page } = props;
  const { state } = useContext(store);
  const { mobile, projects } = state;

  useProjectsDispatch(`projects`, store, "projects");

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
