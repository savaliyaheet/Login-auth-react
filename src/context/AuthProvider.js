import React, { useState } from "react";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  const login = () => {
    setToken(localStorage.getItem("token"));
  };

  const logout = () => {
    localStorage.clear("token");
    setToken(null);
  };

  const userAdd = (newuser) => {
    setUser(newuser);
  };
  return (
    <AuthContext.Provider value={{ token, login, logout, user, userAdd }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
