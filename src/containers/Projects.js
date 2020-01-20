import React, { useEffect, useContext } from "react";
import { store } from "../store.js";
import { getProjects } from "../utils/utility_functions";
import { Container, Header, Card } from "semantic-ui-react";
import ProjectCard from "../components/ProjectCard";

const Projects = props => {
  // const { context, data, getProjects, checkoutProject } = props;
  const { context, checkoutProject } = props;
  const { state, dispatch } = useContext(store);
  const { mobile, projects } = state;
  console.log(state);

  useEffect(() => {
    if (!projects) dispatch({ type: "projects", payload: getProjects() });
    // if (!projects) getProjects();
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
      <Card.Group itemsPerRow={mobile ? 1 : 2}>
        {!projects ? (
          <p>Loading...</p>
        ) : (
          projects.map((project, idx) => {
            return (
              <ProjectCard
                key={idx}
                project={project}
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
