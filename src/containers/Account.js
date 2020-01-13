import React, { useState, useEffect, Fragment } from "react";
import { useAuth0 } from "../react-auth0";
import { Container, Header, Button } from "semantic-ui-react";

const Account = () => {
  const { loading, user, logout } = useAuth0();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user && !userData) getUser();
  });

  const getUser = async () => {
    // this function should take the authenticated user's email address, and use it to query the backend for the user's pledge history
    const endpoint = `http://localhost:3000/users/${user.email}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    setUserData(data);
  };

  const renderPledges = () => {
    debugger;
    if (userData) {
      const pledges = userData.included[0];
      return pledges.map(pledge => {
        return renderPledge(pledge);
      });
    }
  };

  const renderPledge = pledge => {
    return <p>pledge.amount</p>;
  };

  return loading || !user ? (
    <div>Loading...</div>
  ) : (
    <Container className="page">
      <Header
        inverted
        as="h1"
        content="Your Account"
        style={{ fontSize: "3em" }}
      ></Header>
      {renderPledges()}
      <Button onClick={() => logout()}>Log out</Button>
    </Container>
  );
};

export default Account;
