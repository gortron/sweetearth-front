import React from "react";
import {
  Responsive,
  Segment,
  Button,
  Menu,
  Container,
  Header
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Menu
        borderless
        inverted
        as="footer"
        fixed="bottom"
        size="small"
        stackable
      >
        <Menu.Item as={Link} to="/about">
          About
        </Menu.Item>
        <Menu.Item as={Link} to="/projects">
          Projects
        </Menu.Item>
        <Menu.Item as={Link} to="/pledge">
          Pledge
        </Menu.Item>
        <Menu.Item
          href="https://github.com/gortron/sweetearth-front"
          target="_blank"
        >
          github
        </Menu.Item>
        <Menu.Item position="right">Made with ❤️ © 2019 </Menu.Item>
      </Menu>
    </Container>
  );
};

export default Footer;
