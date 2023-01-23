


import  { getStorage } from './storage';


export const messageSocket = async (conversation_id, socket, oldMessages, setMessages) => {
    let userId = await getStorage('userId')
    // let token = await  getStorage('token')

    const messageListener = (message) => {
        console.log("message received : ", message)
        console.log("conversation : ", message.conversation_id)
        setMessages((oldMessages) => {
            const newMessages = {...oldMessages};
            if((message.conversation_id === conversation_id)){
                console.log("new message : ", message)
                newMessages[message.id] = message;
            }
            return newMessages;
        });
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

