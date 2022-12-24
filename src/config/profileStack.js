import React, {useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, Button, SafeAreaView, ActivityIndicator} from 'react-native';
import { useNavigation} from '@react-navigation/native';

import Profile1 from "../screens/profile_1"
import Profile2 from "../screens/profile_2"
import Profile3 from "../screens/profile_3"
import Biographie from "../screens/profile_biographie"
import Interest from "../screens/profile_interest"
import Question from "../screens/profile_question"
import Location from "../screens/profile_location"


const Stack = createNativeStackNavigator();

const PublicStack = () => {
  // const navigation = useNavigation();

  return (
      <Stack.Navigator initialRouteName="Location" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Profile1" component={Profile1} />
        <Stack.Screen name="Profile2" component={Profile2} />
        <Stack.Screen name="Profile3" component={Profile3} />
        <Stack.Screen name="Biographie" component={Biographie} />
        <Stack.Screen name="Interest" component={Interest} />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="Location" component={Location} />
      </Stack.Navigator>
  );
};

export default PublicStack;


