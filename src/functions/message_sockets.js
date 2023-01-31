
import {onDisplayNotification} from "../functions/notification";
import  { getStorage } from './storage';


export const messageSocket = async (conversation_id, socket, messages, setMessages) => {
    // let userId = await getStorage('userId')
    // let token = await  getStorage('token')
    console.log("message socket : ", conversation_id, socket, messages, setMessages)

    const messageListener = (message) => {
        console.log("message listener : ", message)
        console.log("old messages : ", messages)
        getStorage('userId').then((userId) => {
            if (message.sender._id !== userId) {
                onDisplayNotification(message.sender.firstName, message.content.content)
            }
        })
        
        const newMessages = messages;
        if((message.conversation_id === conversation_id)){
            console.log("new messages : ", newMessages)
            if (newMessages != undefined && newMessages != {}){
                newMessages.push(message.content);
                console.log("add message : ", message.content)
            }
        }
        if (newMessages !== messages) {
            setMessages(newMessages);
        } 
    };
    
    socket.on('message', messageListener);


    return () => {
        socket.off('message', messageListener);
    };

} 


export const sendMessageSocket = async (conversation_id, socket, value ) => {
    let userId = await getStorage('userId')
    let token = await  getStorage('token')
    let message = {value : value, user_id : userId, conversation_id : conversation_id, token : token}
    console.log("send message with socket : ", message)
    socket.emit('message', message);
}

