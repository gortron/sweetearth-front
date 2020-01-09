import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0";
import { Dropdown, Segment, Button, Menu, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    loading,
    user
  } = useAuth0();

  return (
    <Container as="nav">
      <Menu borderless inverted fixed="top" size="large" stackable>
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
        {user ? (
          <Menu.Item as={Link} to="/account" position="right">
            🌱 {user.email}
          </Menu.Item>
        ) : (
          <Menu.Item position="right">
            <Button primary onClick={() => loginWithRedirect({})}>
              Sign Up / Log In
            </Button>
          </Menu.Item>
        )}
      </Menu>
    </Container>
  );
};

export default NavBar;

{
  /* <Button onClick={() => logout()}>Log out</Button> */
}

{
  /* <Dropdown item text="dropdown">
{user.name}
<Dropdown.Menu>
<Dropdown.Item as={Link} to="/account">
My Account
</Dropdown.Item>
<Dropdown.Item onClick={() => logout()}>Log Out</Dropdown.Item>
</Dropdown.Menu>
</Dropdown> */
}

{
  /* <Fragment>
<Menu.Item as={Link} to="/account" position="right">
{user.email}
</Menu.Item>
<Menu.Item position="right">
<Button onClick={() => logout()}>Log out</Button>
</Menu.Item>
</Fragment> */
}
