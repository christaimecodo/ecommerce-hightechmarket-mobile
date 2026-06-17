import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Pressable,
  Button,
  Alert,
} from 'react-native';
import styles from '../styles/panier';
import { usePanier } from '../context/PanierContext';

  //  petite fonction utilitaire pour convertir le prix en nombre
  const getPrixNumber = (prix) => {
    // 1) convertir en string
    const str = String(prix);
    // 2) garder uniquement chiffres, virgule et point
    const cleaned = str.replace(/[^\d.,]/g, '').replace(',', '.'); 
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

const Panier = ({ navigation }) => {
  const { panier, setPanier } = usePanier();

  console.log('PANIER :', panier);

const supprimerDuPanier = useCallback((index) => {
  const nouveauPanier = [...panier];
  nouveauPanier.splice(index, 1);
  setPanier(nouveauPanier);
}, [panier, setPanier]);


const afficherDetails = useCallback((item) => {
  const quantite = item.quantite || 1;
  Alert.alert(
    'Détails du produit',
    `${item.name}\nPrix : ${item.prix}\nQuantité : ${quantite}`
  );
}, []);

  //  Augmenter quantité
const augmenterQuantite = useCallback((index) => {
  const nouveauPanier = [...panier];
  const produit = nouveauPanier[index];
  const quantiteActuelle = produit.quantite || 1;

  nouveauPanier[index] = {
    ...produit,
    quantite: quantiteActuelle + 1,
  };

  setPanier(nouveauPanier);
}, [panier, setPanier]);
  
//  Diminuer quantité
const diminuerQuantite = useCallback((index) => {
  const nouveauPanier = [...panier];
  const produit = nouveauPanier[index];
  const quantiteActuelle = produit.quantite || 1;

  if (quantiteActuelle > 1) {
    nouveauPanier[index] = {
      ...produit,
      quantite: quantiteActuelle - 1,
    };
  } else {
    nouveauPanier.splice(index, 1);
  }

  setPanier(nouveauPanier);
}, [panier, setPanier]);


  //  Total du panier
const total = useMemo(() => {
  return panier.reduce((somme, item) => {
    const quantite = item.quantite || 1;
    const prixNumber = getPrixNumber(item.prix);
    return somme + quantite * prixNumber;
  }, 0);
}, [panier]);

  return (
    <View style={styles.page}>
      {/* Menu juste sous le header */}
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

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Catalogue')}
          >
            <Text style={styles.buttonText}>Catalogue</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Inscription')}
          >
            <Text style={styles.buttonText}>Inscription</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Connexion')}
          >
            <Text style={styles.buttonText}>Connexion</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Profil')}
          >
            <Text style={styles.buttonText}>Profil</Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Carte de contenu */}
      <View style={styles.conteneur}>
        <Text style={styles.titre}>🛒 Mon Panier</Text>

        <FlatList
          data={panier}
          keyExtractor={(item, index) => item.id + '-' + index}
          renderItem={({ item, index }) => {
            const quantite = item.quantite || 1;
            const prixNumber = getPrixNumber(item.prix);
            const sousTotal = prixNumber * quantite;

            return (
              <View style={styles.cartItem}>
                <Text style={styles.cartItemText}>
                  • {item.name} - {prixNumber} x {quantite} = {sousTotal}
                </Text>

                {/* Boutons quantité */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 8,
                    gap: 10,
                  }}
                >
                  <Button
                    title="-"
                    color="#c1121f"
                    onPress={() => diminuerQuantite(index)}
                  />
                  <Text>Qté : {quantite}</Text>
                  <Button
                    title="+"
                    color="#2C2C2C"
                    onPress={() => augmenterQuantite(index)}
                  />
                </View>

                {/* Boutons action */}
                <View style={styles.cartItemButtons}>
                  <Button
                    title="Supprimer"
                    color="#c1121f"
                    onPress={() => supprimerDuPanier(index)}
                  />
                  <Button
                    title="Détails"
                    color="#2C2C2C"
                    onPress={() => afficherDetails(item)}
                  />
                </View>
              </View>
            );
          }}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>Votre panier est vide.</Text>
          }
        />

        {/* Total global */}
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'right',
            }}
          >
            Total : {total}
          </Text>
        </View>

        <View style={{ marginBottom: 50 }}>
          <Button
            title="Vider le panier"
            color="#2C2C2C"
            onPress={() => setPanier([])}
          />
        </View>
      </View>
    </View>
  );
};

export default Panier;
