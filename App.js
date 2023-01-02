

import React from 'react';
import Routes from './src/config/routes';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";


//On mets les routes dans un composant "Routes"
const App = () => {
  return (
  <NavigationContainer>
    <FlashMessage position="top" />
    <Routes />
  </NavigationContainer>);
};

export default App; 