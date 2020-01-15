import React, { useState, useEffect, Fragment } from "react";
import { Container, Header, Button, Image } from "semantic-ui-react";
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
    if (checkout && status === "unselected") projectSelected({ ...checkout });
  });

  const projectSelected = project => {
    setStatus("selected");
    checkoutProject({ ...project });
  };

  const confirmPayment = amount => {
    setStatus("paid");
    setAmount(amount / 100);
  };

  const cancelPledge = () => {
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
        <Container className="pledge-checkout">
          <Header
            as="h1"
            content="2. Billing Information"
            style={{ fontSize: "3em" }}
          ></Header>
          <Image src={checkout.imgUrl} style={{ width: "50%" }}></Image>
          <Elements>
            <CheckoutForm
              confirmPayment={confirmPayment}
              project={{ ...checkout }}
              cancelPledge={cancelPledge}
            />
          </Elements>
        </Container>
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
