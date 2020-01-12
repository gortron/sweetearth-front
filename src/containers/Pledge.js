import React, { useState, useEffect, Fragment } from "react";
import { Container, Header } from "semantic-ui-react";
import { Elements } from "react-stripe-elements";

import Projects from "./Projects";
import CheckoutForm from "../components/CheckoutForm";

const Pledge = props => {
  const { data, getProjects } = props;

  const [project, setProject] = useState(null);
  const [paid, setPaid] = useState(false);
  const [status, setStatus] = useState("unselected");

  useEffect(() => {
    if (!data) getProjects();
  });

  const pickProject = project => {
    setStatus("selected");
    setProject({ project });
  };

  const confirmPayment = async () => {
    setStatus("paid");
  };

  return (
    <Container className="content">
      {status === "unselected" ? (
        <Projects
          data={data}
          getProjects={getProjects}
          context="pledge"
          pickProject={pickProject}
        />
      ) : null}
      {status === "selected" ? (
        <Fragment>
          <Header
            inverted
            as="h1"
            content="2. Billing Information"
            style={{ fontSize: "3em" }}
          ></Header>
          <h3>{project.project.name}</h3>
          <Elements>
            <CheckoutForm
              confirmPayment={confirmPayment}
              project={{ ...project }}
            />
          </Elements>
        </Fragment>
      ) : null}
      {status === "paid" ? (
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
