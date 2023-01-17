


import  { getStorage } from './storage';


export const messageSocket = async (target_id, socket, oldMessages, setMessages) => {
    let userId = await getStorage('userId')
    // let token = await  getStorage('token')

    const messageListener = (message) => {
        setMessages((oldMessages) => {
            const newMessages = {...oldMessages};
            if((message.user_id === userId && message.target_id === target_id) || ((message.user_id) === target_id.toString() &&  (message.target_id).toString() === getCookie("userId"))){
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

export const sendMessageSocket = async (target_id, socket, value ) => {
    let userId = await getStorage('userId')
    let token = await  getStorage('token')
    let message = {value : value, user_id : userId, target_id : target_id, token : token}
    console.log("send message with socket : ", message)
    socket.emit('message', message);
}

