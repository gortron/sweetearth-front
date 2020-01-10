import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { useAuth0 } from "../react-auth0";

const CheckoutForm = props => {
  const { project, confirmPayment, stripe } = props;
  const { user } = useAuth0();

  const submit = async event => {
    // User email is either user.email from Auth0 OR from some guest email field
    event.preventDefault();
    let { token } = await stripe.createToken({ name: "Name" });
    let body = {};
    if (user) {
      body = {
        stripe_token: token.id,
        user_email: user.email,
        project_name: project.project.name
      };
    } else {
      body = {
        stripe_token: token.id,
        user_email: "guest@guest.com",
        project_name: project.project.name
      };
    }
    let response = await fetch("http://localhost:3000/charge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (response.ok) confirmPayment();
  };

  return (
    <div className="checkout">
      <p>Would you like to complete the purchase?</p>
      <CardElement />
      <button onClick={submit}>Purchase</button>
    </div>
  );
};

export default injectStripe(CheckoutForm);
