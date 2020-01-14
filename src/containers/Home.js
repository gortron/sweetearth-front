import React from "react";
import { Segment, Container, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container fluid className="home">
      <Container fluid className="hero">
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
      <Container className="overview">
        <Header
          as="h3"
          content="sweetearth makes it easy to give."
          style={{ fontSize: "2em" }}
        ></Header>
        <Container className="overview-element">
          <Header
            as="h3"
            content="Purpose"
            style={{ fontSize: "2em" }}
          ></Header>
          <p>
            The constraint of sweetearth is this: make a contribution to an
            accredited ecological project in as few clicks as possible. You can
            do so in 3 clicks, in fact. I hope the tool is easy enough to use
            that you feel more encouraged to help tend to our sweetearth by
            pledging contributions for impactful projects.
          </p>
        </Container>
        <Container className="overview-element">
          <Header
            as="h3"
            content="Purpose"
            style={{ fontSize: "2em" }}
          ></Header>
          <p>
            The constraint of sweetearth is this: make a contribution to an
            accredited ecological project in as few clicks as possible. You can
            do so in 3 clicks, in fact. I hope the tool is easy enough to use
            that you feel more encouraged to help tend to our sweetearth by
            pledging contributions for impactful projects.
          </p>
        </Container>
      </Container>
    </Container>
  );
};

export default Home;
