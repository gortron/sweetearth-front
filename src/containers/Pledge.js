import React, { useState, useEffect, Fragment, useContext } from "react";
import { Container, Header, Step, Image } from "semantic-ui-react";
import { Elements } from "react-stripe-elements";
import "@lottiefiles/lottie-player";
import { store } from "../store.js";

import Projects from "./Projects";
import CheckoutForm from "../components/CheckoutForm";

const Pledge = props => {
  const { data, getProjects, checkout, checkoutProject } = props;
  const { state, dispatch } = useContext(store);

  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("unselected");

  useEffect(() => {
    if (!data) getProjects();
    if (checkout && status === "unselected") projectSelected({ ...checkout });
  });

  const projectSelected = project => {
    setStatus("selected");
    dispatch({ type: "checkout", payload: { ...project } });
    // checkoutProject({ ...project });
  };

  const confirmPayment = amount => {
    setStatus("paid");
    setAmount(amount / 100);
  };

  const cancelPledge = () => {
    checkoutProject(null);
    setStatus("unselected");
  };

  const renderSteps = () => {
    switch (status) {
      case "unselected":
        return (
          <Step.Group>
            <Step active>
              <Step.Content>
                <Step.Title>Pick Project</Step.Title>
                <Step.Description>
                  Choose a project to pledge to
                </Step.Description>
              </Step.Content>
            </Step>
            <Step>
              <Step.Content>
                <Step.Title>Payment</Step.Title>
                <Step.Description>Enter billing information</Step.Description>
              </Step.Content>
            </Step>
            <Step>
              <Step.Content>
                <Step.Title>Pledge Confirmation</Step.Title>
                <Step.Description> Thanks </Step.Description>
              </Step.Content>
            </Step>
          </Step.Group>
        );
      case "selected":
        return (
          <Step.Group>
            <Step>
              <Step.Content>
                <Step.Title>🌱</Step.Title>
                <Step.Description>✅ Project Selected</Step.Description>
              </Step.Content>
            </Step>
            <Step active>
              <Step.Content>
                <Step.Title>Payment</Step.Title>
                <Step.Description>Enter billing information</Step.Description>
              </Step.Content>
            </Step>
            <Step>
              <Step.Content>
                <Step.Title>Pledge Confirmation</Step.Title>
                <Step.Description> Thanks </Step.Description>
              </Step.Content>
            </Step>
          </Step.Group>
        );
      case "paid":
        return (
          <Step.Group>
            <Step>
              <Step.Content>
                <Step.Title>🌱</Step.Title>
                <Step.Description>✅ Project Selected</Step.Description>
              </Step.Content>
            </Step>
            <Step>
              <Step.Content>
                <Step.Title>🌲</Step.Title>
                <Step.Description>✅ Information Provided</Step.Description>
              </Step.Content>
            </Step>
            <Step active>
              <Step.Content>
                <Step.Title>🌎</Step.Title>
                <Step.Description> ✅ Pledge Confirmed </Step.Description>
              </Step.Content>
            </Step>
          </Step.Group>
        );
      default:
        return null;
    }
  };

  return (
    <Container fluid className="page">
      {renderSteps()}
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
          <Image rounded src={checkout.imgUrl} style={{ width: "60%" }}></Image>
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
          <Container>
            <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
            <lottie-player
              src="https://assets8.lottiefiles.com/animated_stickers/lf_tgs_8W1fY7.json"
              mode="bounce"
              background="transparent"
              speed=".75"
              style={{ paddingTop: "30px" }}
              loop
              autoplay
            ></lottie-player>
          </Container>
          <Header style={{ fontSize: "2em" }}>
            You did it! Here's a haiku, as a treat:
          </Header>
          <Header style={{ fontSize: "1.33em" }}>
            <i>
              Spring is passing.
              <br />
              The birds cry, and the fishes’ eyes are <br />
              With tears. - Basho
            </i>
          </Header>

          <p>
            Your pledge has been confirmed. You gave ${amount} to{" "}
            {checkout.name}. We've sent you an email with a confirmation number.
          </p>
        </Fragment>
      ) : null}
    </Container>
  );
};

export default Pledge;
