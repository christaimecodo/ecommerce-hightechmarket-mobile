// ============================================================
// Inscription.jsx — Formulaire de création de compte
// ============================================================
// Permet à un nouvel utilisateur de créer un compte.
// Les informations sont enregistrées dans la base SQLite locale.
//
// Champs du formulaire : Nom, Prénom, Email, Téléphone,
//                        Mot de passe, Confirmation mot de passe
//
// Étapes :
//   1. Chargement : la table Users est créée si elle n'existe pas
//   2. Saisie : l'utilisateur remplit tous les champs
//   3. Validation en temps réel : on vérifie que les mots de passe
//      correspondent dès qu'ils sont tapés
//   4. Validation complète au clic sur "S'inscrire"
//   5. Succès → InsertUser() sauvegarde en base → navigation vers Connexion
//   6. Échec (email déjà utilisé, etc.) → message d'erreur
// ============================================================

import React, { useEffect, useRef, useState } from "react";
import {
  Alert, Button, KeyboardAvoidingView, Platform,
  Pressable, ScrollView, Text, TextInput, View,
} from "react-native";
import styles from "../styles/inscription";

import { InitDB } from "../database/initdb";
// Crée la table Users dans SQLite si elle n'existe pas encore

import { InsertUser } from "../database/Task";
// Insère un nouvel utilisateur dans la base de données

