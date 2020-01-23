import React, { Fragment } from "react";
import { Container, Header } from "semantic-ui-react";
import "@lottiefiles/lottie-player";

const Confirmation = props => {
  const { amount, checkoutName } = props;

  const renderConfirmation = () => {
    return (
      <Fragment>
        <Header style={{ fontSize: "2em" }}>
          You did it! Here's a haiku, as a treat:
        </Header>
        <Header as="h4" style={{ fontSize: "1.33em", color: "#41aa14" }}>
          <i>
            Spring is passing.
            <br />
            The birds cry, and the fishes’ eyes are <br />
            With tears. - Basho
          </i>
        </Header>

        <p style={{ marginTop: "30px" }}>
          Your pledge has been confirmed. You gave ${amount} to {checkoutName}.
          We've sent you an email with a confirmation number.
        </p>

        <Container>
          <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
          <lottie-player
            src="https://assets8.lottiefiles.com/animated_stickers/lf_tgs_8W1fY7.json"
            mode="bounce"
            background="transparent"
            speed=".75"
            style={{ marginTop: "20px" }}
            loop
            autoplay
          ></lottie-player>
        </Container>
      </Fragment>
    );
  };
  return renderConfirmation();
};

export default Confirmation;
