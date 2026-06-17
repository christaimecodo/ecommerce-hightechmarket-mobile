// ============================================================
// Article.jsx — Composant d'affichage d'un produit
// ============================================================
// Ce composant représente la "carte" d'un produit dans le catalogue.
// Il affiche l'image, le nom, le prix et deux boutons :
//   - "Ajouter" : ajoute le produit au panier
//   - "Détails" : affiche une fenêtre avec les détails du produit
//
// C'est un composant "réutilisable" : on l'utilise une fois par produit
// dans la liste, avec les données de chaque produit.
//
// Props reçues (données envoyées depuis l'écran parent) :
//   - item          : l'objet produit { id, name, prix, image }
//   - onAddToCart   : fonction appelée quand on clique "Ajouter"
//   - onShowDetails : fonction appelée quand on clique "Détails"
// ============================================================

import React from 'react';
import { Button, Image, Text, View } from 'react-native';
// View    : conteneur générique (comme une <div> en HTML)
// Image   : affiche une image à partir d'une URL
// Text    : affiche du texte
// Button  : bouton cliquable

import styles from "../styles/article";
// On importe les styles visuels définis dans le fichier article.js

// Article : composant qui affiche une carte produit
export const Article = ({ item, onAddToCart, onShowDetails }) => {
  return (
    // Conteneur principal de la carte : image à gauche, infos à droite
    <View style={styles.articleContainer}>

      {/* Image du produit chargée depuis une URL internet */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Zone de texte et de boutons à droite de l'image */}
      <View style={styles.info}>

        {/* Nom du produit */}
        <Text style={styles.nom}>{item.name}</Text>

        {/* Prix du produit */}
        <Text style={styles.prix}>{item.prix}</Text>

        {/* Ligne de boutons : Ajouter et Détails côte à côte */}
        <View style={styles.actionsRow}>
          <Button
            title="Ajouter"
            onPress={onAddToCart}   // appelle la fonction passée depuis le parent
            color="#2C2C2C"
          />
          <Button
            title="Détails"
            onPress={onShowDetails} // appelle la fonction passée depuis le parent
            color="#2C2C2C"
          />
        </View>
      </View>
    </View>
  );
};
