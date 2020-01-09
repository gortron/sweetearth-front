import React from "react";
import { Segment, Container, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="content">
      <Header
        inverted
        as="h1"
        content="Give back to our sweet earth."
        style={{ fontSize: "3em" }}
      ></Header>
      <Button
        primary
        size="huge"
        content="Pledge Today"
        as={Link}
        to="/pledge"
      ></Button>
    </Container>
  );
};

export default Home;
