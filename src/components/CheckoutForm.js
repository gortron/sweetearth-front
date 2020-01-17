import React, { useState, Fragment, useEffect } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { useAuth0 } from "../react-auth0";

import {
  Button,
  Input,
  Container,
  Header,
  Label,
  Message
} from "semantic-ui-react";

const CheckoutForm = props => {
  const { project, confirmPayment, stripe, cancelPledge } = props;
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [issues, setIssues] = useState([]);
  const [issuesVisible, setIssuesVisible] = useState(false);

  const { loading, user } = useAuth0();

  // useEffect(() => {
  //   if (user && email === "") {
  //     setEmail(user.email);
  //     setEmailConfirmation(user.email);
  //   }
  // });

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handleEmailConfirmationChange = event => {
    setEmailConfirmation(event.target.value);
  };

  const handleAmountChange = event => {
    setAmount(event.target.value * 100); // *100 will convert $ to ¢
  };

  const renderIssues = () => {
    if (issuesVisible) {
      return (
        <Message
          error
          header="Oops! Something went wrong:"
          onDismiss={handleDismiss}
          list={issues}
        ></Message>
      );
    }
  };

  const handleDismiss = () => {
    setIssuesVisible(false);
    setIssues([]);
  };

  const fieldsAreValid = token => {
    debugger;
    let temp = [];
    let emailIsValid = /\S+@\S+\.\S+/;

    if (email !== emailConfirmation)
      temp.push("Check that the emails are the same");
    if (!emailIsValid.test(email) || !emailIsValid.test(emailConfirmation))
      temp.push("Check that the emails are valid addresses");
    if (amount < 500) temp.push("Amount needs to be at least $5");
    if (!token) temp.push("Check that the card information is valid");

    if (temp.length !== 0) {
      setIssuesVisible(true);
      setIssues(temp);
      return false;
    }
    return true;
  };

  const submit = async event => {
    // User email is either user.email from Auth0 OR from some guest email field
    // Maybe stripe does not return a token if the field is invalid ?
    event.preventDefault();
    let { token } = await stripe.createToken({ name: "Name" });
    if (fieldsAreValid(token)) {
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
    }
  };

  return (
    <Fragment>
      <Container className="checkout-form">
        <div>
          <Header as="h3" style={{ fontSize: "2em" }}>
            Pledging to: {project.name}
          </Header>
          <Input
            focus
            label="Pledge Amount ($)*"
            placeholder="e.g. 10"
            onChange={handleAmountChange}
          />
        </div>
        <Input
          focus
          label="Email*"
          placeholder="e.g. jane.goodall@earth.co"
          onChange={handleEmailChange}
        />
        <Input
          focus
          label="Confirm Email*"
          placeholder="e.g. jane.goodall@earth.co"
          onChange={handleEmailConfirmationChange}
        />
        <div className="card-form">
          <div>
            <Label size="big">Payment Card</Label>
          </div>
          <div>
            <CardElement />
          </div>
        </div>
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
      <div>{renderIssues()}</div>
    </Fragment>
  );
};

export default injectStripe(CheckoutForm);
