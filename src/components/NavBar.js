import React from "react";
import { useAuth0 } from "../react-auth0";
import { Segment, Button, Menu, Container, Header } from "semantic-ui-react";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Segment inverted textAlign="center" vertical>
      <Menu borderless inverted fixed="top" size="large">
        <Container>
          <Menu.Item>
            <img
              src="https://image.flaticon.com/icons/svg/2439/2439044.svg"
              alt="icon"
            />
          </Menu.Item>
          <Menu.Item>
            <Header inverted contentAlign="middle">
              sweetearth
            </Header>
          </Menu.Item>
          <Menu.Item as="a">About</Menu.Item>
          <Menu.Item as="a">Projects</Menu.Item>
          <Menu.Item as="a">Pledge</Menu.Item>
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
