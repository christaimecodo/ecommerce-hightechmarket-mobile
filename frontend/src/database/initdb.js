// ============================================================
// initdb.js — Initialisation de la base de données
// ============================================================
// Ce fichier crée la table "Users" dans la base SQLite si elle
// n'existe pas encore. Une table, c'est comme un tableau Excel :
// elle a des colonnes (id, Nom, Prenom, Email...) et des lignes
// (une par utilisateur inscrit).
//
// Cette fonction est appelée au chargement des écrans Connexion
// et Inscription pour s'assurer que la table existe avant d'essayer
// d'y lire ou d'y écrire.
// ============================================================

import { openDB } from "./db";
// On importe openDB pour pouvoir ouvrir la base de données.

// InitDB : crée la table Users si elle n'existe pas encore.
export const InitDB = async () => {

  // On ouvre la connexion à la base SQLite locale
  const db = await openDB();

  // execAsync exécute une commande SQL.
  // "CREATE TABLE IF NOT EXISTS" : crée la table SEULEMENT si elle n'existe pas déjà.
  // Cela évite d'effacer les données existantes à chaque démarrage.
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Users (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      Nom       TEXT,
      Prenom    TEXT,
      Email     TEXT,
      Telephone TEXT,
      Password  TEXT
    );
  `);
  // Explication des colonnes :
  //   id        : numéro unique attribué automatiquement à chaque utilisateur
  //   Nom       : nom de famille
  //   Prenom    : prénom
  //   Email     : adresse email (utilisée pour se connecter)
  //   Telephone : numéro de téléphone
  //   Password  : mot de passe (attention : stocké en clair ici, sans chiffrement)

  console.log('Table "Users" prete');
};
