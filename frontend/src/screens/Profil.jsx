// ============================================================
// Profil.jsx — Écran du profil utilisateur
// ============================================================
// Affiche les informations de l'utilisateur connecté.
// Si personne n'est connecté, un bouton "Se connecter" est affiché.
// Si l'utilisateur est connecté, ses infos sont affichées avec
// un bouton "Se déconnecter".
//
// Cet écran utilise UserContext pour savoir qui est connecté.
// ============================================================

import React from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import styles from "../styles/profil";

import { useUser } from "../context/UserContext";
// useUser : pour lire les infos de l'utilisateur et appeler logout()

export const Profil = ({ navigation }) => {

  // user   : infos de l'utilisateur connecté, ou null si personne n'est connecté
  // logout : fonction qui déconnecte l'utilisateur (remet user à null)
  const { user, logout } = useUser();

  // handleLogout : demande une confirmation avant de déconnecter
  const handleLogout = () => {
    if (!user) {
      // Personne n'est connecté, rien à faire
      Alert.alert("Info", "Vous n'êtes pas connecté(e).");
      return;
    }

    // Popup de confirmation avant déconnexion
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" }, // annule, ne fait rien
        {
          text: "Oui",
          style: "destructive",
          onPress: () => {
            logout(); // remet user à null dans UserContext
            Alert.alert("Déconnecté", "Vous avez été déconnecté(e).");
            navigation.replace("Connexion"); // redirige vers la page de connexion
          },
        },
      ]
    );
  };

  // isConnected : vrai si user n'est pas null (quelqu'un est connecté)
  // !! convertit n'importe quelle valeur en booléen (true/false)
  const isConnected = !!user;

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
          <Pressable style={styles.button} onPress={() => navigation.navigate("Catalogue")}>
            <Text style={styles.buttonText}>Catalogue</Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Carte principale du profil */}
      <View style={styles.conteneur}>
        <Text style={styles.titre}>Profil</Text>

        {/* Affichage conditionnel selon si l'utilisateur est connecté ou non */}
        {isConnected ? (
          // --- Utilisateur connecté ---
          <>
            <Text style={styles.sousTitre}>
              Bienvenue {user.prenom} {user.nom}
            </Text>

            {/* Informations personnelles de l'utilisateur */}
            <View style={{ marginTop: 20 }}>
              <Text style={styles.sousTitre}>Vos informations :</Text>
              <Text style={{ marginTop: 10 }}>Nom : {user.nom}</Text>
              <Text>Prénom : {user.prenom}</Text>
              <Text>Email : {user.email}</Text>
              <Text>Téléphone : {user.telephone}</Text>
            </View>

            {/* Bouton de déconnexion (rouge) */}
            <Pressable
              onPress={handleLogout}
              style={[styles.toggleBtn, styles.btnDanger, { marginTop: 30 }]}
            >
              <Text style={styles.toggleText}>Se déconnecter</Text>
            </Pressable>
          </>
        ) : (
          // --- Personne n'est connecté ---
          <>
            <Text style={styles.sousTitre}>
              Vous n'êtes pas connecté(e). Connectez-vous pour voir votre profil.
            </Text>

            {/* Bouton pour aller vers l'écran de connexion */}
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
