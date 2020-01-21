import React, { useState, useEffect, Fragment, useContext } from "react";
import { store } from "../store.js";
import { useProjectsDispatch } from "../utils/utility_functions";
import { Container, Image } from "semantic-ui-react";
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
          <Image
            rounded
            src={checkout.imgUrl}
            style={{ width: "60%", marginBottom: "10px" }}
          ></Image>
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
