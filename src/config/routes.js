import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './authStack';
import PublicStack from './publicStack';

const Stack = createNativeStackNavigator();

//Création du router
const Routes = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth" screenOptions={{headerShown: false,}}>
        <Stack.Screen name="Public" component={PublicStack} />
        <Stack.Screen name="Auth" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;