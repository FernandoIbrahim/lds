// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Cria o contexto
const UserContext = createContext();

// Provedor do contexto
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [token, setToken] = useState(null)
  const [mudar, setMudar] = useState(0)

  return (
    <UserContext.Provider value={{ userId, setUserId, userType, setUserType, token, setToken, mudar, setMudar }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar o contexto
export const useUserContext = () => {
  return useContext(UserContext);
};
