import React, { useState,useEffect, useRef } from "react";
import styles from "../styles/connexion";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { InitDB } from "../database/initdb";
import { VerifUser } from "../database/Task";
import { useUser } from "../context/UserContext";


export const Connexion = ({ navigation }) => {
  const [formData, setFormData] = useState({ email: "", motDePasse: "" });
  const [formErreur, setFormErreur] = useState({});

  // contexte utilisateur (pour garder l'utilisateur connecté)
  const { setUser } = useUser();   // on utilise le hook, plus useContext(UserContext)

  // Initialisation de la base au montage
  useEffect(() => {
    const setupDB = async () => {
      try {
        await InitDB();
      } catch (error) {
        console.error("Erreur lors de l'initialisation de la base :", error);
        Alert.alert("Erreur", "Impossible d'initialiser la base locale.");
      }
    };
    setupDB();
  }, []);

    // Ref pour le focus
    const emailRef = useRef(null);
  
    // Focus au chargement
    useEffect(() => {
      emailRef.current.focus();
    }, []);

  const validerFormulaire = () => {
    const erreurs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) erreurs.email = "L'email est requis";
    else if (!emailRegex.test(formData.email))
      erreurs.email = "Email invalide";

    if (!formData.motDePasse) erreurs.motDePasse = "Le mot de passe est requis";
    else if (formData.motDePasse.length < 12)
      erreurs.motDePasse = "Minimum 12 caractères";
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$/.test(
        formData.motDePasse
      )
    )
      erreurs.motDePasse =
        "Le mot de passe doit contenir au moins 12 caractères, avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial";

    setFormErreur(erreurs);
    return Object.keys(erreurs).length === 0;
  };

  // Connexion réelle avec la BD
  const handleSubmit = async () => {
    if (!validerFormulaire()) return;

    try {
      const email = formData.email.trim();
      const motDePasse = formData.motDePasse;

      const utilisateur = await VerifUser(email, motDePasse);

      if (utilisateur) {
        // On met à jour le contexte utilisateur
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
          [
            {
              text: "OK",
              onPress: () => navigation.replace("Profil"), // ou un autre écran
            },
          ]
        );

        setFormData({ email: "", motDePasse: "" });
        setFormErreur({});
      } else {
        Alert.alert("Erreur", "Email ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur lors de la vérification :", error);
      Alert.alert("Erreur", "Une erreur est survenue pendant la connexion.");
    }
  };

  const handleChange = (champ, valeur) => {
    setFormData((prev) => ({ ...prev, [champ]: valeur }));
    if (formErreur[champ])
      setFormErreur((prev) => ({ ...prev, [champ]: "" }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.page}
    >
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
          {/* Pas de bouton Connexion (écran courant) */}
          <Pressable
            style={styles.button}
            onPress={() => navigation.replace("Inscription")}
          >
            <Text style={styles.buttonText}>Inscription</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => navigation.replace("Profil")}
          >
            <Text style={styles.buttonText}>Profil</Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Carte de contenu */}
      <View style={styles.conteneur}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.titre}>Connectez-vous à votre compte</Text>
            <Text style={styles.sousTitre}>
              Remplissez le formulaire ci-dessous
            </Text>
          </View>

          <View style={styles.champContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              ref={emailRef}
              style={styles.input}
              value={formData.email}
              onChangeText={(v) => handleChange("email", v)}
              placeholder="email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />
            {formErreur.email ? (
              <Text style={styles.texteErreur}>{formErreur.email}</Text>
            ) : null}
          </View>

          <View style={styles.champContainer}>
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              value={formData.motDePasse}
              onChangeText={(v) => handleChange("motDePasse", v)}
              placeholder="********"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              textContentType="password"
            />
            {formErreur.motDePasse ? (
              <Text style={styles.texteErreur}>{formErreur.motDePasse}</Text>
            ) : null}
          </View>

          <View>
            <Button
              title="Se connecter"
              color="#2C2C2C"
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};



