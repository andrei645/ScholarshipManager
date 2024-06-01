import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";

const SchoolarContext = createContext();

export const useMySchoolarContext = () => useContext(SchoolarContext);

export const SchoolProvider = ({ children }) => {
  const [state, setState] = useState({
    userDetails: {
      id: "",
      firstname: "",
      lastName: "",
      role: "",
      email: "",
    },
    count: 1,
  });

  useEffect(() => {
    if (sessionStorage.getItem("auth_code")) {
      const decodedToken = jwtDecode(sessionStorage.getItem("auth_code"));
      setUserData(decodedToken);
    }
  }, [sessionStorage.getItem("auth_code")]);

  const setUserData = (payload) => {
    setState((prevState) => ({ ...prevState, userDetails: payload }));
  };
  return (
    <SchoolarContext.Provider value={{ state, setUserData }}>
      {children}
    </SchoolarContext.Provider>
  );
};
