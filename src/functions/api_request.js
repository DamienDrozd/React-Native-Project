import axios from "axios";

import Logout, { addStorage, getStorage, Logout } from './storage';


export async function GetUser(defaultUser) {
    let userId = await getStorage('userId')
    let token = await  getStorage('token')
    console.log(userId, token)
    const requestOptions = {  
        headers: { 'Content-Type': 'application/json', "authorization": token  },
    };
    const API_LINK = process.env['API_LINK'] + "/api/profile/"+userId;
    return axios.get(API_LINK ,requestOptions).then(res => {
        let user = res.data;
        if (user.birthday == null) {
            user.birthday = new Date();
        }
        console.log("User authenticated : ", user);
        return addStorage(user, "user")   
    }).catch(error => {
        console.log("error whith api : ", error)
        addStorage(defaultUser, "user")  
        return false
    });
}


export async function TestAuth() {
    let userId = await getStorage('userId')
    let token = await  getStorage('token')
    let auth_bool = false;
    const API_LINK = process.env['API_LINK'] + "/api/auth/protected";
    if (userId == null || token == null || userId == undefined || token == undefined) {
        console.log("User not authenticated");
        showMessage({
            message: "User not authenticated : ",
            type: "info",
        });
        Logout();
        return auth_bool;
    }
    let response = await axios.get(API_LINK, {
        headers: { authorization : token },
        body: {userId: userId} 
    })
    if (response == null || response == undefined || response == "") {
        console.log("User not authenticated : ", response);
        Logout();
        showMessage({
            message: "User not authenticated : ",
            type: "info",
        });
        return auth_bool;
    } else {
        console.log("User authenticated : ", response.data);
        auth_bool = true
        return auth_bool;
    }
}

export const GetMatchList = async () => {
    let userId = await getStorage('userId')
    let token = await  getStorage('token')
    const requestOptions = {  
        headers: { 'Content-Type': 'application/json', "authorization": token },
    };
    const API_LINK = process.env['API_LINK'] + "/api/match/" + userId;
    return axios.get(API_LINK,requestOptions).then(res => {
        return (res.data);
    })
}




export const GetContactList = async () => {
    let userId = await getStorage('userId')
    let token = await  getStorage('token')
    const requestOptions = {  
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "authorization": token},
    };
    const API_LINK = process.env['API_LINK'] + "/api/contact/list/" + userId;
    console.log(API_LINK)
    return axios.get(API_LINK,requestOptions).then(res => {
        return (res.data);
    })
}