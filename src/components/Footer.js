import React from "react";
import {
  Responsive,
  Segment,
  Button,
  Menu,
  Container,
  Header
} from "semantic-ui-react";
import { Router, Route, Switch } from "react-router-dom";

const Footer = () => {
  return (
    <Segment inverted textAlign="center" vertical>
      <Menu borderless inverted fixed="bottom" size="large" stackable>
        <Container>
          <Menu.Item as="a">About</Menu.Item>
          <Menu.Item as="a">Projects</Menu.Item>
          <Menu.Item as="a">Pledge</Menu.Item>
          <Menu.Item as="a">github</Menu.Item>
          <Menu.Item position="right">Made with ❤️ © 2019 </Menu.Item>
        </Container>
      </Menu>
    </Segment>
  );
};

export default Footer;
