import React, { useState, useEffect } from 'react';
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FieldInput, MessageButton, MessageButtonText, ViewCustom } from './styles';
import { sendMessageSocket } from '../../functions/message_sockets';


const MessageInput = ({target_id,socket}) => {
  const [value, setValue] = useState('');


  const submitMessage = () => {
    sendMessageSocket(target_id, socket, value);
    setValue('');
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