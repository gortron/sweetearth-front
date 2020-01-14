import React, { useEffect } from "react";
import { Container, Header, Card } from "semantic-ui-react";
import ProjectCard from "../components/ProjectCard";

const Projects = props => {
  const { context, data, getProjects, checkoutProject } = props;

  useEffect(() => {
    if (!data) getProjects();
  });

  const handleTitle = () => {
    let title = "";
    if (context === "index") {
      title =
        "These projects are curated for their ecological and societal impact.";
    } else {
      title = "1. Pick a Project";
    }
    return title;
  };

  return (
    <Container className={context}>
      <Header
        inverted
        as="h1"
        content={handleTitle()}
        style={{ fontSize: "3em" }}
      ></Header>
      <Card.Group itemsPerRow={2}>
        {!data ? (
          <p>Loading...</p>
        ) : (
          data.map((project, idx) => {
            return (
              <ProjectCard
                key={idx}
                project={project.attributes}
                context={context}
                checkoutProject={checkoutProject}
              ></ProjectCard>
            );
          })
        )}
      </Card.Group>
    </Container>
  );
};

export default Projects;
