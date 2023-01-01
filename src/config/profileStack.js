import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView, ActivityIndicator} from 'react-native';
import axios from "axios";

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
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = useState({"birthday": new Date, "interet":[], "longitude" : 0, "latitude" : 0, "searchRange" : 0, "question_id": [1,2,0], "response": ["reponse 1","reponse 2","reponse 3"]});

    useEffect(() => {
        const requestOptions = {  
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "authorization": getStorage("token") },
            body: JSON.stringify(user) 
        };
        
        axios.get('http://localhost:3001/api/profile/'+getStorage("userId"),requestOptions).then(async res => {
            var data = await res.data;
            setUser(data); 
            
        }).catch(error => {
            console.error('There was an error with api!', error);
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
      <Stack.Navigator initialRouteName="Profile2" screenOptions={{headerShown: false}} >
        <Stack.Screen name="Profile1" component={Profile1} initialParams={{user : user}}/>
        <Stack.Screen name="Profile2" component={Profile2} initialParams={{user : user}}/>
        <Stack.Screen name="Profile3" component={Profile3} initialParams={{user : user}}/>
        <Stack.Screen name="Biographie" component={Biographie} initialParams={{user : user}}/>
        <Stack.Screen name="Interest" component={Interest} initialParams={{user : user}}/>
        <Stack.Screen name="Question" component={Question} initialParams={{user : user}}/>
        <Stack.Screen name="Location" component={Location} initialParams={{user : user}}/> 
      </Stack.Navigator>
  );
};

const getStorage = (token) => {
  AsyncStorage.getItem(token).then((token) => {
    return token;
  })
}

export default PublicStack;


