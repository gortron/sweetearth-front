import React from "react";
import { Step } from "semantic-ui-react";

const CheckoutSteps = props => {
  const { status } = props;

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

  return renderSteps();
};

export default CheckoutSteps;
