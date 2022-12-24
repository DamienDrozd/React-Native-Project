import React, { useState, useEffect, PureComponent } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";



 
export default function Profile1() {
    const [userList, setUserList] = useState({});
    const [birthday, setBirthday] = useState(new Date());
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

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
            <Text>Profil</Text>

            <Text>Création de profil</Text>

            <View>
                <Text>Prenom</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    value={firstname}
                    onChangeText={(text) => setFirstname(text)}
                />
            </View>

            <View>
                <Text>Prenom</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    value={lastname}
                    onChangeText={(text) => setLastname(text)}
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




function submit(state, userList) {


        userList.firstname = firstname;
        userList.lastname = lastname;

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

   
  