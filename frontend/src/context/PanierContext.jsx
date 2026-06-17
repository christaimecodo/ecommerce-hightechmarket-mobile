// ============================================================
// PanierContext.jsx — Contexte global du panier
// ============================================================
// Un "contexte" React permet de partager des données entre plusieurs
// écrans SANS avoir à les passer manuellement de parent en enfant.
//
// Ce fichier crée le contexte du panier. Grâce à lui, n'importe quel
// écran (Catalogue, Panier, etc.) peut :
//   - lire le contenu du panier  → panier
//   - ajouter un produit         → ajouterAuPanier(produit)
//   - modifier ou vider          → setPanier([])
// ============================================================

import React, { createContext, useCallback, useContext, useState } from 'react';

// createContext() crée un espace de partage vide.
// On le remplira avec les données du panier dans PanierProvider ci-dessous.
const PanierContext = createContext();

// PanierProvider est le composant qui "fournit" les données du panier.
// Il est placé autour de toute l'app dans MyAppec.js, ce qui permet à
// tous les écrans d'accéder au panier sans se le passer en paramètre.
export const PanierProvider = ({ children }) => {

  // panier : tableau des produits ajoutés au panier.
  // Exemple : [{ id: '1', name: 'Laptop', prix: '699€', quantite: 2 }, ...]
  // Au démarrage le panier est vide [].
  const [panier, setPanier] = useState([]);

  // ajouterAuPanier : fonction pour ajouter un produit au panier.
  // useCallback mémorise la fonction pour ne pas la recréer à chaque rendu,
  // ce qui améliore légèrement les performances.
  const ajouterAuPanier = useCallback((produit) => {
    setPanier((prevPanier) => {
      // On cherche si ce produit est déjà dans le panier (par son id)
      const index = prevPanier.findIndex((p) => p.id === produit.id);

      if (index !== -1) {
        // Produit déjà présent → on augmente seulement sa quantité
        const copie = [...prevPanier]; // copie du tableau (on ne modifie jamais l'original)
        const quantiteActuelle = copie[index].quantite || 1;

        copie[index] = {
          ...copie[index],                                       // conserve les autres infos
          quantite: quantiteActuelle + (produit.quantite || 1), // ajoute 1 à la quantité
        };

        return copie; // renvoie le panier modifié
      }

      // Produit pas encore dans le panier → on l'ajoute avec quantite = 1 par défaut
      return [...prevPanier, { ...produit, quantite: produit.quantite || 1 }];
    });
  }, []);

  return (
    // PanierContext.Provider rend les données disponibles pour tous les écrans enfants.
    // La prop "value" contient tout ce qu'on veut partager.
    <PanierContext.Provider value={{ panier, setPanier, ajouterAuPanier }}>
      {children}
    </PanierContext.Provider>
  );
};

// usePanier est un hook utilitaire.
// Dans n'importe quel écran, il suffit d'écrire :
//   const { panier, ajouterAuPanier } = usePanier();
// pour avoir accès au panier et aux fonctions.
export const usePanier = () => useContext(PanierContext);
