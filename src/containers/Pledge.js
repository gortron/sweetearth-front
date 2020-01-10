import React, { useState, useEffect } from "react";
import { Container, Header, Card } from "semantic-ui-react";
import ProjectCard from "../components/ProjectCard";
import { Elements } from "react-stripe-elements";
import CheckoutForm from "../components/CheckoutForm";

const Pledge = props => {
  const { data, getProjects } = props;

  const [project, setProject] = useState({});
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (!data) getProjects();
  });

  const pickProject = project => {
    setProject({ project });
  };

  const confirmPayment = () => {
    setPaid(true);
  };

  return (
    <Container className="content">
      <Header
        inverted
        as="h1"
        content="1. Pick a Project"
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
                context={"pledge"}
                pickProject={pickProject}
              ></ProjectCard>
            );
          })
        )}
      </Card.Group>
      <Header
        inverted
        as="h1"
        content="2. Payment Details"
        style={{ fontSize: "3em" }}
      ></Header>
      <Elements>
        <CheckoutForm confirmPayment={confirmPayment} />
      </Elements>
      {paid ? (
        <Header
          inverted
          as="h1"
          content="3. Payment Confirmed."
          style={{ fontSize: "3em" }}
        ></Header>
      ) : null}
    </Container>
  );
};

export default Pledge;
