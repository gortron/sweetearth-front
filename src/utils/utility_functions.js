import { useContext } from "react";
import { store } from "../store.js";

// const { state, dispatch } = useContext(store);

const getProjects = async () => {
  const endpoint = `http://localhost:3000/projects`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
  // dispatch({ type: "projects", payload: data });
};

export { getProjects };
