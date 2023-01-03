import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, Button, SafeAreaView, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


import Login from '../screens/login';
import Register from '../screens/register';
const Stack = createNativeStackNavigator();

const PublicStack = ({navigation}) => {

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
          if (response == null || response == undefined || response == "") {
            console.log("User not authenticated : ", response);
            Logout();
            setLoading(false);
            console.log("Natvigate to : Public");
            navigation.navigate('Public');
            return;
          } else {
            console.log("User authenticated : ", response);
            setLoading(false);
            console.log("Natvigate to : Auth");
            navigation.navigate('Auth' );
          }
        }).catch(error => {
          console.log("User not authenticated : ", error);
          Logout();
          setLoading(false);
          console.log("Natvigate to : Public");
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
  const Logout = () => {
    AsyncStorage.getAllKeys().then((keys) => {
        AsyncStorage.multiRemove(keys).then(() => {
            console.log("Logout success");
        }).catch((error) => {
            console.log("storage error : ", error);
        });
    }).catch((error) => {
        console.log("storage error : ", error);
    });
  }

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