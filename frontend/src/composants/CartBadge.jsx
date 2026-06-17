// ============================================================
// CartBadge.jsx — Bouton panier affiché dans le header
// ============================================================
// Ce composant affiche un petit bouton "panier" en haut à droite
// de chaque écran. Il montre le nombre d'articles dans le panier.
// En cliquant dessus, on navigue directement vers l'écran Panier.
//
// Props reçues :
//   - count   : nombre d'articles dans le panier (ex: 3)
//   - onPress : fonction appelée quand on clique sur le bouton
// ============================================================

import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
// TouchableOpacity : zone cliquable (s'assombrit légèrement au clic)
// Text : affiche du texte

import styles from '../styles/cartebadge';
// Styles visuels du bouton panier (couleur, arrondi, etc.)

// CartBadgeComponent : le composant bouton panier
const CartBadgeComponent = ({ count, onPress }) => {
  return (
    // TouchableOpacity rend toute cette zone cliquable
    <TouchableOpacity style={styles.cartBadge} onPress={onPress}>
      {/* Affiche l'icône panier et le nombre d'articles */}
      <Text style={styles.cartText}>🛒 {count}</Text>
    </TouchableOpacity>
  );
};

// memo() évite que ce composant se réaffiche inutilement.
// Il ne se met à jour que si "count" ou "onPress" change vraiment.
// C'est une optimisation de performance pour les composants simples.
const CartBadge = memo(CartBadgeComponent);

export default CartBadge;
