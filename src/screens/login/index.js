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
        const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if ( !email.toLowerCase().match(email_regex)) {
            alert("erreur de saisie");
        } else {
            const API_LINK = process.env['API_LINK'] + "/api/auth/signin";
            console.log("API_LINK : ", API_LINK);
            console.log("envoi de la requête");
            axios.post(API_LINK, {
                email: email, 
                password: password
            })
            .then(response => {
                console.log(response);
                console.log("response api : ", response.data);
                AsyncStorage.setItem('token', response.data['token']).then(() => {
                    AsyncStorage.setItem('userId', response.data['userId'].toString()).then(() => {
                        alert("Register success");
                        navigation.navigate("Auth");
                    }).catch((error) => {
                        alert("storage error : ", error);
                    });
                }).catch((error) => {
                    alert("storage error : ", error);
                });
            }).catch(error => {
                alert("api error : ", error);
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
                keyboardType="email-address"
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
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </View >
    );
    }


 

export default Login; 