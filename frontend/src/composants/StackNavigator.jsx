import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Accueil } from '../screens/Accueil';
import { Catalogue } from '../screens/Catalogue';
import { Inscription } from '../screens/Inscription';
import { Connexion } from '../screens/Connexion';
import { Profil } from '../screens/Profil';
import Panier from '../screens/Panier';          // déjà ajouté précédemment
import { Cataloguemongodb } from '../screens/Cataloguemongodb';
import { usePanier } from '../context/PanierContext';
import CartBadge from './CartBadge';

const Stack = createNativeStackNavigator();


export const StackNavigator = () => {

    const {panier}= usePanier();

  return (
    <Stack.Navigator
      initialRouteName="Accueil"
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#2C2C2C',
        headerTitleStyle: { color: '#2C2C2C', fontWeight: '600' },
        headerShadowVisible: true,
        // Badge panier visible sur TOUS les écrans
        headerRight: () => (
          <CartBadge
            count={panier.length}
            onPress={() => navigation.navigate('Panier')}
          />
        ),
      })}
    >
      <Stack.Screen name="Accueil" component={Accueil} options={{ title: 'HightechMarket' }} />
      <Stack.Screen name="Catalogue" component={Catalogue} />
      <Stack.Screen name="Cataloguemongodb" component={Cataloguemongodb} />
      <Stack.Screen name="Inscription" component={Inscription} />
      <Stack.Screen name="Connexion" component={Connexion} />
      <Stack.Screen name="Profil" component={Profil} />
      <Stack.Screen name="Panier" component={Panier} />

    </Stack.Navigator>
  );
};




/* export const StackNavigator = ({ panier, setPanier }) => {
  return (
    <Stack.Navigator
      initialRouteName="Accueil"
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#2C2C2C',
        headerTitleStyle: { color: '#2C2C2C', fontWeight: '600' },
        headerShadowVisible: true,
        // Badge panier visible sur TOUS les écrans
        headerRight: () => (
          <CartBadge
            count={panier.length}
            onPress={() => navigation.navigate('Panier')}
          />
        ),
      })}
    >
      <Stack.Screen name="Accueil" component={Accueil} />
      <Stack.Screen name="Catalogue">
      {(props) => (
      <Catalogue
      {...props}
      panier={panier}
      setPanier={setPanier}// pour ajouter depuis Catalogue
      />
      )}
      </Stack.Screen>

      <Stack.Screen name="Cataloguemongodb">
      {(props) => (
      <Cataloguemongodb
      {...props}
      panier={panier}
      setPanier={setPanier}// pour ajouter depuis Catalogue
      />
      )}
      </Stack.Screen>
      <Stack.Screen name="Inscription" component={Inscription} />
      <Stack.Screen name="Connexion" component={Connexion} />
      <Stack.Screen name="Profil" component={Profil} />
      <Stack.Screen name="Panier">
      {(props) => (
      <Panier
      {...props}
      panier={panier}
      setPanier={setPanier}
      />
      )}
     </Stack.Screen>
    </Stack.Navigator>
  );
};
 */