import React, { useEffect, useState } from 'react';
import { UserMewssage, UserMewssageText, ContactMessage, ContactMessageText, CustomFlatList } from './styles';

import { getMessageList } from "../../functions/api_request";
import { getStorage } from "../../functions/storage"; 
import { messageSocket } from "../../functions/message_sockets";



const MessageList = ({conversation_id, socket}) => {
  const [messages, setMessages] = useState({});
  const [userId, setUserId] = useState(0);
  
  

  useEffect(() => {
    messageSocket(conversation_id, socket, messages, setMessages);
  }, [conversation_id, socket]);

  useEffect(() => {
    getMessageList(conversation_id).then(data => {
      setMessages(data);
    });
    getStorage('userId').then(data => {
      setUserId(data);
    });
  }, [conversation_id]);


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