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
    if (userData) {
      return userData.pledges.map((pledge, idx) => {
        return (
          <div key={idx} className="user-pledges">
            <Header inverted>
              ${pledge.amount / 100} for {pledge.project.name}
            </Header>
          </div>
        );
      });
    }
  };

  return loading || !user ? (
    <div>Loading...</div>
  ) : (
    <Container className="account">
      <Header
        inverted
        as="h1"
        content="Your Account"
        style={{ fontSize: "3em" }}
      ></Header>
      <p style={{ fontSize: "1.33em" }}>
        This is your account page. Here, you can see a history of your pledges,
        or log out.
      </p>
      <br />
      <br />
      <Header
        inverted
        as="h1"
        content="Your Pledge History"
        style={{ fontSize: "3em" }}
      ></Header>

      {renderPledges()}
      <Button className="logout-button" onClick={() => logout()}>
        Log out
      </Button>
    </Container>
  );
};

export default Account;
