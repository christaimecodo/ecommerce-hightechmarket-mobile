// Contexte/UserContext.js
import React, { createContext, useContext, useState } from "react";

// Création du contexte
const UserContext = createContext(null);

// Provider qui englobe l'application
export const UserProvider = ({ children }) => {
  // user = null quand personne n'est connecté
  // ou un objet du style : { id, nom, prenom, email, telephone }
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook  pour utiliser le contexte
export const useUser = () => useContext(UserContext);
