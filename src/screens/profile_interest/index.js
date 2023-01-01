

import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import { SelectMultipleGroupButton } from 'react-native-selectmultiple-button'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Update_Button from "../../components/Update_User";




 
export default function Interet({ route, navigation }) {
  const [user, setUser] = useState(route.params.user)
  const [interetList, setInteretList] = useState(["Interet1", "Interet2", "Interet3"]);

    useEffect(() => {
    
      var requestOptions = {  
          method: 'GET',
          headers: { 'Content-Type': 'application/json', "authorization": getStorage("token") },
          body: JSON.stringify(interetList) 
      };
      
      axios.get('http://localhost:3001/api/interet',requestOptions).then(async res => {
        var data = await res.data;
        setInteretList(final)          
      }).catch(error => {
          console.error('There was an error with api!', error);
      });
  }, []);

  
  const addInteret = (interet) => {
    console.log(interet)
    setSelectedInteret([...selectedInteret, interet]);
  }
  
    
    return (
      
    <View>
        <Text>Vos centres d'intêret :</Text>

        <View>
          {interetList.map(interet => (
            <View key={interet}>
              <Button
                title={interet}
                onPress={(interet) => {
                    var newUser = user;
                    newUser.interet.append(interet);
                    setUser(newUser)
                }}
              />
            </View>
          ))}
        </View>
        <Update_Button user={user}/>
      
  </View>

  );
}


const getStorage = (token) => {
  AsyncStorage.getItem(token).then((token) => {
    return token;
  })
}
