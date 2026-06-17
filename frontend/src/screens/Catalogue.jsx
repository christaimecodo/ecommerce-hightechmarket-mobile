import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  FlatList,
  TextInput,
  Alert,
  Image,
  Button,
} from "react-native";
import { produits } from "../data/Data";
import styles from "../styles/catalogue";
import articleStyles from "../styles/article"; 
import { usePanier } from "../context/PanierContext";

export const Catalogue = ({ navigation }) => {
  // Texte saisi dans la barre de recherche
  const [searchText, setSearchText] = useState("");
  // Prix maximum saisi par l'utilisateur (vide = pas de limite)
  const [prixMax, setPrixMax] = useState("");

  const { ajouterAuPanier } = usePanier();

  const afficherDetails = (item) => {
    Alert.alert("Details du produit", `${item.name}\nPrix : ${item.prix}`);
  };

  // Convertit le prix "449.99€" en nombre 449.99
  const extrairePrix = (prix) => {
    const n = parseFloat(String(prix).replace("€", "").replace(",", ".").trim());
    return isNaN(n) ? 0 : n;
  };

  // Filtre par nom ET par prix max
  const produitsFiltres = produits.filter((produit) => {
    const nomOk = produit.name.toLowerCase().includes(searchText.toLowerCase());
    const limite = prixMax !== "" ? parseFloat(prixMax) : null;
    const prixOk = limite === null || extrairePrix(produit.prix) <= limite;
    return nomOk && prixOk;
  });

  return (
    <View style={styles.page}>
      {/* Header + menu */}
      <View style={styles.menuContainer}>
        {/* Barre de recherche par nom */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Rechercher un produit..."
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />
        </View>
        {/* Filtre par prix maximum */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Prix max (ex: 300)"
            value={prixMax}
            onChangeText={setPrixMax}
            keyboardType="numeric"
            style={styles.searchInput}
          />
        </View>

        {/* Menu juste sous la barre de recherche */}
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
   
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Inscription")}
          >
            <Text style={styles.buttonText}>Inscription</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Connexion")}
          >
            <Text style={styles.buttonText}>Connexion</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Profil")}
          >
            <Text style={styles.buttonText}>Profil</Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Carte de contenu */}
      <View style={styles.conteneur}>
        <Text style={styles.titre}>Liste des Produits</Text>

        <FlatList
          data={produitsFiltres}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={articleStyles.articleContainer}>
              <Image source={{ uri: item.image }} style={articleStyles.image} />
              <View style={articleStyles.info}>
                <Text style={articleStyles.nom}>{item.name}</Text>
                <Text style={articleStyles.prix}>{item.prix}</Text>

                <View style={articleStyles.actionsRow}>
                  <Button
                    title="Ajouter"
                    onPress={() => ajouterAuPanier(item)}
                    color="#2C2C2C"
                  />
                  <Button
                    title="Détails"
                    onPress={() => afficherDetails(item)}
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
