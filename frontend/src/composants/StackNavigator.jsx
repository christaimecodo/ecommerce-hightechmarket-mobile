// ============================================================
// StackNavigator.jsx — Navigation principale de l'application
// ============================================================
// La navigation "Stack" (pile) fonctionne comme une pile de cartes :
// chaque fois qu'on navigue vers un nouvel écran, on empile une carte.
// Quand on appuie sur "Retour", on dépile et on revient à l'écran précédent.
//
// Ce fichier configure TOUS les écrans disponibles dans l'application
// et les paramètres visuels du header (barre du haut).
// ============================================================

import React from 'react';

// createNativeStackNavigator : crée le système de navigation en pile
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import de tous les écrans de l'application
import { Accueil } from '../screens/Accueil';
import { Catalogue } from '../screens/Catalogue';
import { Inscription } from '../screens/Inscription';
import { Connexion } from '../screens/Connexion';
import { Profil } from '../screens/Profil';
import Panier from '../screens/Panier';
import { Cataloguemongodb } from '../screens/Cataloguemongodb';

// usePanier : pour lire le nombre d'articles dans le panier
// (affiché dans le bouton panier en haut à droite)
import { usePanier } from '../context/PanierContext';

// CartBadge : le bouton panier affiché dans le header
import CartBadge from './CartBadge';

// On crée l'objet Stack qui gère la navigation en pile
const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  // On récupère le panier pour afficher son nombre d'articles dans le header
  const { panier } = usePanier();

  return (
    <Stack.Navigator
      initialRouteName="Accueil"  // L'écran affiché au démarrage de l'app
      screenOptions={({ navigation }) => ({
        // Style du header (barre du haut)
        headerStyle: { backgroundColor: '#fff' },        // fond blanc
        headerTintColor: '#2C2C2C',                      // couleur du bouton retour
        headerTitleStyle: { color: '#2C2C2C', fontWeight: '600' }, // titre en gras

        // headerRight : affiché à droite du header sur TOUS les écrans.
        // On y place le badge panier pour qu'il soit toujours visible.
        headerRight: () => (
          <CartBadge
            count={panier.length}                        // nombre d'articles
            onPress={() => navigation.navigate('Panier')} // clic → aller au panier
          />
        ),
      })}
    >
      {/* Déclaration de chaque écran : name = identifiant utilisé pour naviguer */}
      <Stack.Screen name="Accueil"         component={Accueil}         options={{ title: 'HightechMarket' }} />
      <Stack.Screen name="Catalogue"       component={Catalogue} />
      <Stack.Screen name="Cataloguemongodb" component={Cataloguemongodb} />
      <Stack.Screen name="Inscription"     component={Inscription} />
      <Stack.Screen name="Connexion"       component={Connexion} />
      <Stack.Screen name="Profil"          component={Profil} />
      <Stack.Screen name="Panier"          component={Panier} />
    </Stack.Navigator>
  );
};
