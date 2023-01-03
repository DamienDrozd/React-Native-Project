import React, { useState, useEffect, PureComponent } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
// import Message from "./messaging.component"
import Chat from "../chat"
 
export default function Contact() {
    const [contactList, setContactList] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('userId').then(userId => {
            AsyncStorage.getItem('token').then(token => {
                const requestOptions = {  
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', "authorization": token},
                };
                const API_LINK = process.env['API_LINK'] + "/api/contact/list/" + userId;
                console.log(API_LINK)
                axios.get(API_LINK,requestOptions).then(res => {
                    // console.log(res);
                    var data =  res.data; 
                    console.log(data);
                    setContactList(data); 
                })
            })
        }) 
    }, []);


    function ContactList({navigation}) {
        return (
            <View className="message-app">
                {contactList.map((contact) => (
                    <View className="contact" key={contact.contactId}>
                        <Text>{contact.firstname}</Text>
                        <Button  title={contact.firstname} onPress={() => navigation.navigate('Chat', {contact : contact})}/>
                    </View>
                ))}
            </View>
        );
    } 

  return (
    <Stack.Navigator initialRouteName="ContactList">
        <Stack.Screen name="ContactList" component={ContactList}/>
        <Stack.Screen name="Chat" component={Chat}/>
    </Stack.Navigator>
  );
}


