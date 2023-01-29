import React, { useEffect, useState } from 'react';
import { UserMewssage, UserMewssageText, ContactMessage, ContactMessageText, CustomFlatList } from './styles';

import { getMessageList } from "../../functions/api_request";
import { getStorage } from "../../functions/storage"; 
import { messageSocket } from "../../functions/message_sockets";

import { FlatList } from 'react-native';



const MessageList = ({conversation_id, socket}) => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(0);
  
  useEffect(() => {
    getMessageList(conversation_id).then(data => {
      console.log("message list : ", data)
      setMessages(data);
    });
    
    getStorage('userId').then(data => {
      setUserId(data);
    });
  }, [conversation_id]);

  useEffect(() => {    
    
    socket.on('message', messageListener);

    return () => { 
        socket.off('message', messageListener);
    };
  }, [socket]);

    const messageListener = (message) => {
    console.log("message listener : ", message)
    console.log("old messages : ", [...messages])
    getMessageList(conversation_id).then(data => {
        console.log("message list : ", data)
        return setMessages(data);
    });
  };

    // getStorage('userId').then((userId) => {
    //     if (message.sender._id !== userId) {
    //         onDisplayNotification(message.sender.firstName, message.content.content)
    //     }
    // })
    
    // const newMessages = messages;
    //   if((message.conversation_id === conversation_id)){
    //     console.log("newMessages : ", newMessages)
    //     if (newMessages != undefined && newMessages != {} && newMessages != []){
    //         newMessages.push(message.content);
    //         console.log("add message : ", message.content)
    //         console.log("new messages : ", newMessages)
    //         setMessages(newMessages);
    //     }
    //   }
  // };

  


  return (
    <CustomFlatList>
        <FlatList 
          data={[...Object.values(messages)].sort((a, b) => a.time - b.time).reverse()}
          renderItem={({ item }) => <Message_user message={item} userId={userId} key={userId} />}
          keyExtractor={(item) => item.id}
          extraData={messages}
          inverted 
        />
    </CustomFlatList>
  );
}

const Message_user = (params) => {
  const message = params.message
  const message_User = message.sender.firstName;
  const message_UserId = message.sender._id;
  const userId = params.userId;  
  if (message_UserId != undefined){
    if ( userId == message_UserId) {
      return (
        <UserMewssage
          key={message._id}
          title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
        >
          <UserMewssageText>{message.content}</UserMewssageText>
          <UserMewssageText>{new Date(message.createdAt).toLocaleTimeString()}</UserMewssageText>
        </UserMewssage>
      );
    }else{
      return (
        <ContactMessage
          key={message._id}
          title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
        >
          <ContactMessageText>{message_User}</ContactMessageText>
          <ContactMessageText>{message.content}</ContactMessageText>
          <ContactMessageText>{new Date(message.createdAt).toLocaleTimeString()}</ContactMessageText>
        </ContactMessage>
      );
    }
  }
}





export default MessageList;