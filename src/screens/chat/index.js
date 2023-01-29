import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, SafeAreaView } from "react-native";
import MessageList from '../../components/Message_List';
import MessageInput from '../../components/Message_Input';
import io from "socket.io-client";

import Loading from '../../components/loading';

const ENDPOINT = process.env['API_LINK']

// import Message from "./messaging.component"




 
const Chat = ({ route, navigation }) => {
    const { conversation } = route.params;
    const {name} = route.params;
    const [socket, setSocket] = useState(null);
    

    useEffect(() => {
        navigation.setOptions({ title: name });
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
        // console.log("socket", socket)
        return () => newSocket.close(); 
    }, [setSocket]);


    

    return (
        <View className="message-app">
            { socket ? (
                <View>
                    <MessageList conversation_id={conversation._id} socket={socket} />
                    <MessageInput conversation_id={conversation._id}  socket={socket} />
                </View>
            ) : (
                <Loading />
            )}
        </View>
    );

}



export default Chat;






 




  

