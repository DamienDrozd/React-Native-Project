import React, {useEffect} from 'react';
import {SafeAreaView, ActivityIndicator} from 'react-native';
import { useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import './axiosInterceptor';



import AuthStack from './authStack';
import PublicStack from './publicStack';
import ProfileStack from './profileStack';


const Stack = createNativeStackNavigator();

//Création du router
const Routes = () => {
  
  
  return (
    <Stack.Navigator initialRouteName="Public" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Public" component={PublicStack} />
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Profile" component={ProfileStack} />
    </Stack.Navigator>
  );
};




export default Routes;