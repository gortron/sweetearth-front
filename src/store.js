import React, { createContext, useReducer } from "react";

const initialState = { mobile: true, projects: null, checkout: null };
const store = createContext(initialState);
const { Provider } = store;
const AppDispatchContext = createContext();

// const appReducer = (state, action) => {
//   switch (action.type) {
//     case "mobile": {
//       return { mobile: true };
//     }
//     case "desktop": {
//       return { mobile: false };
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// };

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
  {
    /* <AppStateContext.Provider value={state}>
      <AppDispatchContext value={dispatch}>{children}</AppDispatchContext>
    </AppStateContext.Provider> */
  }
};

export { store, StateProvider };

// const useAppState = () => {
//   const context = React.useContext(AppStateContext);
//   if (context === undefined) {
//     throw new Error("useAppState must be used within an AppProvider");
//   }
//   return context;
// };

// const useAppDispatch = () => {
//   const context = React.useContext(AppDispatchContext);
//   if (context === undefined) {
//     throw new Error("useAppDispatch must be used within an AppProvider");
//   }
//   return context;
// };

// const useApp = () => [useAppState(), useAppDispatch()];

// export { AppProvider, useAppState, useAppDispatch, useApp };
