import React, {useEffect} from 'react';
import {SafeAreaView, ActivityIndicator} from 'react-native';
import { useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import './axiosInterceptor';



import AuthStack from './authStack';
import PublicStack from './publicStack';
import ProfileStack from './profileStack';





const Stack = createNativeStackNavigator();

//Création du router
const Routes = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);
  

  useEffect(() => {
    AsyncStorage.getItem('userId').then(userId => {
      AsyncStorage.getItem('token').then(token => {
        console.log("userId : ", userId);
        console.log("token : ", token);
        const API_LINK = process.env['API_LINK'] + "/api/auth/protected";
        if (userId == null || token == null || userId == undefined || token == undefined) {
          console.log("User not authenticated");
          setLoading(false);
          navigation.navigate('Public');
          return;
        }
        axios.get(API_LINK, {
            headers: { authorization : token },
            body: {userId: userId}
        })
        .then(response => {
          console.log("User authenticated : ", response);
          setLoading(false);
          // navigation.navigate('Auth' );
        }).catch(error => {
          console.log("User not authenticated : ", error);
          setLoading(false);
          navigation.navigate('Public');
        });
      });
    });
  }, []);

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  
  return (
    <Stack.Navigator initialRouteName="Public" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Public" component={PublicStack} />
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Profile" component={ProfileStack} />
    </Stack.Navigator>
  );
};


export default Routes;