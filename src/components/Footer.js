import React, { useContext } from "react";
import { store } from "../store";
import {
  Responsive,
  Segment,
  Button,
  Menu,
  Container,
  Header
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const Footer = props => {
  // const { mobile } = props;
  const { state, dispatch } = useContext(store);
  const { mobile } = state;

  const renderDesktop = () => {
    return (
      <Container>
        <Menu
          borderless
          className="footer"
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

  const renderMobile = () => {
    return (
      <Container>
        <Menu borderless className="footer" fixed="bottom" size="small">
          <Menu.Item>Made with ❤️ © 2019 </Menu.Item>
        </Menu>
      </Container>
    );
  };

  return mobile ? renderMobile() : renderDesktop();
};

export default Footer;
