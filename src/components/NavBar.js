import React from "react";
import { useAuth0 } from "../react-auth0";
import {
  Responsive,
  Segment,
  Button,
  Menu,
  Container,
  Header
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Segment inverted textAlign="center" vertical>
      <Menu borderless inverted fixed="top" size="large" stackable>
        <Container>
          <Menu.Item position="left">
            <img
              src="https://image.flaticon.com/icons/svg/2439/2439044.svg"
              alt="icon"
            />
          </Menu.Item>
          <Menu.Item header as={Link} to="/">
            sweetearth
          </Menu.Item>
          <Menu.Item as={Link} to="/about">
            About
          </Menu.Item>
          <Menu.Item as={Link} to="/projects">
            Projects
          </Menu.Item>
          <Menu.Item as={Link} to="/pledge">
            Pledge
          </Menu.Item>
          <Menu.Item position="right">
            {isAuthenticated ? (
              <Button onClick={() => logout()}>Log out</Button>
            ) : (
              <Button primary onClick={() => loginWithRedirect({})}>
                Sign Up / Log In
              </Button>
            )}
          </Menu.Item>
        </Container>
      </Menu>
    </Segment>
  );
};

export default NavBar;
