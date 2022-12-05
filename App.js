// In App.js in a new project

import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Props from "./src/screens/props"
import Home from "./src/screens/home"
import Login from "./src/screens/login"
import Characters from "./src/screens/characters"

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button title="Props" onPress={() => navigation.navigate('Props')} />
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Characters" onPress={() => navigation.navigate('Characters')} />
    </View> 
  );
} 



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Details">
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Props" component={Props} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Characters" component={Characters} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;