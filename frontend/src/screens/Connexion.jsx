// ============================================================
// Connexion.jsx — Formulaire de connexion
// ============================================================
// Permet à un utilisateur déjà inscrit de se connecter.
// Il saisit son email et mot de passe → vérification dans SQLite
// → si correct, ses infos sont stockées dans UserContext → Profil.
//
// Étapes :
//   1. Chargement : la table Users est créée si elle n'existe pas
//   2. Saisie : l'utilisateur remplit email + mot de passe
//   3. Validation : on vérifie le format des champs
//   4. Vérification en base : VerifUser() cherche dans SQLite
//   5. Succès → setUser() stocke l'utilisateur + navigation vers Profil
//   6. Échec → message d'erreur affiché
// ============================================================

import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/connexion";
import {
  Alert, Button, KeyboardAvoidingView, Platform,
  Pressable, ScrollView, Text, TextInput, View,
} from "react-native";
// KeyboardAvoidingView : remonte le contenu quand le clavier s'ouvre
// Platform             : détecte si on est sur iOS ou Android

import { InitDB } from "../database/initdb";
// Crée la table Users dans SQLite si elle n'existe pas encore

import { VerifUser } from "../database/Task";
// Cherche un utilisateur par email + mot de passe dans la base

import { useUser } from "../context/UserContext";
// Pour enregistrer l'utilisateur connecté dans le contexte global

export const Connexion = ({ navigation }) => {

  // formData contient les valeurs saisies dans les champs
  const [formData, setFormData] = useState({ email: "", motDePasse: "" });

  // formErreur stocke les messages d'erreur à afficher sous chaque champ
  const [formErreur, setFormErreur] = useState({});

  // setUser : pour enregistrer l'utilisateur connecté globalement
  const { setUser } = useUser();

  // emailRef : permet de donner le focus au champ email au chargement
  const emailRef = useRef(null);

  // Au premier affichage : initialise la base de données SQLite
  useEffect(() => {
    const setupDB = async () => {
      try {
        await InitDB();
      } catch (error) {
        Alert.alert("Erreur", "Impossible d'initialiser la base locale.");
      }
    };
    setupDB();
  }, []); // [] = une seule exécution, au premier rendu

  // Au premier affichage : place le curseur dans le champ email
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // validerFormulaire : vérifie que les champs sont corrects
  // Retourne true si tout est OK, false s'il y a des erreurs
  const validerFormulaire = () => {
    const erreurs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // format xxx@xxx.xxx

    if (!formData.email.trim())
      erreurs.email = "L'email est requis";
    else if (!emailRegex.test(formData.email))
      erreurs.email = "Email invalide";

    if (!formData.motDePasse)
      erreurs.motDePasse = "Le mot de passe est requis";
    else if (formData.motDePasse.length < 12)
      erreurs.motDePasse = "Minimum 12 caractères";
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$/.test(formData.motDePasse))
      erreurs.motDePasse = "Doit contenir majuscule, minuscule, chiffre et caractère spécial";

    setFormErreur(erreurs);
    return Object.keys(erreurs).length === 0; // true = pas d'erreurs
  };

  // handleSubmit : appelée au clic sur "Se connecter"
  const handleSubmit = async () => {
    if (!validerFormulaire()) return; // arrête si erreurs

    try {
      const email = formData.email.trim();
      const motDePasse = formData.motDePasse;

      // Recherche dans la base SQLite
      const utilisateur = await VerifUser(email, motDePasse);

      if (utilisateur) {
        // Utilisateur trouvé : on le sauvegarde dans le contexte global
        setUser({
          id: utilisateur.id,
          nom: utilisateur.Nom,
          prenom: utilisateur.Prenom,
          email: utilisateur.Email,
          telephone: utilisateur.Telephone,
        });

        Alert.alert(
          "Succès",
          `Bienvenue ${utilisateur.Prenom} ${utilisateur.Nom} !`,
          [{ text: "OK", onPress: () => navigation.replace("Profil") }]
        );

        // Réinitialise le formulaire
        setFormData({ email: "", motDePasse: "" });
        setFormErreur({});
      } else {
        // Aucun utilisateur trouvé avec ces identifiants
        Alert.alert("Erreur", "Email ou mot de passe incorrect.");
      }
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue pendant la connexion.");
    }
  };

  // handleChange : met à jour un champ du formulaire à chaque frappe
  // et efface l'erreur de ce champ si elle existait
  const handleChange = (champ, valeur) => {
    setFormData((prev) => ({ ...prev, [champ]: valeur }));
    if (formErreur[champ])
      setFormErreur((prev) => ({ ...prev, [champ]: "" }));
  };

  return (
    // Remonte le formulaire quand le clavier s'ouvre (iOS: padding, Android: height)
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.page}
    >
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
          <Pressable style={styles.button} onPress={() => navigation.replace("Inscription")}>
            <Text style={styles.buttonText}>Inscription</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.replace("Profil")}>
            <Text style={styles.buttonText}>Profil</Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Carte du formulaire de connexion */}
      <View style={styles.conteneur}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

          <View style={styles.header}>
            <Text style={styles.titre}>Connectez-vous à votre compte</Text>
            <Text style={styles.sousTitre}>Remplissez le formulaire ci-dessous</Text>
          </View>

          {/* Champ Email */}
          <View style={styles.champContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              ref={emailRef}                    // le curseur se place ici automatiquement
              style={styles.input}
              value={formData.email}
              onChangeText={(v) => handleChange("email", v)}
              placeholder="email@example.com"
              keyboardType="email-address"      // clavier adapté aux emails
              autoCapitalize="none"             // pas de majuscule automatique
              autoComplete="email"
              textContentType="emailAddress"
            />
            {formErreur.email ? <Text style={styles.texteErreur}>{formErreur.email}</Text> : null}
          </View>

          {/* Champ Mot de passe */}
          <View style={styles.champContainer}>
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              value={formData.motDePasse}
              onChangeText={(v) => handleChange("motDePasse", v)}
              placeholder="********"
              secureTextEntry               // masque les caractères (affiche des points)
              autoCapitalize="none"
              autoComplete="password"
              textContentType="password"
            />
            {formErreur.motDePasse ? <Text style={styles.texteErreur}>{formErreur.motDePasse}</Text> : null}
          </View>

          {/* Bouton de connexion */}
          <View>
            <Button title="Se connecter" color="#2C2C2C" onPress={handleSubmit} />
          </View>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};
