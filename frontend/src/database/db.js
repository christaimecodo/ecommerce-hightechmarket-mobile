// ============================================================
// db.js — Ouverture de la base de données SQLite locale
// ============================================================
// SQLite est une petite base de données qui s'installe directement
// sur le téléphone. Pas besoin d'internet ni de serveur distant.
// Elle sert ici à stocker les comptes utilisateurs (inscription/connexion).
//
// Ce fichier contient une seule fonction : openDB()
// Elle ouvre (ou crée si elle n'existe pas) la base de données.
// Tous les autres fichiers de base de données importent cette fonction.
// ============================================================

import * as SQLite from 'expo-sqlite';
// expo-sqlite est le module Expo qui permet d'utiliser SQLite dans React Native.

// openDB : ouvre la connexion à la base de données SQLite.
// Le mot "async" signifie que cette opération prend du temps
// et qu'on doit attendre qu'elle soit terminée avant de continuer.
export const openDB = async () => {

  // openDatabaseAsync("produits") ouvre la base nommée "produits".
  // Si elle n'existe pas encore sur le téléphone, elle est créée automatiquement.
  const db = await SQLite.openDatabaseAsync("produits");

  // On retourne la connexion pour que les autres fichiers puissent l'utiliser.
  return db;
};
