import React, { useState, useEffect, Fragment } from "react";
import { useAuth0 } from "../react-auth0";
import { Button } from "semantic-ui-react";

const Account = () => {
  const { user, logout } = useAuth0();
  const [userData, setUserData] = useState({});

  const getUser = async user => {
    // this function should take the authenticated user's email address, and use it to query the backend for the user's pledge history
    const endpoint = `http://localhost:3000/users/${user.email}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    setUserData(data);
  };

  useEffect(() => {
    // getUser()
  });

  return (
    <Fragment>
      <h6>{user.name}'s Account</h6>
      <Button onClick={() => logout()}>Log out</Button>
    </Fragment>
  );
};

export default Account;
