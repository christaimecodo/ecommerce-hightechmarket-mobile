// ============================================================
// Catalogue.jsx — Liste des produits (données locales)
// ============================================================
// Cet écran affiche la liste des produits stockés dans Data.js.
// Pas de base de données ni d'internet : les produits sont codés
// directement dans l'application.
//
// Fonctionnalités :
//   - Liste scrollable de tous les produits
//   - Recherche par nom (filtre en temps réel à chaque frappe)
//   - Filtre par prix maximum
//   - Bouton "Ajouter" → met le produit dans le panier
//   - Bouton "Détails" → affiche une popup avec les infos
// ============================================================

import React, { useState } from "react";
import {
  View, Text, ScrollView, Pressable,
  FlatList, TextInput, Alert, Image, Button,
} from "react-native";
// FlatList  : liste optimisée pour afficher de nombreux éléments
// TextInput : champ de saisie de texte
// Alert     : fenêtre popup du système
// Image     : affiche une image depuis une URL internet

import { produits } from "../data/Data";
// La liste des 8 produits tech définis dans Data.js

import styles from "../styles/catalogue";
import articleStyles from "../styles/article";

import { usePanier } from "../context/PanierContext";
// usePanier : pour accéder à la fonction ajouterAuPanier

export const Catalogue = ({ navigation }) => {

  // searchText : texte saisi dans la barre de recherche.
  // Quand vide (""), tous les produits sont affichés.
  const [searchText, setSearchText] = useState("");

  // prixMax : prix maximum saisi par l'utilisateur.
  // Quand vide, aucun filtre de prix n'est appliqué.
  const [prixMax, setPrixMax] = useState("");

  // On récupère la fonction d'ajout au panier depuis le contexte global
  const { ajouterAuPanier } = usePanier();

  // afficherDetails : affiche une popup avec le nom et le prix du produit
  const afficherDetails = (item) => {
    Alert.alert("Details du produit", `${item.name}\nPrix : ${item.prix}`);
  };

  // extrairePrix : convertit une chaîne "449.99€" en nombre 449.99
  // Nécessaire pour pouvoir comparer les prix numériquement
  const extrairePrix = (prix) => {
    const n = parseFloat(String(prix).replace("€", "").replace(",", ".").trim());
    return isNaN(n) ? 0 : n; // si la conversion échoue, on retourne 0
  };

  // produitsFiltres : sous-liste des produits qui correspondent aux filtres.
  // Elle est recalculée automatiquement quand searchText ou prixMax changent.
  const produitsFiltres = produits.filter((produit) => {
    // Vérifie si le nom contient le texte recherché (insensible à la casse)
    const nomOk = produit.name.toLowerCase().includes(searchText.toLowerCase());
    // Convertit le prixMax saisi en nombre (null = pas de limite)
    const limite = prixMax !== "" ? parseFloat(prixMax) : null;
    // Vérifie si le prix du produit est inférieur ou égal à la limite
    const prixOk = limite === null || extrairePrix(produit.prix) <= limite;
    // Le produit est affiché seulement si les deux conditions sont vraies
    return nomOk && prixOk;
  });

  return (
    <View style={styles.page}>

      {/* Zone des filtres et du menu de navigation */}
      <View style={styles.menuContainer}>

        {/* Champ de recherche par nom de produit */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Rechercher un produit..."
            value={searchText}
            onChangeText={setSearchText}   // met à jour à chaque frappe
            style={styles.searchInput}
          />
        </View>

        {/* Champ de filtre par prix maximum */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Prix max (ex: 300)"
            value={prixMax}
            onChangeText={setPrixMax}      // met à jour à chaque frappe
            keyboardType="numeric"         // affiche le clavier numérique
            style={styles.searchInput}
          />
        </View>

        {/* Boutons de navigation rapide (scrollables horizontalement) */}
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
          <Pressable style={styles.button} onPress={() => navigation.navigate("Inscription")}>
            <Text style={styles.buttonText}>Inscription</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate("Connexion")}>
            <Text style={styles.buttonText}>Connexion</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate("Profil")}>
            <Text style={styles.buttonText}>Profil</Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Carte principale avec la liste des produits filtrés */}
      <View style={styles.conteneur}>
        <Text style={styles.titre}>Liste des Produits</Text>

        {/* FlatList est plus performant qu'un simple ScrollView pour les listes */}
        <FlatList
          data={produitsFiltres}                    // données filtrées à afficher
          keyExtractor={(item) => item.id}           // identifiant unique par ligne
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            // Carte d'un produit : image à gauche, infos à droite
            <View style={articleStyles.articleContainer}>
              <Image source={{ uri: item.image }} style={articleStyles.image} />
              <View style={articleStyles.info}>
                <Text style={articleStyles.nom}>{item.name}</Text>
                <Text style={articleStyles.prix}>{item.prix}</Text>
                <View style={articleStyles.actionsRow}>
                  <Button
                    title="Ajouter"
                    onPress={() => ajouterAuPanier(item)} // ajoute ce produit au panier
                    color="#2C2C2C"
                  />
                  <Button
                    title="Détails"
                    onPress={() => afficherDetails(item)} // affiche la popup de détails
                    color="#2C2C2C"
                  />
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};
