import React, {useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, Button, SafeAreaView, ActivityIndicator} from 'react-native';
import { useNavigation} from '@react-navigation/native';

import Login from '../screens/login';
import Register from '../screens/register';
const Stack = createNativeStackNavigator();

const PublicStack = () => {
  // const navigation = useNavigation();
  
 

  function DetailsScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
      </View> 
    );
  } 

  return (
    <Stack.Navigator initialRouteName="Details" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Details" component={DetailsScreen} options={{title: 'Details'}} />
        <Stack.Screen name="Login" component={Login} options={{title: 'Login'}} />
        <Stack.Screen name="Register" component={Register} options={{title: 'Register'}} />
    </Stack.Navigator>
  );
};

export default PublicStack;