

import React from 'react';
import Routes from './src/config/routes';
import {NavigationContainer} from '@react-navigation/native';


//On mets les routes dans un composant "Routes"
const App = () => {
  return (
  <NavigationContainer>
    <Routes />
  </NavigationContainer>);
};

export default App; 