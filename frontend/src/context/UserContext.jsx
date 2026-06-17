// ============================================================
// UserContext.jsx — Contexte global de l'utilisateur connecté
// ============================================================
// Ce fichier gère les informations de l'utilisateur connecté.
// Il fonctionne comme un "sac à dos" partagé :
// une fois qu'on s'est connecté, toutes les pages de l'app
// peuvent savoir qui est connecté, sans qu'on ait besoin de
// passer l'info manuellement d'un écran à l'autre.
//
// Ce contexte partage trois choses :
//   - user      : les infos de l'utilisateur (ou null si pas connecté)
//   - setUser   : fonction pour mettre à jour l'utilisateur (connexion)
//   - logout    : fonction pour déconnecter l'utilisateur
// ============================================================

import React, { createContext, useContext, useState } from "react";

// createContext(null) crée l'espace de partage.
// null signifie qu'au départ, personne n'est connecté.
const UserContext = createContext(null);

// UserProvider englobe l'application entière (dans MyAppec.js).
// Tous les écrans à l'intérieur peuvent alors lire les infos de l'utilisateur.
export const UserProvider = ({ children }) => {

  // user stocke les infos de l'utilisateur connecté.
  // Quand personne n'est connecté : user = null
  // Quand quelqu'un est connecté : user = { id, nom, prenom, email, telephone }
  const [user, setUser] = useState(null);

  // logout : déconnecte l'utilisateur en remettant user à null
  const logout = () => {
    setUser(null);
  };

  return (
    // UserContext.Provider rend user, setUser et logout disponibles
    // pour tous les composants enfants de l'application.
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// useUser est un hook utilitaire.
// Dans n'importe quel écran, on écrit :
//   const { user, logout } = useUser();
// pour savoir qui est connecté ou pour le déconnecter.
export const useUser = () => useContext(UserContext);
