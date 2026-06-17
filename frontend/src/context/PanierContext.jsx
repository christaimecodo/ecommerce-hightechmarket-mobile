
import React, { createContext, useCallback, useContext, useState } from 'react';

const PanierContext = createContext();

export const PanierProvider = ({ children }) => {
  const [panier, setPanier] = useState([]);

  // fonction pour ajouter un produit sans doublon
  const ajouterAuPanier = useCallback ((produit) => {
    setPanier((prevPanier) => {
      // on cherche si le produit existe déjà
      const index = prevPanier.findIndex((p) => p.id === produit.id);

      if (index !== -1) {
        // déjà présent → on augmente la quantité
        const copie = [...prevPanier];
        const quantiteActuelle = copie[index].quantite || 1;

        copie[index] = {
          ...copie[index],
          quantite: quantiteActuelle + (produit.quantite || 1),
        };

        return copie;
      }

      // pas encore dans le panier → on l'ajoute avec quantite = 1 (par défaut)
      return [...prevPanier, { ...produit, quantite: produit.quantite || 1 }];
    });
  }, []);

  return (
    <PanierContext.Provider value={{ panier, setPanier, ajouterAuPanier }}>
      {children}
    </PanierContext.Provider>
  );
};

export const usePanier = () => useContext(PanierContext);
