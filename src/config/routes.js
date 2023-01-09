import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import './axiosInterceptor';



import AuthStack from '../stacks/authStack';
import PublicStack from '../stacks/publicStack';
import ProfileStack from '../stacks/profileStack';


const Stack = createNativeStackNavigator();
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