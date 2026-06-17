// ============================================================
// cartebadge.js — Styles du badge panier dans le header
Le petit bouton panier affiché en haut à droite de chaque écran.
// ============================================================
// Dans React Native, les styles sont définis avec StyleSheet.create().
// C'est l'équivalent du CSS dans une application web, mais adapté au mobile.
// Chaque clé (page, button, titre...) est un objet de style qu'on applique
// à un composant via : style={styles.nomDeLaCle}
// ============================================================

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cartBadge: {
    backgroundColor: '#2C2C2C',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
    marginRight: 4,
  },
  cartText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default styles;
