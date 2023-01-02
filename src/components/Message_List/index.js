import React, { useEffect, useState } from 'react';
import axios from "axios";
import { View, Text, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';




function MessageList({target_id, socket}) {
  const [messages, setMessages] = useState({});

  function Message_user(params) {
    const message = params.message
    const message_User = message.user_id;
    const user_id = getCookie("userId")
    // console.log(user_id);
    // console.log(message_User);
  
    if (user_id === message_User.toString()) {
        return (
            <View
                key={message.id}
                className="message-container user_msg"
                title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
            >
                <Text className="message">{message.message_value}</Text>
                <Text className="time-right">{new Date(message.message_time).toLocaleTimeString()}</Text>
            </View>
        );
    }else{
        return (
            <View
                key={message.id}
                className="message-container target_msg"
                title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
            >
                <Text className="message">{message.message_value}</Text>
                <Text className="time-right">{new Date(message.message_time).toLocaleTimeString()}</Text>
            </View>
        );
    }
    
    return <p>Here, You can write user template. You are a User.</p>;
  }
  

  useEffect(() => {
     AsyncStorage.getItem('userId').then(userId => {
        AsyncStorage.getItem('token').then(token => {
            console.log("userId : ", userId);
            console.log("token : ", token);
            const API_LINK = process.env['API_LINK'] + "/api/chat";
            var requestOptions = {  
                method: 'GET',
                headers: { 'Content-Type': 'application/json', "authorization": getCookie("token"), "user_id":getCookie("userId"), "target_id":target_id  },
            };
            axios.get(API_LINK,requestOptions).then(res => {
                console.log(res);
                var data = res.data;
                setMessages(data);
                // console.log(data);
            })

            const messageListener = (message) => {
                setMessages((prevMessages) => {
                    const newMessages = {...prevMessages};
                    if((message.user_id === getCookie("userId") && message.target_id === target_id) || ((message.user_id) === target_id.toString() &&  (message.target_id).toString() === getCookie("userId"))){
                        // console.log("test")
                        newMessages[message.id] = message;
                    }
                    return newMessages;
                });
            };

  
    
  
            // socket.on('message', messageListener);
            // var user_id = getCookie("userId");
            // var token = getCookie("token");
            // var Users = {user_id : user_id, target_id : target_id, token : token}
            // // console.log(Users)
            // socket.emit('getMessages', Users);

            // return () => {
            //   socket.off('message', messageListener);
            // };
        })
    })
  }, [target_id,socket]);

  return (
    <View className="message-list">
        
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <View key={message.id}>
            <Message_user message={message} />
          </View>
        ))
      }
    </View>
  );
}





export default MessageList;