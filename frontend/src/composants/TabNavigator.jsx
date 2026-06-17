// composants/TabNavigator.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { Accueil } from '../screens/Accueil';
import { Catalogue } from '../screens/Catalogue';
import Panier from '../screens/Panier';
import { Profil } from '../screens/Profil';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // mes headers sont maintenus
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home-outline';

          if (route.name === 'Accueil') {
            iconName = 'home-outline';
          } else if (route.name === 'Catalogue') {
            iconName = 'list-outline';
          } else if (route.name === 'Panier') {
            iconName = 'cart-outline';
          } else if (route.name === 'Profil') {
            iconName = 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2C2C2C',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {/* Accueil : pas besoin de panier, donc simple */}
      <Tab.Screen name="Accueil" component={Accueil} />

      {/* Catalogue : on passe panier et setPanier */}
      <Tab.Screen name="Catalogue" component={Catalogue}/>

      {/* Panier : on passe panier et setPanier */}
      <Tab.Screen name="Panier"component={Panier}/>

      {/* Panier : on passe panier et setPanier */}
      <Tab.Screen name="Profil"component={Profil}/>

    </Tab.Navigator>
  );
};
