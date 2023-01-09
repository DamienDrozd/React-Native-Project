import React, { useState } from 'react';
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FieldInput, MessageButton, MessageButtonText, ViewCustom } from './styles';


const MessageInput = ({target_id,socket}) => {
  const [value, setValue] = useState('');

  const submitMessage = () => {
    AsyncStorage.getItem('userId').then(userId => {
      AsyncStorage.getItem('token').then(token => {
        let message = {value : value, user_id : userId, target_id : target_id, token : token}
        socket.emit('message', message);
        socket.onopen = () => {
          socket.send('message', message);
        };
        setValue('');
      })
    })
  }; 
  

  return (
    <ViewCustom>
      <FieldInput
        value={value}
        onChangeText={(text) => {
            setValue(text);
        }}
      />
      <MessageButton onPress={() => submitMessage ()} >
        <MessageButtonText>Send</MessageButtonText>
      </MessageButton>   
    </ViewCustom>
  );
};



export default MessageInput;