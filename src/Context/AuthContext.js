import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(window.localStorage.getItem("jwtToken") || null);

  const login = (token) => {
    setJwtToken(token);
  };

  const logout = () => {
    setJwtToken(null);
  };

  return (
    <AuthContext.Provider value={{ jwtToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
