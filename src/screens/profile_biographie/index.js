import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';





 
export default function Biographie() {
  const [userList, setUserList] = useState({});
  const [biographie, setBiographie] = useState([]);

    useEffect(() => {
        const requestOptions = {  
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "authorization": getStorage("token") },
            body: JSON.stringify(userList) 
        };
        
        axios.get('http://localhost:3001/api/profile/'+getStorage("userId"),requestOptions).then(async res => {
            var data = await res.data;
            setUserList(data); 
        }).catch(error => {
            console.error('There was an error with api!', error);
        });
        
  }, []);



    return (
      <View>        
          <Text>Biographie</Text>

          <View>
            <TextInput
              multiline
              numberOfLines={10}
              // style={styles.input}
              onChangeText={(text) => setBiographie(text)}
              value={biographie}
              placeholder="Entrez votre biographie"
              
            />
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

function submit() {

        userList.bio = bio;
        console.log(userList)
 
            //blockage du bruteforce 
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "authorization": getStorage("token")},
            body: JSON.stringify(userList)
        };
        fetch('http://localhost:3001/api/profile/'+getStorage("userId"), requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                alert(data.message)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    } 
