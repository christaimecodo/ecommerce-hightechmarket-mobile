// ============================================================
// Task.js — Opérations sur la table Users (lecture et écriture)
// ============================================================
// Ce fichier contient les fonctions qui interagissent directement
// avec la base de données SQLite pour gérer les comptes utilisateurs.
//
// Deux fonctions disponibles :
//   - InsertUser : ajoute un nouvel utilisateur (lors de l'inscription)
//   - VerifUser  : vérifie si un utilisateur existe (lors de la connexion)
// ============================================================

import { openDB } from "./db";
// openDB ouvre la connexion à la base de données SQLite locale.

// -------------------------------------------------------
// InsertUser — Enregistre un nouvel utilisateur dans la base
// -------------------------------------------------------
// Appelée depuis l'écran Inscription quand le formulaire est validé.
// Paramètres : nom, prénom, email, téléphone, mot de passe.
export const InsertUser = async (nom, prenom, email, telephone, motDePasse) => {
  const db = await openDB();

  // On supprime les espaces éventuels dans le numéro de téléphone
  // (ex: "06 12 34 56 78" devient "0612345678")
  const telNettoye = telephone.replace(/\s/g, "");

  // INSERT INTO : commande SQL pour ajouter une ligne dans la table Users.
  // Les "?" sont des espaces réservés remplacés par les valeurs du tableau.
  // C'est une bonne pratique de sécurité (évite les injections SQL).
  await db.runAsync(
    'INSERT INTO Users (Nom, Prenom, Email, Telephone, Password) VALUES (?,?,?,?,?);',
    [nom, prenom, email, telNettoye, motDePasse]
  );

  console.log(`Utilisateur "${prenom} ${nom}" inscrit avec succes`);
};

// -------------------------------------------------------
// VerifUser — Vérifie si l'email et le mot de passe correspondent
// -------------------------------------------------------
// Appelée depuis l'écran Connexion quand l'utilisateur soumet le formulaire.
// Retourne les infos de l'utilisateur si trouvé, null sinon.
export const VerifUser = async (email, motDePasse) => {
  const db = await openDB();

  // SELECT * : récupère toutes les colonnes de la table Users
  // WHERE Email = ? AND Password = ? : filtre par email ET mot de passe
  const result = await db.getAllAsync(
    'SELECT * FROM Users WHERE Email = ? AND Password = ?;',
    [email, motDePasse]
  );

  // Si au moins un résultat → l'utilisateur existe, on retourne ses infos
  // Sinon → email ou mot de passe incorrect, on retourne null
  return result.length > 0 ? result[0] : null;
};
