import React, { useEffect, useContext } from "react";
import { store } from "../store.js";
import { Container, Header, Card } from "semantic-ui-react";
import ProjectCard from "../components/ProjectCard";

const Projects = props => {
  const { context, data, getProjects, checkoutProject } = props;
  const { state, dispatch } = useContext(store);
  console.log(state);

  useEffect(() => {
    if (!data) getProjects();
    // dispatch({ type: "mobile" });
  });

  const handleTitle = () => {
    let title = "";
    if (context === "index") {
      title =
        "These projects are validated, and curated for their ecological impact.";
    }
    return title;
  };

  return (
    <Container className={context}>
      <Header
        as="h1"
        content={handleTitle()}
        style={{ fontSize: "3em" }}
      ></Header>
      <Card.Group itemsPerRow={true ? 1 : 2}>
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
