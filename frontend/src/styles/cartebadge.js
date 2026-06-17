// ============================================================
// cartebadge.js — Styles visuels de cet ecran (couleurs, marges, tailles)
// ============================================================
// Dans React Native, les styles remplacent le CSS du web.
// On les definit avec StyleSheet.create({ ... })
// On les applique sur un composant avec : style={styles.nomDeLaCle}
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