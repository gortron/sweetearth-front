import { useEffect, useContext } from "react";

// const getProjects = async () => {
//   const endpoint = `http://localhost:3000/projects`;
//   const response = await fetch(endpoint);
//   const data = await response.json();
//   return data;
// };
const useProjectsDispatch = (url, store, type, dependencies = []) => {
  const { state, dispatch } = useContext(store);
  useEffect(() => {
    const fetchAndDispatchProjects = async url => {
      const response = await fetch(url);
      const payload = await response.json();
      dispatch({ type, payload });
    };
    if (!state.projects) fetchAndDispatchProjects(url);
  }, dependencies);
};

export { useProjectsDispatch };
