import React, { useState } from 'react';
import { FieldInput, MessageButton, MessageButtonText, ViewCustom, SendIcon } from './styles';
import { sendMessageSocket } from '../../functions/message_sockets';
const sendpng = require('./styles/send.png');


const MessageInput = ({conversation_id, socket}) => {
  const [value, setValue] = useState('');

  const submitMessage = () => {
    sendMessageSocket(conversation_id, socket, value);
    setValue('');
  }; 


  return (
    <ViewCustom>
      <FieldInput
        value={value}
        onChangeText={(text) =>  setValue(text)}
      />
      <MessageButton onPress={submitMessage} >
        <SendIcon source={sendpng}/>
      </MessageButton>   
    </ViewCustom>
  );
};


export default MessageInput;