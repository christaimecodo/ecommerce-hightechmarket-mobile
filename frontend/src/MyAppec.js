// ============================================================
// MyAppec.js — Composant racine de l'application
// ============================================================
// Ce fichier est le "chef d'orchestre" de toute l'application.
// Il met en place trois choses essentielles :
//   1. UserProvider    : partage les infos de l'utilisateur connecté
//                        avec tous les écrans (connexion, profil, etc.)
//   2. PanierProvider  : partage le contenu du panier avec tous les écrans
//   3. NavigationContainer + StackNavigator : gère la navigation
//                        entre les différents écrans (Accueil, Catalogue, etc.)
// ============================================================

import React from 'react';

// NavigationContainer est le conteneur global de navigation.
// Il doit obligatoirement entourer tout le système de navigation.
import { NavigationContainer } from '@react-navigation/native';

// StackNavigator : navigation en "pile" — on empile les écrans,
// et le bouton "Retour" dépile pour revenir à l'écran précédent.
import { StackNavigator } from './composants/StackNavigator';

// DrawerNavigator : navigation avec un menu latéral (tiroir).
// Il n'est pas utilisé ici mais disponible si on veut le réactiver.
import { DrawerNavigator } from './composants/DrawerNavigator';

// PanierProvider : rend le panier accessible depuis tous les écrans.
// Sans lui, il faudrait passer le panier manuellement à chaque écran.
import { PanierProvider } from './context/PanierContext';

// UserProvider : rend les infos de l'utilisateur connecté accessibles partout.
import { UserProvider } from './context/UserContext';

export const MyAppec = () => {
  return (
    // UserProvider englobe tout : les infos de connexion sont disponibles partout
    <UserProvider>
      {/* PanierProvider englobe la navigation : le panier est disponible partout */}
      <PanierProvider>
        {/* NavigationContainer est obligatoire pour que la navigation fonctionne */}
        <NavigationContainer>
          {/* StackNavigator contient tous les écrans de l'application */}
          <StackNavigator />
        </NavigationContainer>
      </PanierProvider>
    </UserProvider>
  );
};
