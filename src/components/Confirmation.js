import React, { Fragment } from "react";
import { Container, Header } from "semantic-ui-react";
import "@lottiefiles/lottie-player";

const Confirmation = props => {
  const { amount, checkoutName } = props;

  const renderConfirmation = () => {
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
          Your pledge has been confirmed. You gave ${amount} to {checkoutName}.
          We've sent you an email with a confirmation number.
        </p>
      </Fragment>
    );
  };
  return renderConfirmation();
};

export default Confirmation;
