import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0";

const Account = () => {
  const { user } = useAuth0();
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

  return <h6>{user.name}'s Account</h6>;
};

export default Account;
