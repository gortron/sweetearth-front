import React, { useContext } from "react";
import { useAuth0 } from "../utils/react-auth0";
import { Dropdown, Menu, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { store } from "../store";

const NavBar = () => {
  const { state } = useContext(store);
  const { mobile } = state;

  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  const handleAuth = async () => {
    await loginWithRedirect({});
    isAuthenticated &&
      fetch("https://sweetearth.herokuapp.com/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });
  };

  const renderMobile = () => {
    return (
      <Container className="nav">
        <Menu borderless fixed="top" size="large">
          <Menu.Item>
            <img
              src="https://image.flaticon.com/icons/svg/2439/2439044.svg"
              alt="icon"
            />
          </Menu.Item>
          <Menu.Item header as={Link} to="/">
            sweetearth
          </Menu.Item>
          <Menu.Item>
            <Dropdown text="Menu" position="left">
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/about">
                  About
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/projects">
                  Projects
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/pledge">
                  Pledge
                </Dropdown.Item>
                {isAuthenticated ? (
                  <Dropdown.Item as={Link} to="/account" position="right">
                    My Account
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item position="right" onClick={() => handleAuth()}>
                    Sign Up / Log In
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu>
      </Container>
    );
  };

  const renderDesktop = () => {
    return (
      <Container className="nav">
        <Menu borderless fixed="top" size="large" stackable>
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
              My Account
            </Menu.Item>
          ) : (
            <Menu.Item position="right" onClick={() => handleAuth()}>
              Sign Up / Log In
            </Menu.Item>
          )}
        </Menu>
      </Container>
    );
  };

  return mobile ? renderMobile() : renderDesktop();
};

export default NavBar;
