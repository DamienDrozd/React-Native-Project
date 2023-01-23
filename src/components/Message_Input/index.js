import React, { useState } from 'react';
import { FieldInput, MessageButton, MessageButtonText, ViewCustom } from './styles';
import { sendMessageSocket } from '../../functions/message_sockets';


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
        <MessageButtonText>Send</MessageButtonText>
      </MessageButton>   
    </ViewCustom>
  );
};


export default MessageInput;