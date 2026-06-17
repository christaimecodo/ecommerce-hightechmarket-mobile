import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import styles from "../styles/inscription";
import { InitDB } from "../database/initdb";
import { InsertUser } from "../database/Task";



export const Inscription = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    motDePasse: "",
    confirmMotDePasse: "",
  });
  const [formErreur, setFormErreur] = useState({});

  // Ref pour le focus
  const nomRef = useRef(null);

  // Focus au chargement
  useEffect(() => {
    nomRef.current.focus();
  }, []);


  // Initialisation de la base (une seule fois)
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

  // Comparaison des mots de passe 
  useEffect(() => {
    setFormErreur((prev) => {
      const erreurs = { ...prev };
      const pwd = formData.motDePasse.trim();
      const confirm = formData.confirmMotDePasse.trim();

      if (confirm !== "" && pwd !== "" && confirm !== pwd) {
        erreurs.confirmMotDePasse = "Les mots de passe ne correspondent pas";
      } else if (confirm !== "") {
        erreurs.confirmMotDePasse = "";
      }
      return erreurs;
    });
  }, [formData.motDePasse, formData.confirmMotDePasse]);

  // Validation complète du formulaire
  const validerFormulaire = () => {
    const erreurs = {};

    if (!formData.nom.trim()) erreurs.nom = "Le nom est requis";
    if (!formData.prenom.trim()) erreurs.prenom = "Le prénom est requis";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) erreurs.email = "L'email est requis";
    else if (!emailRegex.test(formData.email))
      erreurs.email = "Email invalide";

    const tel = formData.telephone.replace(/\s/g, "");
    if (!tel) erreurs.telephone = "Le téléphone est requis";
    else if (!/^\d{10}$/.test(tel))
      erreurs.telephone = "Téléphone invalide (10 chiffres)";

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

    // re-vérifier la confirmation ici aussi
    if (
      formData.confirmMotDePasse.trim() &&
      formData.confirmMotDePasse !== formData.motDePasse
    ) {
      erreurs.confirmMotDePasse = "Les mots de passe ne correspondent pas";
    }

    setFormErreur(erreurs);
    return Object.keys(erreurs).length === 0;
  };

  // Soumission : validation + insertion SQLite
  const handleSubmit = async () => {
    if (!validerFormulaire()) return;

    try {
      await InsertUser(
        formData.nom.trim(),
        formData.prenom.trim(),
        formData.email.trim(),
        formData.telephone.replace(/\s/g, ""),
        formData.motDePasse
      );

      Alert.alert(
        "Succès",
        `Bienvenue ${formData.prenom} ${formData.nom} !`,
        [{ text: "OK", onPress: () => navigation.replace("Connexion") }]
      );

      setFormData({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        motDePasse: "",
        confirmMotDePasse: "",
      });
      setFormErreur({});
    } catch (error) {
      console.error("Erreur lors de l'insertion :", error);
      // Si Email est UNIQUE dans la table, on peut capter l'erreur SQLite ici
      const msg =
        String(error).toLowerCase().includes("unique") ||
        String(error).toLowerCase().includes("constraint")
          ? "Cet email existe déjà."
          : "Impossible d'inscrire l'utilisateur.";
      Alert.alert("Erreur", msg);
    }
  };

  const handleChange = (champ, valeur) => {
    setFormData((prev) => ({ ...prev, [champ]: valeur }));
    if (formErreur[champ]) setFormErreur((prev) => ({ ...prev, [champ]: "" }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.page}
    >
      {/* Menu sous le header */}
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
          <Pressable
            style={styles.button}
            onPress={() => navigation.replace("Connexion")}
          >
            <Text style={styles.buttonText}>Connexion</Text>
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
            <Text style={styles.titre}>Créer un compte</Text>
            <Text style={styles.sousTitre}>
              Remplissez le formulaire ci-dessous
            </Text>
          </View>

          {/* Nom */}
          <View style={styles.champContainer}>
            <Text style={styles.label}>Nom(s)</Text>
            <TextInput
              ref={nomRef}
              style={styles.input}
              value={formData.nom}
              onChangeText={(v) => handleChange("nom", v)}
              placeholder="Entrer votre texte ici"
            />
            {formErreur.nom ? (
              <Text style={styles.texteErreur}>{formErreur.nom}</Text>
            ) : null}
          </View>

          {/* Prénom */}
          <View style={styles.champContainer}>
            <Text style={styles.label}>Prénom(s)</Text>
            <TextInput
              style={styles.input}
              value={formData.prenom}
              onChangeText={(v) => handleChange("prenom", v)}
              placeholder="Entrer votre texte ici"
            />
            {formErreur.prenom ? (
              <Text style={styles.texteErreur}>{formErreur.prenom}</Text>
            ) : null}
          </View>

          {/* Email */}
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
            {formErreur.email ? (
              <Text style={styles.texteErreur}>{formErreur.email}</Text>
            ) : null}
          </View>

          {/* Téléphone */}
          <View style={styles.champContainer}>
            <Text style={styles.label}>Téléphone</Text>
            <TextInput
              style={styles.input}
              value={formData.telephone}
              onChangeText={(v) => handleChange("telephone", v)}
              placeholder="0612345678"
              keyboardType="number-pad"
            />
            {formErreur.telephone ? (
              <Text style={styles.texteErreur}>{formErreur.telephone}</Text>
            ) : null}
          </View>

          {/* Mot de passe */}
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

          {/* Confirmation */}
          <View style={styles.champContainer}>
            <Text style={styles.label}>Confirmation du mot de passe</Text>
            <TextInput
              style={styles.input}
              value={formData.confirmMotDePasse}
              onChangeText={(v) => handleChange("confirmMotDePasse", v)}
              placeholder="********"
              secureTextEntry
            />
            {formErreur.confirmMotDePasse ? (
              <Text style={styles.texteErreur}>
                {formErreur.confirmMotDePasse}
              </Text>
            ) : null}
          </View>

          <View>
            <Button title="S'inscrire" color="#2C2C2C" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};



