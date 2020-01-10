import React, { useEffect } from "react";
import { Container, Header, Card } from "semantic-ui-react";
import ProjectCard from "../components/ProjectCard";

const Projects = props => {
  const { data, getProjects } = props;

  useEffect(() => {
    if (!data) getProjects();
  });

  return (
    <Container className="content">
      <Header
        inverted
        as="h1"
        content="These projects are curated for their ecological and societal impact."
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
                context={"index"}
              ></ProjectCard>
            );
          })
        )}
      </Card.Group>
    </Container>
  );
};

export default Projects;
