import React, { useState, useEffect, useContext } from "react";
import { store } from "../store.js";
import { useProjectsDispatch } from "../utils/utility_functions";
import { Container, Image, Header } from "semantic-ui-react";
import { Elements } from "react-stripe-elements";
import "@lottiefiles/lottie-player";

import Projects from "./Projects";
import CheckoutForm from "../components/CheckoutForm";
import Confirmation from "../components/Confirmation";
import CheckoutSteps from "../components/CheckoutSteps";

const Pledge = () => {
  const { state, dispatch } = useContext(store);
  const { checkout } = state;

  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("unselected");

  useProjectsDispatch(
    `https://sweetearth.herokuapp.com/projects`,
    store,
    "projects"
  );

  useEffect(() => {
    if (checkout && status === "unselected") projectSelected({ ...checkout });
  });

  const projectSelected = project => {
    setStatus("selected");
    dispatch({ type: "checkout", payload: { ...project } });
  };

  const confirmPayment = amount => {
    setStatus("paid");
    setAmount(amount / 100);
  };

  const cancelPledge = () => {
    dispatch({ type: "checkout", payload: null });
    setStatus("unselected");
  };

  const ifUnselectedRenderProjects = () => {
    if (status === "unselected") return <Projects page="pledge" />;
  };

  {
    /* <Container
          fluid
          className="hero"
          style={{
            background: `url(${project.imgUrl}) no-repeat left top`,
            backgroundSize: "cover"
          }}
        >
          <Header
            inverted
            as="h1"
            content={project.name}
            style={{ fontSize: "3em" }}
          ></Header> */
  }

  const ifSelectedRenderCheckout = () => {
    if (status === "selected")
      return (
        <Container className="pledge-checkout">
          <Container
            className="pledge-hero"
            style={{
              background: `url(${checkout.imgUrl}) no-repeat left top`,
              backgroundSize: "cover"
            }}
          >
            <Header
              as="h3"
              inverted
              content="Pledging to:"
              style={{ fontSize: "1.33em" }}
            ></Header>
            <Header
              as="h3"
              inverted
              content={checkout.name}
              style={{ fontSize: "2em" }}
            ></Header>
          </Container>

          <Elements>
            <CheckoutForm
              confirmPayment={confirmPayment}
              cancelPledge={cancelPledge}
            />
          </Elements>
        </Container>
      );
  };

  {
    /* <Container className="pledge-checkout">
          <Header as="h3" style={{ fontSize: "2em", marginTop: "40px" }}>
            Pledging to: {checkout.name}
          </Header>
          <Image
            rounded
            src={checkout.imgUrl}
            style={{ width: "60%", marginBottom: "50px" }}
          ></Image>
          <Elements>
            <CheckoutForm
              confirmPayment={confirmPayment}
              cancelPledge={cancelPledge}
            />
          </Elements>
        </Container> */
  }

  const ifPaidRenderConfirmation = () => {
    if (status === "paid")
      return <Confirmation amount={amount} checkoutName={checkout.name} />;
  };

  return (
    <Container fluid className="page">
      <CheckoutSteps status={status} />
      {ifUnselectedRenderProjects()}
      {ifSelectedRenderCheckout()}
      {ifPaidRenderConfirmation()}
    </Container>
  );
};

export default Pledge;
