import React, { useState, useEffect, Fragment, useContext } from "react";
import { store } from "../store.js";
import { useProjectsDispatch } from "../utils/utility_functions";
import { Container, Header, Image } from "semantic-ui-react";
import { Elements } from "react-stripe-elements";
import "@lottiefiles/lottie-player";

import Projects from "./Projects";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutSteps from "../components/CheckoutSteps";

const Pledge = () => {
  const { state, dispatch } = useContext(store);
  const { checkout } = state;

  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("unselected");

  useProjectsDispatch(`http://localhost:3000/projects`, store, "projects");

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

  const ifSelectedRenderCheckout = () => {
    if (status === "selected")
      return (
        <Container className="pledge-checkout">
          <Image rounded src={checkout.imgUrl} style={{ width: "60%" }}></Image>
          <Elements>
            <CheckoutForm
              confirmPayment={confirmPayment}
              cancelPledge={cancelPledge}
            />
          </Elements>
        </Container>
      );
  };

  const ifPaidRenderConfirmation = () => {
    if (status === "paid")
      return (
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
      );
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
