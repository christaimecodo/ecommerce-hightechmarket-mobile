import React from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import styles from "../styles/profil";
import { useUser } from "../context/UserContext";// on utilise le hook du contexte


export const Profil = ({ navigation }) => {
  const { user, logout } = useUser(); // user = null ou { id, nom, prenom, email, telephone }

  const handleLogout = () => {
    if (!user) {
      Alert.alert("Info", "Vous n'êtes déjà pas connecté(e).");
      return;
    }

    Alert.alert(
      "Déconnexion",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Oui",
          style: "destructive",
          onPress: () => {
            logout(); // remet user à null dans le contexte
            Alert.alert("Déconnecté", "Vous avez été déconnecté(e).");
            navigation.replace("Connexion");
          },
        },
      ]
    );
  };

  const isConnected = !!user;

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
            onPress={() => navigation.navigate("Catalogue")}
          >
            <Text style={styles.buttonText}>Catalogue</Text>
          </Pressable>
          {/* Toujours pas de Connexion / Inscription / Profil ici */}
        </ScrollView>
      </View>

      {/* Carte de contenu */}
      <View style={styles.conteneur}>
        <Text style={styles.titre}>Profil</Text>

        {isConnected ? (
          <>
            <Text style={styles.sousTitre}>
              Bienvenue {user.prenom} {user.nom}
            </Text>

            <View style={{ marginTop: 20 }}>
              <Text style={styles.sousTitre}>Vos informations :</Text>
              <Text style={{ marginTop: 10 }}>Nom : {user.nom}</Text>
              <Text>Prénom : {user.prenom}</Text>
              <Text>Email : {user.email}</Text>
              <Text>Téléphone : {user.telephone}</Text>
            </View>

            <Pressable
              onPress={handleLogout}
              style={[styles.toggleBtn, styles.btnDanger, { marginTop: 30 }]}
            >
              <Text style={styles.toggleText}>Se déconnecter</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.sousTitre}>
              Vous n'êtes pas connecté(e). Connectez-vous pour voir votre profil.
            </Text>

            <Pressable
              onPress={() => navigation.replace("Connexion")}
              style={[styles.toggleBtn, styles.btnPrimary, { marginTop: 30 }]}
            >
              <Text style={styles.toggleText}>Se connecter</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};
