import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Button, Input, Container } from "semantic-ui-react";

const CheckoutForm = props => {
  const { project, confirmPayment, stripe } = props;
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  const submit = async event => {
    // User email is either user.email from Auth0 OR from some guest email field
    event.preventDefault();
    let { token } = await stripe.createToken({ name: "Name" });
    let body = {
      stripe_token: token.id,
      user_email: email,
      amount: amount,
      project_name: project.project.name
    };
    let response = await fetch("http://localhost:3000/charge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (response.ok) confirmPayment();
  };

  return (
    <div className="checkout">
      <Input
        focus
        label="Pledge Amount ($)*"
        placeholder="10"
        onChange={handleAmountChange}
      />
      <br />
      <Input
        focus
        label="Email*"
        placeholder="Email"
        onChange={handleEmailChange}
      />
      <Input focus label="Confirm Email*" placeholder="Email" />
      <Container className="StripeElement">
        <CardElement
          style={{
            base: {
              fontSize: "16px",
              color: "#424770",
              backgroundColor: "white",
              fontFamily: "Open Sans, sans-serif",
              letterSpacing: "0.025em",
              "::placeholder": {
                color: "#aab7c4"
              }
            },
            invalid: {
              color: "#c23d4b"
            }
          }}
        />
      </Container>

      <Button onClick={submit}>Purchase</Button>
    </div>
  );
};

export default injectStripe(CheckoutForm);
