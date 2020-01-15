import React, { useEffect } from "react";
import { useAuth0 } from "../react-auth0";
import { Dropdown, Segment, Button, Menu, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    loading,
    user,
    renewToken
  } = useAuth0();

  const handleAuth = async () => {
    await loginWithRedirect({});
    isAuthenticated &&
      fetch("http://localhost:3000/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });
  };

  // const saveOrCreateUser = async () => {
  //   await fetch("http://localhost:3000/users/create", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(user)
  //   });
  // };

  return (
    <Container as="nav">
      <Menu borderless inverted fixed="top" size="large" stackable>
        <Menu.Item>
          <img
            src="https://image.flaticon.com/icons/svg/2439/2439044.svg"
            alt="icon"
          />
        </Menu.Item>
        <Menu.Item header as={Link} to="/" position="left">
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
        {isAuthenticated ? (
          <Menu.Item as={Link} to="/account" position="right">
            Account
          </Menu.Item>
        ) : (
          <Menu.Item position="right">
            <Button primary onClick={() => handleAuth()}>
              Sign Up / Log In
            </Button>
          </Menu.Item>
        )}
      </Menu>
    </Container>
  );
};

export default NavBar;
