import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import MessageList from '../../components/Message_List';
import MessageInput from '../../components/Message_Input';
import io from "socket.io-client";

const ENDPOINT = process.env['API_LINK']

// import Message from "./messaging.component"


 
export default function Chat({ route, navigation }) {
    const { contact } = route.params;
    const [socket, setSocket] = useState(null);
    

    useEffect(() => {
        navigation.setOptions({ title: contact.firstname });
        const newSocket = io(ENDPOINT);
        newSocket.on('connect', () => {
            console.log('socket connected');
        });
        newSocket.on('disconnect', () => {
            console.log('socket disconnected');
        });
        newSocket.on('message', (message) => {
            console.log(message);
        });
        newSocket.on('error', (error) => {
            console.log(error);
            showMessage({
                message: "error with sockets : ", error,
                type: "info",
            });
        });
        setSocket(newSocket);
        console.log("socket", socket)
        return () => newSocket.close(); 
    }, [setSocket]);


    

    return (
        <View className="message-app">
            { socket ? (
                <View>
                    <View>
                        <MessageList target_id={contact.contact_id} socket={socket} />
                    </View>
                    <MessageInput target_id={contact.contact_id}  socket={socket} />
                </View>
            ) : (
                <SafeAreaView>
                    <ActivityIndicator />
                </SafeAreaView>
            )}
        </View>
    );

}







 




  

