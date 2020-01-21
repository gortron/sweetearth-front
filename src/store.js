import React, { createContext, useReducer } from "react";

const initialState = { mobile: true, projects: null, checkout: null };
const store = createContext(initialState);
const { Provider } = store;

// provide state for mobile display, checked out project, and projects list. user is handled in react-auth0.
const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "mobile": {
        return { ...state, mobile: action.payload };
      }
      case "checkout": {
        return { ...state, checkout: action.payload };
      }
      case "projects": {
        return { ...state, projects: action.payload };
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
