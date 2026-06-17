import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './composants/StackNavigator';
import { DrawerNavigator } from './composants/DrawerNavigator';
import { PanierProvider } from './context/PanierContext';
import { UserProvider } from './context/UserContext';


export const MyAppec = () => {
  //const [panier, setPanier] = useState([]);

  return (
    
    // Sans PanierContext
      // <NavigationContainer>
        // <StackNavigator panier={panier} setPanier={setPanier} />
        // <DrawerNavigator panier={panier} setPanier={setPanier} /> 
      // </NavigationContainer>

    // Avec PanierContext et Usercontext
    <UserProvider>
      <PanierProvider>
        <NavigationContainer>
          <StackNavigator/> 
          {/* <DrawerNavigator/>   */}
        </NavigationContainer>
      </PanierProvider>
    </UserProvider>
  );

};
