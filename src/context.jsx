import React, { createContext, useState, useEffect } from "react";
import { API } from "./api";

export const MyContext = createContext("");

const AppContext = ({ children }) => {
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsAuthenticated(true);
    }
  }, []);
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log(user);
      fetch(`${API}/users/auth`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => setUserRole(data.role));
    }
  }, [isAuthenticated]);
  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default AppContext;
