// composants/DrawerNavigator.jsx
import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

//import { Profil } from '../frontend/screens/Profil';
import { TabNavigator } from './TabNavigator';
import { Profil } from '../screens/Profil';
import { Connexion } from '../screens/Connexion';
import { Inscription } from '../screens/Inscription';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    // 🔹 Cette View ajoute juste un espace en haut sur Android
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
      }}
    >
      <Drawer.Navigator
        screenOptions={{
          headerShown: true, // on garde tes headers "maison"
        }}
      >
        {/* Onglets du bas (Accueil / Catalogue / Panier) */}
        <Drawer.Screen
          name="AccueilTabs"
          component={TabNavigator}
          options={{
            title: 'Accueil',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
         
        

        <Drawer.Screen
          name="Profil"
          component={Profil}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="Connexion"
          component={Connexion}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="log-in-outline" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="Inscription"
          component={Inscription}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </View>
  );
};
