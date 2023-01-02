import React, { useState } from 'react';
import { View, Text, Button } from "react-native";


const MessageInput = ({target_id,socket}) => {
  const [value, setValue] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    var user_id = getCookie("userId");
    var token = getCookie("token");
    var message = {value : value, user_id : user_id, target_id : target_id, token : token}
    socket.emit('message', message);
    setValue('');
  }; 
  

  return (
    <form onSubmit={submitForm}>
      <input className="newMessage"
        autoFocus
        value={value}
        placeholder="Type your message"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
    </form>
  );
};

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default MessageInput;