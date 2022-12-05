import React, { useState, useEffect, PureComponent } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


import Logo from "../../components/Logo";
import Title from "../../components/Title";


const Login = ({ navigation }) => { 

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState(""); 

    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            if (token) {
                navigation.navigate('Characters')
            }
        })
    }, []);


    const Login = () => {
        console.log("Login");
        console.log(userName);
        console.log(password);
        let header = {
            method: 'POST',
            data: JSON.stringify({
                username : userName,
                password: password
            })
        }
        console.log(header);
        if (userName.length < 3 || password.length < 8) {
            alert("error");
        } else {
            console.log("envoi de la requête");
            axios({
            method: 'post',
            url: 'https://login.hikkary.com/users/login',
            data: {
                username: userName,
                password: password,
            },
            })
            .then(response => {
                console.log(response);
                console.log("response api : ", response.data);
                AsyncStorage.setItem('token', response.headers['x-access-token']).then(() => {
                    console.log("login success");
                    navigation.navigate("Characters");
                }).catch((error) => {
                    console.log(error);
                });
            })
        }
        
    }
    

    return (
        <View>
            <Title title="Login page"/>
            <Logo />
            <Text>
                Username:
            </Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                value={userName}
                onChangeText={(text) => setUserName(text)}
            />


            <Text>
                Password:
            </Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <Button title="Login" onPress={() => Login()} />
        </View >
    );
    }
 

export default Login; 