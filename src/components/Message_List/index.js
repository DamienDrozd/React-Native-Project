import React, { useEffect, useState } from 'react';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserMewssage, UserMewssageText, ContactMessage, ContactMessageText, CustomFlatList } from './styles';




function MessageList({target_id, socket}) {
  const [messages, setMessages] = useState({});
  const [userId, setUserId] = useState(0);
  
  

  useEffect(() => {
     AsyncStorage.getItem('userId').then(userId => {
        AsyncStorage.getItem('token').then(token => {
            console.log("userId : ", userId);
            console.log("token : ", token);
            setUserId(userId);
            const API_LINK = process.env['API_LINK'] + "/api/chat";
            let requestOptions = {  
                method: 'GET',
                headers: { 'Content-Type': 'application/json', "authorization": token, "user_id":userId, "target_id":target_id  },
            };
            axios.get(API_LINK,requestOptions).then(res => {
                console.log(res);
                let data = res.data;
                setMessages(data);
                console.log(data);
            })
          const messageListener = (message) => {
            setMessages((prevMessages) => {
              const newMessages = {...prevMessages};
              if((message.user_id === userId && message.target_id === target_id) || ((message.user_id) === target_id.toString() &&  (message.target_id).toString() === getCookie("userId"))){
                  newMessages[message.id] = message;
              }
              return newMessages;
            });
          };
          socket.on('message', messageListener);
          let Users = {user_id : userId, target_id : target_id, token : token}
          socket.emit('getMessages', Users);

          return () => {
            socket.off('message', messageListener);
          };
        })
    })
  }, [target_id,socket]);

  return (
    <CustomFlatList
        data={[...Object.values(messages)].sort((a, b) => a.time - b.time).reverse()}
        renderItem={({ item }) => <Message_user message={item} userId={userId} key={userId} />}
        keyExtractor={(item) => item.id}
        // initialScrollIndex={[...Object.values(messages)].length - 1}
        inverted
    />
  );
}

const Message_user = (params) => {
  const message = params.message
  const message_User = message.user_id;
  const userId = params.userId;  
  if (userId === message_User.toString()) {
    return (
      <UserMewssage
        key={message.id}
        title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
      >
        <UserMewssageText>{message.message_value}</UserMewssageText>
        <UserMewssageText>{new Date(message.message_time).toLocaleTimeString()}</UserMewssageText>
      </UserMewssage>
    );
  }else{
    return (
      <ContactMessage
        key={message.id}
        title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
      >
        <ContactMessageText>{message.message_value}</ContactMessageText>
        <ContactMessageText>{new Date(message.message_time).toLocaleTimeString()}</ContactMessageText>
      </ContactMessage>
    );
  }
}





export default MessageList;