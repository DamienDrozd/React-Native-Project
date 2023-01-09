import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from "react-i18next";


import Home from '../screens/home';
import Contact from '../screens/Contact';
import Settings from '../screens/settings';
import Chat from '../screens/chat';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} options={{title: t("navbar.home")}} />
      <Tab.Screen name="Contact" component={Contact} options={{title: t("navbar.contact")}}/>
      <Tab.Screen name="Settings" component={Settings} options={{title: t("navbar.settings")}}/>
    </Tab.Navigator>
  );
  }

  const ContactStack = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator initialRouteName="Contact" screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} options={{title: t("navbar.home")}}/>
      <Tab.Screen name="Contact" component={Contact} options={{title: t("navbar.contact")}}/>
      <Tab.Screen name="Settings" component={Settings} options={{title: t("navbar.settings")}}/>
    </Tab.Navigator>
  );
  }

  const SettingsStack = () => {
  const { t } = useTranslation();
    return (
      <Tab.Navigator initialRouteName="Settings" screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={Home} options={{title: t("navbar.home")}}/>
        <Tab.Screen name="Contact" component={Contact} options={{title: t("navbar.contact")}}/>
        <Tab.Screen name="Settings" component={Settings} options={{title: t("navbar.settings")}}/>
      </Tab.Navigator>
    );
  }


const AuthStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Home" >
      <Stack.Screen name="HomeStack" component={HomeStack} options={{title: 'Home', headerShown: false}} />
      <Stack.Screen name="ContactStack" component={ContactStack} options={{title: 'Contact', headerShown: false}} />
      <Stack.Screen name="SettingsStack" component={SettingsStack} options={{title: 'settings', headerShown: false}} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default AuthStack;
