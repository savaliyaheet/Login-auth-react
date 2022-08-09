import React, { useState } from "react";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = () => {
    setToken(localStorage.getItem("token"));
  };

  const logout = () => {
    localStorage.clear("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;