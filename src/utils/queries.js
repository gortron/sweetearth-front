import { useEffect, useContext } from "react";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://sweetearth.herokuapp.com/"
    : "http://localhost:3000/";

const getUser = async endpoint => {
  // this function should take the authenticated user's email address, and use it to query the backend for the user's pledge history
  // const endpoint = `https://sweetearth.herokuapp.com/users/${user.email}`;
  const response = await fetch(API_URL + endpoint);
  const data = await response.json();
  // setUserData(data);
  return data;
};

const postCharge = async body => {
  const response = await fetch(API_URL + "charge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return response;
};

const useProjectsDispatch = (endpoint, store, type, dependencies = []) => {
  const { state, dispatch } = useContext(store);
  useEffect(() => {
    const fetchAndDispatchProjects = async endpoint => {
      const response = await fetch(API_URL + endpoint);
      const payload = await response.json();
      dispatch({ type, payload });
    };
    if (!state.projects) fetchAndDispatchProjects(endpoint);
  }, dependencies);
};

export { useProjectsDispatch, getUser, postCharge };
