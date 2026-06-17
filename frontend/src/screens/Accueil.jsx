// ============================================================
// Accueil.jsx — Page d'accueil de l'application
// ============================================================
// C'est le premier écran affiché quand on ouvre l'application.
// Il contient :
//   - Un menu de navigation rapide vers les autres écrans
//   - Un message de bienvenue avec une description du site
//
// Props reçues :
//   - navigation : objet fourni automatiquement par React Navigation.
//                  Il permet de naviguer vers d'autres écrans avec
//                  navigation.navigate('NomEcran').
// ============================================================

import { View, Text, Pressable, ScrollView } from 'react-native';
// View      : conteneur invisible pour organiser les éléments
// Text      : affiche du texte à l'écran
// Pressable : zone cliquable (réagit au toucher)
// ScrollView: permet de faire défiler si le contenu dépasse l'écran

import styles from '../styles/accueil';
// Styles de cet écran : couleurs, marges, polices...

export const Accueil = ({ navigation }) => {
  return (
    // Fond gris clair qui occupe tout l'écran
    <View style={styles.page}>

      {/* Barre de navigation rapide (scrollable horizontalement) */}
      <View style={styles.menuContainer}>
        <ScrollView
          horizontal                             // défilement gauche/droite
          showsHorizontalScrollIndicator={false} // cache la barre de scroll
          contentContainerStyle={styles.menu}
          style={styles.menuWrapper}
        >
          {/* Chaque Pressable est un bouton qui navigue vers un écran */}
          <Pressable style={styles.button} onPress={() => navigation.navigate('Cataloguemongodb')}>
            <Text style={styles.buttonText}>Catalogue</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => navigation.navigate('Inscription')}>
            <Text style={styles.buttonText}>Inscription</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => navigation.navigate('Connexion')}>
            <Text style={styles.buttonText}>Connexion</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => navigation.navigate('Profil')}>
            <Text style={styles.buttonText}>Profil</Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Carte blanche avec le message de bienvenue */}
      <View style={styles.conteneur}>
        <View style={styles.content}>
          <Text style={styles.titre}>Bienvenue sur HightechMarket</Text>

          <Text style={styles.sousTitre}>
            Parcourez nos produits tech, ajoutez-les au panier et retrouvez-les a tout moment.
          </Text>

          <Text style={styles.sousTitre}>
            Nouveau ? Inscrivez-vous en quelques secondes. Deja membre ? Connectez-vous pour acceder a votre profil.
          </Text>
        </View>
      </View>

    </View>
  );
};
