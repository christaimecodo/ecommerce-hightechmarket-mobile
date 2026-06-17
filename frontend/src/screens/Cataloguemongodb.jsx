import React, { useCallback, useEffect, useMemo, useState } from "react";
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
//import { produits } from "../data/Data";
import styles from "../styles/catalogue";
import articleStyles from "../styles/article"; 
import { usePanier } from "../context/PanierContext";

export const Cataloguemongodb = ({ navigation }) => {
  // TEXTE DE RECHERCHE
  const [searchText, setSearchText] = useState("");
  const [produits, setProduits] = useState([]);
  const [erreur, setErreur] = useState(null);

  // Récupérer le contexte du panier
  const { ajouterAuPanier } = usePanier();

  const afficherDetails = useCallback((item) => {
    Alert.alert(
      "Détails du produit",
      `${item.name}\nPrix : ${item.prix}`
    );
  }, []);

  useEffect(() => {
    const chargerProduits = async () => {
      try {
        const res = await fetch("http://172.16.18.54:6000/api/produits");

        if (!res.ok) {
          throw new Error("Produit introuvable");
        }

        const data = await res.json();
        setProduits(data);
      } catch (err) {
        setErreur(err.message);
      } finally {
        // setLoading(false);
      }
    };

    chargerProduits();
  }, []);

  // LISTE FILTRÉE EN FONCTION DE LA RECHERCHE
  const produitsFiltres = produits.filter((produit) =>
        produit.name.toLowerCase().includes(searchText.toLowerCase())
     );

  return (
    <View style={styles.page}>
      {/* Header + menu */}
      <View style={styles.menuContainer}>
        {/* Barre de recherche dans le header */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Rechercher un produit..."
            value={searchText}
            onChangeText={setSearchText}
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

        {erreur && (
          <Text style={{ color: "red", marginBottom: 8 }}>{erreur}</Text>
        )}

        <FlatList
          data={produitsFiltres}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={articleStyles.articleContainer}>
              <Image
                source={{ uri: item.image }}
                style={articleStyles.image}
              />
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
