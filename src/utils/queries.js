import { useEffect, useContext } from "react";

const URL_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://sweetearth.herokuapp.com/"
    : "http://localhost:3000/";

const useProjectsDispatch = (url, store, type, dependencies = []) => {
  const { state, dispatch } = useContext(store);
  useEffect(() => {
    const fetchAndDispatchProjects = async url => {
      const response = await fetch(URL_ENDPOINT + url);
      const payload = await response.json();
      dispatch({ type, payload });
    };
    if (!state.projects) fetchAndDispatchProjects(url);
  }, dependencies);
};

export { useProjectsDispatch };
