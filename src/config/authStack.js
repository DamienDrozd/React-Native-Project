import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/home';
import Contact from '../screens/Contact';
import Settings from '../screens/settings';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Contact" component={Contact} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
  }

  const ContactStack = () => {
    return (
        <Tab.Navigator initialRouteName="Contact" screenOptions={{headerShown: false}}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Contact" component={Contact} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
  }

  const SettingsStack = () => {
    return (
        <Tab.Navigator initialRouteName="Settings" screenOptions={{headerShown: false}}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Contact" component={Contact} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
  }

  const ProfileStack = () =>  {
    return (
        <Tab.Navigator initialRouteName="Profile" screenOptions={{headerShown: false}}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Contact" component={Contact} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
  }



const AuthStack = ({navigation}) => {

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeStack" component={HomeStack} options={{title: 'Home'}} />
      <Stack.Screen name="ContactStack" component={ContactStack} options={{title: 'Contact'}} />
      <Stack.Screen name="SettingsStack" component={SettingsStack} options={{title: 'Settings'}} />
    </Stack.Navigator>
  );
};

export default AuthStack;
