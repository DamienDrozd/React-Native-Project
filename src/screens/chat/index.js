import React, { useState, useEffect, PureComponent } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MessageList from '../../components/Message_List';
import MessageInput from '../../components/Message_Input';
// import {io} from "socket.io-client";
const ENDPOINT = process.env['API_LINK']

// import Message from "./messaging.component"


 
export default function Chat({ route, navigation }) {
    const { contact } = route.params;
    const [socket, setSocket] = useState(null);
    

    useEffect(() => {
        // AsyncStorage.getItem('userId').then(userId => {
        //     AsyncStorage.getItem('token').then(token => {
        //         const target_id = contact.contactId
        //         const newSocket = io(ENDPOINT, user_id, token, target_id);
        //         // const newSocket = io(ENDPOINT);
        //         setSocket(newSocket);
        //         return () => newSocket.close(); 
        //     })
        // })
        const newSocket = new WebSocket(ENDPOINT);
        setSocket(newSocket);
        return () => newSocket.close(); 
    }, [setSocket]);


    

    return (
        <View className="message-app">
            <Text>{contact.firstname}</Text>
            { socket ? (
                <View className="chat-container">
                    <MessageList target_id={contact.contact_id} socket={socket} />
                {/* <MessageInput target_id={contact.contact_id}  socket={socket} /> */}
                    <Text>Connected to socket</Text>
                </View>
            ) : (
                <Text>Not Connected</Text>
            )}
        </View>
    );

}







 




  

