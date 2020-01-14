import React, { useState, useEffect, Fragment } from "react";
import { Container, Header, Button } from "semantic-ui-react";
import { Elements } from "react-stripe-elements";

import Projects from "./Projects";
import CheckoutForm from "../components/CheckoutForm";

const Pledge = props => {
  const { data, getProjects, checkout, checkoutProject } = props;

  // const [project, setProject] = useState(null);
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("unselected");

  useEffect(() => {
    if (!data) getProjects();
    if (checkout && status !== "selected") projectSelected({ ...checkout });
  });

  const projectSelected = project => {
    setStatus("selected");
    checkoutProject({ ...project });
  };

  const confirmPayment = async amount => {
    setStatus("paid");
    setAmount(amount / 100);
  };

  const cancelPledge = () => {
    console.log("pledge cancelled");
    checkoutProject(null);
    setStatus("unselected");
  };

  return (
    <Container className="page">
      {status === "unselected" ? (
        <Projects
          data={data}
          getProjects={getProjects}
          context="pledge"
          checkoutProject={checkoutProject}
        />
      ) : null}
      {status === "selected" ? (
        <Fragment>
          <Header
            as="h1"
            content="2. Billing Information"
            style={{ fontSize: "3em" }}
          ></Header>
          <h3>{checkout.name}</h3>
          <Button
            negative
            icon="cancel"
            size="mini"
            content="Cancel"
            onClick={() => cancelPledge()}
          ></Button>
          <Elements>
            <CheckoutForm
              confirmPayment={confirmPayment}
              project={{ ...checkout }}
            />
          </Elements>
        </Fragment>
      ) : null}
      {status === "paid" ? (
        <Fragment>
          <Header
            as="h1"
            content="3. Payment Confirmed."
            style={{ fontSize: "3em" }}
          ></Header>
          <p>
            ${amount} to {checkout.name}
          </p>
        </Fragment>
      ) : null}
    </Container>
  );
};

export default Pledge;
