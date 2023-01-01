
import React, { useState, useEffect, PureComponent } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Update_Button = (props) => {
    const [user, setUser] = useState(props.user);
    
       
    
    
    
    return (
    <View>
        <Button title="Mettre a jour le profil" onPress={() => submit(user)} ></Button>   
    </View>);
}

const getStorage = (token) => {
  AsyncStorage.getItem(token).then((token) => {
    return token;
  })
}

const submit = (User) => {
    console.log(User)
    //blockage du bruteforce 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "authorization": getStorage("token")},
        body: JSON.stringify(User)
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

export default Update_Button;