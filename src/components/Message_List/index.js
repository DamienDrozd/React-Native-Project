import React, { useEffect, useState } from 'react';
import { UserMewssage, UserMewssageText, ContactMessage, ContactMessageText, CustomFlatList } from './styles';

import { getMessageList } from "../../functions/api_request";
import { getStorage } from "../../functions/storage"; 
import { messageSocket } from "../../functions/message_sockets";



const MessageList = ({target_id, socket}) => {
  const [messages, setMessages] = useState({});
  const [userId, setUserId] = useState(0);
  
  

  useEffect(() => {
    messageSocket(target_id, socket, messages, setMessages);
  }, [target_id, socket]);

  useEffect(() => {
    getMessageList(target_id).then(data => {
      setMessages(data);
    });
    getStorage('userId').then(userId => {
      setUserId(userId);
    });
  }, [target_id]);


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
  if (message_User != undefined){
    if ( userId == message_User) {
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
          <ContactMessageText>{message_User}</ContactMessageText>
          <ContactMessageText>{message.message_value}</ContactMessageText>
          <ContactMessageText>{new Date(message.message_time).toLocaleTimeString()}</ContactMessageText>
        </ContactMessage>
      );
    }
  }
}





export default MessageList;