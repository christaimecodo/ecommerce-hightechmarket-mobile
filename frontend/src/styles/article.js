// ============================================================
// article.js — Styles de la carte produit (Article)
Utilisé dans le Catalogue pour afficher chaque produit avec image, nom, prix et boutons.
// ============================================================
// Dans React Native, les styles sont définis avec StyleSheet.create().
// C'est l'équivalent du CSS dans une application web, mais adapté au mobile.
// Chaque clé (page, button, titre...) est un objet de style qu'on applique
// à un composant via : style={styles.nomDeLaCle}
// ============================================================

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  articleContainer: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  image: { width: 90, height: 90, borderRadius: 8 },
  info: { flex: 1, justifyContent: 'space-between' },
  nom: { fontSize: 16, fontWeight: '600', color: '#333' },
  prix: { fontSize: 14, color: '#2C2C2C', marginBottom: 6 },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
});

export default styles;