export const Inscription = ({ navigation }) => {

  // formData contient toutes les valeurs saisies dans le formulaire
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    motDePasse: "",
    confirmMotDePasse: "",
  });

  // formErreur contient les messages d'erreur par champ
  const [formErreur, setFormErreur] = useState({});

  // nomRef : permet de placer le curseur dans le champ "Nom" au chargement
  const nomRef = useRef(null);

  // Au premier affichage : place le curseur dans le champ Nom
  useEffect(() => {
    nomRef.current.focus();
  }, []);

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
  }, []); // [] = une seule exécution

  // Vérification en temps réel que les deux mots de passe correspondent.
  // Cet useEffect se déclenche à chaque fois que motDePasse ou confirmMotDePasse change.
  useEffect(() => {
    setFormErreur((prev) => {
      const erreurs = { ...prev };
      const pwd = formData.motDePasse.trim();
      const confirm = formData.confirmMotDePasse.trim();

      if (confirm !== "" && pwd !== "" && confirm !== pwd) {
        erreurs.confirmMotDePasse = "Les mots de passe ne correspondent pas";
      } else if (confirm !== "") {
        erreurs.confirmMotDePasse = ""; // efface l'erreur si les mots de passe correspondent
      }
      return erreurs;
    });
  }, [formData.motDePasse, formData.confirmMotDePasse]);

  // validerFormulaire : vérifie tous les champs avant la soumission
  // Retourne true si tout est valide, false sinon
  const validerFormulaire = () => {
    const erreurs = {};

    if (!formData.nom.trim())    erreurs.nom    = "Le nom est requis";
    if (!formData.prenom.trim()) erreurs.prenom = "Le prénom est requis";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim())            erreurs.email = "L'email est requis";
    else if (!emailRegex.test(formData.email)) erreurs.email = "Email invalide";

    // Le téléphone doit contenir exactement 10 chiffres (espaces ignorés)
    const tel = formData.telephone.replace(/\s/g, "");
    if (!tel)                      erreurs.telephone = "Le téléphone est requis";
    else if (!/^\d{10}$/.test(tel)) erreurs.telephone = "Téléphone invalide (10 chiffres)";

    if (!formData.motDePasse)
      erreurs.motDePasse = "Le mot de passe est requis";
    else if (formData.motDePasse.length < 12)
      erreurs.motDePasse = "Minimum 12 caractères";
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$/.test(formData.motDePasse))
      erreurs.motDePasse = "Doit contenir majuscule, minuscule, chiffre et caractère spécial";

    // Vérification finale de la confirmation du mot de passe
    if (formData.confirmMotDePasse.trim() && formData.confirmMotDePasse !== formData.motDePasse)
      erreurs.confirmMotDePasse = "Les mots de passe ne correspondent pas";

    setFormErreur(erreurs);
    return Object.keys(erreurs).length === 0;
  };

  // handleSubmit : appelée au clic sur "S'inscrire"
  const handleSubmit = async () => {
    if (!validerFormulaire()) return; // arrête si erreurs

    try {
      // Insère le nouvel utilisateur dans la base SQLite
      await InsertUser(
        formData.nom.trim(),
        formData.prenom.trim(),
        formData.email.trim(),
        formData.telephone.replace(/\s/g, ""), // supprime les espaces du téléphone
        formData.motDePasse
      );

      Alert.alert(
        "Succès",
        `Bienvenue ${formData.prenom} ${formData.nom} !`,
        [{ text: "OK", onPress: () => navigation.replace("Connexion") }]
      );

      // Réinitialise le formulaire après l'inscription
      setFormData({ nom: "", prenom: "", email: "", telephone: "", motDePasse: "", confirmMotDePasse: "" });
      setFormErreur({});
    } catch (error) {
      // Si l'email existe déjà (contrainte UNIQUE dans la base), on affiche un message spécifique
      const msg =
        String(error).toLowerCase().includes("unique") || String(error).toLowerCase().includes("constraint")
          ? "Cet email existe déjà."
          : "Impossible d'inscrire l'utilisateur.";
      Alert.alert("Erreur", msg);
    }
  };

  // handleChange : met à jour un champ du formulaire et efface son erreur
  const handleChange = (champ, valeur) => {
    setFormData((prev) => ({ ...prev, [champ]: valeur }));
    if (formErreur[champ]) setFormErreur((prev) => ({ ...prev, [champ]: "" }));
  };

  return (
    // Remonte le formulaire quand le clavier s'ouvre
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
          <Pressable style={styles.button} onPress={() => navigation.replace("Connexion")}>
            <Text style={styles.buttonText}>Connexion</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.replace("Profil")}>
            <Text style={styles.buttonText}>Profil</Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Carte du formulaire d'inscription */}
      <View style={styles.conteneur}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

          <View style={styles.header}>
            <Text style={styles.titre}>Créer un compte</Text>
            <Text style={styles.sousTitre}>Remplissez le formulaire ci-dessous</Text>
          </View>

          {/* Champ Nom */}
          <View style={styles.champContainer}>
            <Text style={styles.label}>Nom(s)</Text>
            <TextInput
              ref={nomRef}                      // le curseur démarre ici
              style={styles.input}
              value={formData.nom}
              onChangeText={(v) => handleChange("nom", v)}
              placeholder="Entrer votre texte ici"
            />
            {formErreur.nom ? <Text style={styles.texteErreur}>{formErreur.nom}</Text> : null}
          </View>

          {/* Champ Prénom */}
          <View style={styles.champContainer}>
            <Text style={styles.label}>Prénom(s)</Text>
            <TextInput
              style={styles.input}
              value={formData.prenom}
              onChangeText={(v) => handleChange("prenom", v)}
              placeholder="Entrer votre texte ici"
            />
            {formErreur.prenom ? <Text style={styles.texteErreur}>{formErreur.prenom}</Text> : null}
          </View>

          {/* Champ Email */}
          <View style={styles.champContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(v) => handleChange("email", v)}
              placeholder="email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />
            {formErreur.email ? <Text style={styles.texteErreur}>{formErreur.email}</Text> : null}
          </View>

          {/* Champ Téléphone */}
          <View style={styles.champContainer}>
            <Text style={styles.label}>Téléphone</Text>
            <TextInput
              style={styles.input}
              value={formData.telephone}
              onChangeText={(v) => handleChange("telephone", v)}
              placeholder="0612345678"
              keyboardType="number-pad"          // clavier numérique
            />
            {formErreur.telephone ? <Text style={styles.texteErreur}>{formErreur.telephone}</Text> : null}
          </View>

          {/* Champ Mot de passe */}
          <View style={styles.champContainer}>
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              value={formData.motDePasse}
              onChangeText={(v) => handleChange("motDePasse", v)}
              placeholder="********"
              secureTextEntry               // masque les caractères
              autoCapitalize="none"
              autoComplete="password"
              textContentType="password"
            />
            {formErreur.motDePasse ? <Text style={styles.texteErreur}>{formErreur.motDePasse}</Text> : null}
          </View>

          {/* Champ Confirmation mot de passe */}
          <View style={styles.champContainer}>
            <Text style={styles.label}>Confirmation du mot de passe</Text>
            <TextInput
              style={styles.input}
              value={formData.confirmMotDePasse}
              onChangeText={(v) => handleChange("confirmMotDePasse", v)}
              placeholder="********"
              secureTextEntry               // masque les caractères
            />
            {formErreur.confirmMotDePasse ? <Text style={styles.texteErreur}>{formErreur.confirmMotDePasse}</Text> : null}
          </View>

          {/* Bouton de soumission */}
          <View>
            <Button title="S'inscrire" color="#2C2C2C" onPress={handleSubmit} />
          </View>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};
