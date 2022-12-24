

import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import { SelectMultipleGroupButton } from 'react-native-selectmultiple-button'
import AsyncStorage from '@react-native-async-storage/async-storage';






 
export default function Interet() {
  const [userList, setUserList] = useState({});
  const [interetList, setInteretList] = useState(["Interet1", "Interet2", "Interet3"]);
  const [selectedInteret, setSelectedInteret] = useState([]);

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
  
      requestOptions = {  
          method: 'GET',
          headers: { 'Content-Type': 'application/json', "authorization": getStorage("token") },
          body: JSON.stringify(interetList)  
      };
      axios.get('http://localhost:3001/api/profile/interet/'+getStorage("userId"),requestOptions).then(async res => {
        var data = await res.data;
        console.log(data);
        for(var i of data){
          if (i.interet_id != null){
            console.log(i.interet_id);
            document.getElementById(i.interet_id).checked  = true;
          }
        }
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
                onPress={(interet) => addInteret(interet)}
              />
            </View>
          ))}
        </View>
      <Button title="Mettre a jour le profil" onPress={() => submit()} ></Button>      
  </View>

  );
}


const getStorage = (token) => {
  AsyncStorage.getItem(token).then((token) => {
    return token;
  })
}

function submit(state, user_id) {

  var send = {}
  send.user_id = user_id;
  send.interet = interet

  if(state.interet.length === 5){
      //blockage du bruteforce 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "authorization": getStorage("token")},
        body: JSON.stringify(send)
    };
    fetch('http://localhost:3001/api/profile/interet/'+getStorage("userId"), requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            alert(data.message) 
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }  else { 
      alert("vous devez choissir 5 centres d'intêret")
    }
  }

