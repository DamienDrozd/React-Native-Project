import React, {useEffect} from 'react';
import { useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './authStack';
import PublicStack from './publicStack';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Stack = createNativeStackNavigator();

//Création du router
const Routes = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(true);
  

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        setLoading(false);
        navigation.navigate('Auth', {screen: 'Home'});
      } else {
        setLoading(false);
        navigation.navigate('Public');
      }
    });
  });
  
  return (
    <Stack.Navigator initialRouteName="Auth" screenOptions={{headerShown: false,}}>
      <Stack.Screen name="Public" component={PublicStack} />
      <Stack.Screen name="Auth" component={AuthStack} />
    </Stack.Navigator>
  );
};

export default Routes;