import React, { useState } from 'react';
import { FieldInput, MessageButton, MessageButtonText, ViewCustom } from './styles';
import { sendMessageSocket } from '../../functions/message_sockets';


const MessageInput = ({target_id,socket}) => {
  const [value, setValue] = useState('');


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

const submitMessage = () => {
  sendMessageSocket(target_id, socket, value);
  setValue('');
}; 

export default MessageInput;