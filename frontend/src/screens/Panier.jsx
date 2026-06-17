// ============================================================
// Panier.jsx — Écran du panier d'achat
// ============================================================
// Affiche la liste des produits ajoutés au panier avec :
//   - Le nom, prix unitaire, quantité et sous-total de chaque produit
//   - Des boutons "+" et "-" pour modifier la quantité
//   - Un bouton "Supprimer" pour retirer un produit
//   - Un bouton "Détails" pour voir les infos du produit
//   - Le total général de tous les produits
//   - Un bouton "Vider le panier" pour tout supprimer
// ============================================================

import React, { useCallback, useMemo } from 'react';
import {
  View, Text, FlatList, ScrollView, Pressable, Button, Alert,
} from 'react-native';
// FlatList : liste performante pour afficher les articles du panier
// useMemo  : mémorise un calcul pour ne pas le refaire à chaque rendu

import styles from '../styles/panier';
import { usePanier } from '../context/PanierContext';
// usePanier : pour lire et modifier le contenu du panier

// getPrixNumber : convertit "449.99€" ou "449,99€" en nombre 449.99
// Utilisée pour calculer les sous-totaux et le total
const getPrixNumber = (prix) => {
  const str = String(prix);
  // On garde uniquement les chiffres, virgules et points
  const cleaned = str.replace(/[^\d.,]/g, '').replace(',', '.');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

const Panier = ({ navigation }) => {
  // panier    : tableau de tous les produits ajoutés
  // setPanier : fonction pour modifier directement le tableau
  const { panier, setPanier } = usePanier();

  // supprimerDuPanier : retire un produit du panier par son index dans la liste
  // useCallback mémorise la fonction pour éviter de la recréer inutilement
  const supprimerDuPanier = useCallback((index) => {
    const nouveauPanier = [...panier];    // copie du tableau
    nouveauPanier.splice(index, 1);      // supprime 1 élément à la position "index"
    setPanier(nouveauPanier);
  }, [panier, setPanier]);

  // afficherDetails : popup avec le nom, prix et quantité d'un produit
  const afficherDetails = useCallback((item) => {
    const quantite = item.quantite || 1;
    Alert.alert(
      'Détails du produit',
      `${item.name}\nPrix : ${item.prix}\nQuantité : ${quantite}`
    );
  }, []);

  // augmenterQuantite : ajoute 1 à la quantité d'un produit
  const augmenterQuantite = useCallback((index) => {
    const nouveauPanier = [...panier];
    const produit = nouveauPanier[index];
    const quantiteActuelle = produit.quantite || 1;
    nouveauPanier[index] = { ...produit, quantite: quantiteActuelle + 1 };
    setPanier(nouveauPanier);
  }, [panier, setPanier]);

  // diminuerQuantite : enlève 1 à la quantité.
  // Si la quantité tombe à 0, le produit est complètement retiré du panier.
  const diminuerQuantite = useCallback((index) => {
    const nouveauPanier = [...panier];
    const produit = nouveauPanier[index];
    const quantiteActuelle = produit.quantite || 1;

    if (quantiteActuelle > 1) {
      // Il reste plusieurs unités → on diminue juste la quantité
      nouveauPanier[index] = { ...produit, quantite: quantiteActuelle - 1 };
    } else {
      // Quantité = 1 → on supprime le produit du panier
      nouveauPanier.splice(index, 1);
    }

    setPanier(nouveauPanier);
  }, [panier, setPanier]);

  // total : calcule la somme totale de tous les produits du panier.
  // useMemo évite de recalculer ce total si le panier n'a pas changé.
  const total = useMemo(() => {
    return panier.reduce((somme, item) => {
      const quantite = item.quantite || 1;
      const prixNumber = getPrixNumber(item.prix);
      return somme + quantite * prixNumber; // ajoute prix × quantité à la somme
    }, 0); // 0 = valeur de départ de la somme
  }, [panier]);

  return (
    <View style={styles.page}>

      {/* Menu de navigation rapide */}
      <View style={styles.menuContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.menu}
          style={styles.menuWrapper}
        >
          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Retour</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.popToTop()}>
            <Text style={styles.buttonText}>Accueil</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Catalogue')}>
            <Text style={styles.buttonText}>Catalogue</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Inscription')}>
            <Text style={styles.buttonText}>Inscription</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Connexion')}>
            <Text style={styles.buttonText}>Connexion</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Profil')}>
            <Text style={styles.buttonText}>Profil</Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Carte principale du panier */}
      <View style={styles.conteneur}>
        <Text style={styles.titre}>Mon Panier</Text>

        {/* FlatList affiche chaque produit du panier */}
        <FlatList
          data={panier}
          keyExtractor={(item, index) => item.id + '-' + index}
          renderItem={({ item, index }) => {
            const quantite = item.quantite || 1;
            const prixNumber = getPrixNumber(item.prix);
            const sousTotal = prixNumber * quantite; // prix × quantité

            return (
              <View style={styles.cartItem}>
                {/* Ligne d'info : nom, prix unitaire, quantité, sous-total */}
                <Text style={styles.cartItemText}>
                  • {item.name} - {prixNumber}€ × {quantite} = {sousTotal.toFixed(2)}€
                </Text>

                {/* Boutons pour modifier la quantité */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8, gap: 10 }}>
                  <Button title="-" color="#c1121f" onPress={() => diminuerQuantite(index)} />
                  <Text>Qté : {quantite}</Text>
                  <Button title="+" color="#2C2C2C"  onPress={() => augmenterQuantite(index)} />
                </View>

                {/* Boutons Supprimer et Détails */}
                <View style={styles.cartItemButtons}>
                  <Button title="Supprimer" color="#c1121f" onPress={() => supprimerDuPanier(index)} />
                  <Button title="Détails"   color="#2C2C2C"  onPress={() => afficherDetails(item)} />
                </View>
              </View>
            );
          }}
          contentContainerStyle={styles.list}
          // Affiché si le panier est vide
          ListEmptyComponent={<Text style={styles.empty}>Votre panier est vide.</Text>}
        />

        {/* Total général */}
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'right' }}>
            Total : {total.toFixed(2)}€
          </Text>
        </View>

        {/* Bouton pour tout vider d'un coup */}
        <View style={{ marginBottom: 50 }}>
          <Button
            title="Vider le panier"
            color="#2C2C2C"
            onPress={() => setPanier([])} // remet le panier à vide
          />
        </View>
      </View>
    </View>
  );
};

export default Panier;
