

import React from 'react';
import Routes from './src/config/routes';
import {NavigationContainer} from '@react-navigation/native';
import {View, StatusBar} from 'react-native';
import FlashMessage from "react-native-flash-message";
import {ThemeProvider} from 'styled-components';

import theme from './src/config/theme';



//On mets les routes dans un composant "Routes"
const App = () => {
  return (
    <>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <View style={{flex: 1}}>
            <Routes />
            <FlashMessage position="top" />       
          </View>
        </ThemeProvider>
      </NavigationContainer>
      <StatusBar/>
    </>
  );
};

export default App; 