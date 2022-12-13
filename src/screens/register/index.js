import React, { useState, useEffect, PureComponent } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {API_LINK} from '@env';
// API_LINK = "http://"
console.log("API_LINK : ", API_LINK);

import Logo from "../../components/Logo";
import Title from "../../components/Title";





const Register = ({ navigation }) => { 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [repeatPassword, setRepeatPassword] = useState(""); 

    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            if (token) {
                navigation.navigate('Characters')
            }
        })
    }, []);


    const Register = () => {
        console.log("Register");
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
        // const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        // if (email.length < 5 || password.length < 8 || password != repeatPassword || !email.toLowerCase().match(email_regex)) {
        //     alert("error");
        // } else {
            // const API_LINK = process.env['API_LINK'];
            console.log("API_LINK : ", API_LINK);
            console.log("envoi de la requête");
            axios({
            method: 'post',
            url: API_LINK + '/auth/signup',
            data: {
                email: email,
                password: password,
            },
            })
            .then(response => {
                console.log(response);
                console.log("response api : ", response.data);
                AsyncStorage.setItem('token', response.headers['x-access-token']).then(() => {
                    console.log("Register success");
                    navigation.navigate("Characters");
                }).catch((error) => {
                    console.log("storage error : ", error);
                });
            }).catch(error => {
                console.log("api error : ", error);
            });
        // }
        
    }
    

    return (
        <View>
            <Title title="Register page"/>
            <Logo />
            <Text>
                Email:
            </Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <View>
                <Text>
                    Password:
                </Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <Text>
                    Repeat Password:
                </Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    value={repeatPassword}
                    secureTextEntry={true}
                    onChangeText={(text) => setRepeatPassword(text)}
                />
            </View>
            <Button title="Register" onPress={() => Register()} />
        </View >
    );
    }
 

export default Register; 