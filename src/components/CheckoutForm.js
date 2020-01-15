import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Button, Input, Container, Header } from "semantic-ui-react";

const CheckoutForm = props => {
  const { project, confirmPayment, stripe, cancelPledge } = props;
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handleAmountChange = event => {
    setAmount(event.target.value * 100); // *100 will convert $ to ¢
  };

  const submit = async event => {
    // User email is either user.email from Auth0 OR from some guest email field
    event.preventDefault();
    let { token } = await stripe.createToken({ name: "Name" });
    let body = {
      stripe_token: token.id,
      user_email: email,
      amount: amount,
      project_name: project.name
    };
    let response = await fetch("http://localhost:3000/charge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (response.ok) confirmPayment(amount);
  };

  return (
    <Container className="checkout-form">
      <div>
        <Header as="h3" style={{ fontSize: "2em" }}>
          Pledging to: {project.name}
        </Header>
        <Input
          focus
          label="Pledge Amount ($)*"
          placeholder="10"
          onChange={handleAmountChange}
        />
      </div>
      <Input
        focus
        label="Email*"
        placeholder="Email"
        onChange={handleEmailChange}
      />
      <Input focus label="Confirm Email*" placeholder="Email" />
      <Container className="stripe-element">
        <CardElement />
      </Container>
      <Button.Group>
        <Button
          positive
          icon="checkmark"
          content="Complete Pledge"
          onClick={submit}
        ></Button>
        <Button.Or />
        <Button
          icon="cancel"
          size="mini"
          content="Cancel"
          onClick={() => cancelPledge()}
        ></Button>
      </Button.Group>
    </Container>
  );
};

export default injectStripe(CheckoutForm);

{
  /* <div>
        <Button
          positive
          icon="checkmark"
          content="Complete Pledge"
          onClick={submit}
        ></Button>
      </div>
      <div>
        <Button
          negative
          icon="cancel"
          size="mini"
          content="Cancel"
          onClick={() => cancelPledge()}
        ></Button>
      </div> */
}
