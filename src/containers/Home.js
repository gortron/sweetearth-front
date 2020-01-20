import React from "react";
import { Container, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container fluid className="home">
      <Container fluid className="home-hero">
        <Header
          inverted
          as="h1"
          content="Give back to our sweet earth."
          style={{
            fontSize: "3em"
          }}
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
        <Container>
          <Header
            as="h3"
            content="sweetearth makes it easy to give."
            style={{ fontSize: "2em" }}
          ></Header>
        </Container>
        <div className="overview-element">
          <Header
            as="h3"
            content="⚡️ Quick"
            style={{ fontSize: "2em" }}
          ></Header>
          <p>
            You can make a meaningful contribution in 3 clicks. And we're
            working on getting it down to one. Pledge now to see which projects
            you can contribute to today.
          </p>
          <Button
            size="mini"
            content="Pledge Now"
            as={Link}
            to="/pledge"
          ></Button>
        </div>
        <div className="overview-element">
          <Header
            as="h3"
            content="💎 Curated"
            style={{ fontSize: "2em" }}
          ></Header>
          <p>
            The projects featured on sweetearth have been curated for their
            ecological impact, certification, and alignment with DrawDown.
          </p>
          <Button
            size="mini"
            content="See Projects"
            as={Link}
            to="/projects"
          ></Button>
        </div>
        <div className="overview-element">
          <Header
            as="h3"
            content="🔐 Secure"
            style={{ fontSize: "2em" }}
          ></Header>
          <p>
            sweetearth doesn't hold on to your payment information, and payments
            are handled by Stripe, an industry standard.
          </p>
        </div>
        <div className="overview-element">
          <Header
            as="h3"
            content="💭 Purpose"
            style={{ fontSize: "2em" }}
          ></Header>
          <p>
            The goal of this site is to make it as easy as possible to
            contribute to projects that are making a meaningful impact for our
            sweet earth.
          </p>
        </div>
      </Container>
    </Container>
  );
};

export default Home;
