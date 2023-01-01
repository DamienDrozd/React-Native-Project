import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {API_LINK} from '@env';

import Logo from "../../components/Logo";
import Title from "../../components/Title";





const Register = ({ navigation }) => { 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [repeatPassword, setRepeatPassword] = useState(""); 

    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            if (token) {
                navigation.navigate('Auth')
            }
        })
    }, []);


    const SignIn = () => {
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
        const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (email.length < 5 || password.length < 8 || password != repeatPassword || !email.toLowerCase().match(email_regex)) {
            alert("erreur de saisie");
        } else {
            const API_LINK = process.env['API_LINK'] + "/api/auth/signup";
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
                        navigation.navigate("Profile");
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
            <Title title="Register page"/>
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
            <Button title="Register" onPress={() => SignIn()} />
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </View >
    );
    }
 

export default Register; 