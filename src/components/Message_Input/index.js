import React, { useState } from 'react';
import { View, Text, Button, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    <View>
      <TextInput
        value={value}
        onChangeText={(text) => {
            setValue(text);
        }}
      />
      <Button title="Post message" onPress={() => submitMessage ()} ></Button>   
    </View>
  );
};



export default MessageInput;