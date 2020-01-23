import React, { useState, useEffect, Fragment, useContext } from "react";
import { store } from "../store";
import { CardElement, injectStripe } from "react-stripe-elements";
import { useAuth0 } from "../utils/react-auth0";

import {
  Button,
  Input,
  Container,
  Header,
  Label,
  Message,
  Popup
} from "semantic-ui-react";

const CheckoutForm = props => {
  const { confirmPayment, cancelPledge, stripe } = props;
  const { state } = useContext(store);
  const { checkout } = state;

  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [issues, setIssues] = useState([]);
  const [issuesVisible, setIssuesVisible] = useState(false);

  const { user } = useAuth0();

  useEffect(() => {
    if (user && email === "") {
      setEmail(user.email);
      setEmailConfirmation(user.email);
    }
  }, [user]);

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
    let temp = [];
    let emailIsValid = /\S+@\S+\.\S+/;

    if (email !== emailConfirmation)
      temp.push("Check that the emails are the same");
    if (!emailIsValid.test(email) || !emailIsValid.test(emailConfirmation))
      temp.push("Check that the emails are valid addresses");
    if (amount < 500) temp.push("Amount needs to be at least $5");
    if (amount > 10000000) temp.push("Amount needs to be less than $100,000");
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
        project_name: checkout.name
      };
      let response = await fetch("http://localhost:3000/charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (response.ok) confirmPayment(amount);
    }
  };

  const renderAmountInput = () => {
    return (
      <div>
        <Input
          focus
          label="Amount ($)*"
          placeholder="e.g. 10"
          onChange={handleAmountChange}
        />
        <Popup
          inverted
          content="Wondering how much to Pledge? As a rough estimate, multiply your hours flown by x1.5, and add a dollar sign in front. So for a 6 hour flight, 6 x 1.5 = $9. This is a back-of-the-envelope estimate. Check out cooleffect.org for more info on calculating your offset, and other projects you can contribute to."
          trigger={
            <Button
              circular
              size="tiny"
              primary
              icon="info"
              style={{ marginLeft: "10px" }}
            />
          }
        />
      </div>
    );
  };

  const renderEmailInputs = () => {
    return user ? (
      <Input disabled label="Email*" value={user.email} />
    ) : (
      <Fragment>
        <Input
          focus
          label="Email*"
          placeholder="e.g. jane.goodall@earth.co"
          onChange={handleEmailChange}
        />
        <Input
          focus
          label="Confirm*"
          placeholder="e.g. jane.goodall@earth.co"
          onChange={handleEmailConfirmationChange}
        />
      </Fragment>
    );
  };

  const renderCardInput = () => {
    return (
      <div className="card-form">
        <div style={{ width: "25%" }}>
          <Label size="large" style={{ height: "85%", width: "100%" }}>
            Payment Card*
          </Label>
        </div>
        <div style={{ width: "75%" }}>
          <CardElement />
        </div>
      </div>
    );
  };

  const renderCheckoutAndCancelButtons = () => {
    return (
      <Button.Group>
        <Button
          primary
          icon="check"
          content="Complete Pledge"
          onClick={submit}
        ></Button>
        <Button.Or />
        <Button
          size="mini"
          icon="x"
          content="Cancel"
          onClick={() => cancelPledge()}
        ></Button>
      </Button.Group>
    );
  };

  {
    /* <div>
          <Header as="h3" style={{ fontSize: "2em" }}>
            Pledging to: {checkout.name}
          </Header>
        </div> */
  }

  return (
    <Fragment>
      <Container className="checkout-form">
        {renderAmountInput()}
        {renderEmailInputs()}
        {renderCardInput()}
        {renderCheckoutAndCancelButtons()}
      </Container>
      <div>{renderIssues()}</div>
    </Fragment>
  );
};

export default injectStripe(CheckoutForm);
