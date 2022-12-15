import React, {useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, Button, SafeAreaView, ActivityIndicator} from 'react-native';
import Login from '../screens/login';
import Register from '../screens/register';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();

const PublicStack = ({navigation}) => {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        setLoading(false);
        navigation.navigate('Auth', {screen: 'Characters'});
      }
    });
  });

  // if (loading) {
  //   return (
  //     <SafeAreaView>
  //       <ActivityIndicator />
  //     </SafeAreaView>
  //   );
  // }

  function DetailsScreen({ navigation }) {
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