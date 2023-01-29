import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from "react-i18next";
import styled from 'styled-components/native';


import HomeImage from "../img/tabIcons/home.png";
import ChatImage from "../img/tabIcons/chat.png";
import SettingsImage from "../img/tabIcons/settings.png";
import HomeSelectedImage from "../img/tabIcons/homeSelected.png";
import ChatSelectedImage from "../img/tabIcons/chatSelected.png";
import SettingsSelectedImage from "../img/tabIcons/settingsSelected.png";

// Peel_Mobile\src\stacks\tabIcons\Chat.png


import HomeScreen from '../screens/home';
import ContactScreen from '../screens/Contact';
import SettingsScreen from '../screens/settings';
import Chat from '../screens/chat';
// const Tab = createBottomTabNavigator();

const TabStack = createBottomTabNavigator();

const TabStackScreen = () => {
  const { t } = useTranslation();
  return (
    <TabStack.Navigator initialRouteName="Home" screenOptions={({ route }) => ({ tabBarIcon: ({ focused, color, size }) => Icon({ route, focused, color, size }),
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
      <TabStack.Screen name="Home" component={HomeScreen} options={{title: t("navbar.home"), headerShown: false}} />
      <TabStack.Screen name="Contact" component={ContactScreen} options={{title: t("navbar.contact"), headerShown: false}}/>
      <TabStack.Screen name="Settings" component={SettingsScreen} options={{title: t("navbar.settings"), headerShown: false}}/>
    </TabStack.Navigator>
  ); 
}


const Stack = createNativeStackNavigator();

const AuthStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeStack" >
      <Stack.Screen name="HomeStack" component={TabStackScreen} options={{title: 'Home', headerShown: false}} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default AuthStack;


const Icon = ({route, focused, color, size }) => {
  let iconName = "";

  


  if (color != "gray") {
    if (route.name === 'Home') {
      iconName = <ImageLogo source={HomeSelectedImage} />;
    } else if (route.name === 'Contact') {
      iconName = <ImagePicto source={ChatSelectedImage} />;
    } else if (route.name === 'Settings') {
      iconName = <ImagePicto source={SettingsSelectedImage} />;
    }
  } else {
    if (route.name === 'Home') {
      iconName = <ImageLogo source={HomeImage} />;
    } else if (route.name === 'Contact') {
      iconName = <ImagePicto source={ChatImage} />;
    } else if (route.name === 'Settings') {
      iconName = <ImagePicto source={SettingsImage} />;
    }
  }

 
  if (iconName != "") {
    return iconName;
  }
  
};


const ImageLogo = styled.Image`
  width: 30px;
  height: 30px;
`;

const ImagePicto = styled.Image`
  width: 20px;
  height: 20px;
`;