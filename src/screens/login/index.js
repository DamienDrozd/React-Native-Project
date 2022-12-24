import React, { useState, useEffect, PureComponent } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


import Logo from "../../components/Logo";
import Title from "../../components/Title";


const Login = ({ navigation }) => { 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            if (token) {
                navigation.navigate('Auth')
            }
        })
    }, []);


    const log = () => {
        console.log("Login");
        console.log(email);
        console.log(password);
        let header = {
            method: 'POST',
            data: JSON.stringify({
                email : email,
                password: password
            })
        }
        console.log(header);
        const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if ( !email.toLowerCase().match(email_regex)) {
            alert("erreur de saisie");
        } else {
            // const API_LINK = process.env['API_LINK'] + "/api/auth/signin";
            // const API_LINK = "http://localhost:3002/api/auth/signin";
            const API_LINK = "https://login.hikkary.com/users/login";
            console.log("API_LINK : ", API_LINK);
            console.log("envoi de la requête");
            axios({
            method: 'post',
            url: API_LINK,
            headers: { "Content-Type": "application/json" },
            data: {
                username : email, 
                password: password,
            },
            })
            .then(response => {
                console.log(response);
                console.log("response api : ", response.data);
                AsyncStorage.setItem('token', response.headers['x-access-token']).then(() => {
                    console.log("Login success");
                    navigation.navigate("Auth");
                }).catch((error) => {
                    console.log("storage error : ", error);
                });
            }).catch(error => {
                console.log("api error : ", error);
            });
        }
        
    }
    

    return (
        <View>
            <Title title="Login page"/>
            <Logo />
            <Text>
                Email:
            </Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />


            <Text>
                Password:
            </Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                value={password}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            <Button title="Login" onPress={() => log()} />
        </View >
    );
    }

const getStorage = (token) => {
  AsyncStorage.getItem(token).then((token) => {
    return token;
  })
}
 

export default Login; 