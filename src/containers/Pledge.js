import React, { useState, useEffect } from "react";
import { Container, Header, Card } from "semantic-ui-react";
import { Elements } from "react-stripe-elements";

import ProjectCard from "../components/ProjectCard";
import CheckoutForm from "../components/CheckoutForm";

const Pledge = props => {
  const { data, getProjects } = props;

  const [project, setProject] = useState({});
  const [paid, setPaid] = useState(false);
  const [status, setStatus] = useState({
    projectSelected: false,
    paymentSucceeded: false
  });

  useEffect(() => {
    if (!data) getProjects();
  });

  const pickProject = project => {
    setStatus({ ...status, projectSelected: true });
    setProject({ project });
  };

  const renderProjects = () => {
    let projects = [];
    status.projectSelected
      ? (projects = data.filter(
          proj => proj.attributes.name === project.project.name
        ))
      : (projects = data);
    return projects.map((project, idx) => {
      return (
        <ProjectCard
          key={idx}
          project={project.attributes}
          context={"pledge"}
          pickProject={pickProject}
        ></ProjectCard>
      );
    });
  };

  const confirmPayment = async () => {
    setPaid(true);
  };

  return (
    <Container className="page">
      <Header
        inverted
        as="h1"
        content="1. Pick a Project"
        style={{ fontSize: "3em" }}
      ></Header>
      <Card.Group itemsPerRow={2}>
        {!data ? <p>Loading...</p> : renderProjects()}
      </Card.Group>
      <Header
        inverted
        as="h1"
        content="2. Billing Information"
        style={{ fontSize: "3em" }}
      ></Header>
      <Elements>
        <CheckoutForm
          confirmPayment={confirmPayment}
          project={{ ...project }}
        />
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
