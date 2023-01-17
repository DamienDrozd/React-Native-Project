import axios from "axios";
import  { addStorage, getStorage, Logout } from './storage';


export async function GetUser(defaultUser) {
    console.log("\n\n GetUser")
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
        addStorage("user", user)
        return user
    }).catch(error => {
        console.log("error whith api : ", error)
        addStorage("user", defaultUser)  
        return false
    });
}


export async function TestAuth() {
    console.log("\n\n TestAuth")
    let userId = await getStorage('userId')
    let token = await  getStorage('token')
    let auth_bool = false;
    const API_LINK = process.env['API_LINK'] + "/api/auth/protected";
    if (userId == null || token == null || userId == undefined || token == undefined) {
        console.log("User not authenticated");
        await Logout(); 
        return auth_bool;
    }
    let response = await axios.get(API_LINK, {
        headers: { authorization : token },
        body: {userId: userId} 
    })
    if (response == null || response == undefined || response == "") {
        await Logout();
        return auth_bool;
    } else {
        console.log("User authenticated : ", response.data);
        auth_bool = true
        return auth_bool;
    }
}

export const GetMatchList = async () => {
    console.log("\n\n GetMatchList")
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
    console.log("\n\n GetContactList")
    let userId = await getStorage('userId')
    let token = await  getStorage('token')
    const requestOptions = {  
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "authorization": token},
    };
    const API_LINK = process.env['API_LINK'] + "/api/contact/list/" + userId;
    return axios.get(API_LINK,requestOptions).then(res => {
        return (res.data);
    })
}


export const sendSwipe = async (user_target, typeOfLike) => {
    console.log("\n\n sendSwipe")
    console.log("send swipe request : ", user_target.user_id, typeOfLike)
    let userId = await getStorage('userId')
    let token = await  getStorage('token')
    const  body = JSON.stringify({ userId: userId, targetId: user_target.user_id, type: typeOfLike });
    const requestOptions = {
        headers: {"authorization": token }
    };
    const API_LINK = process.env['API_LINK'] + "/api/match/" + userId;
    return axios.post(API_LINK, body, requestOptions).then(res => {
        if (res.status !== 200) {
            const error = (data && data.message) || res.status;
            console.log(error);
            return Promise.reject(error);
        } 
        console.log("request success")
    }).catch(error => {
        console.log("error : ", error)
    });
}

export const updateUser = async (user) => {
    console.log("\n\n updateUser")
    console.log("save user : ", JSON.stringify(user))
    addStorage('user', user);
    let userId = await getStorage('userId')
    let token = await  getStorage('token')
    const body = JSON.stringify(user)
    const requestOptions = {
        headers: { 'Content-Type': 'application/json', "authorization": token},
    };
    const API_LINK = process.env['API_LINK'] + "/api/profile/" + userId;
    return axios.post(API_LINK, body, requestOptions).then(res => {
        if (res.status !== 200) {
            const error = (data && data.message) || res.status;
            console.log(error);
            return Promise.reject(error);
        } 
        console.log("request success")
    }).catch(error => {
        console.log("error : ", error)
    });
}


export const loginRequest = async (email, password, navigation) => {
    console.log("\n\nlogin request")
    const API_LINK = process.env['API_LINK'] + "/api/auth/signin";
    axios.post(API_LINK, {
        email: email, 
        password: password
    }).then(response => {
        addStorage("token", response.data['token'].toString())
        addStorage("userId", response.data['userId'].toString())
        console.log("connecté")
        navigation.navigate("Auth");
    }).catch(error => {
        console.log("api error : ", error);
    }); 
}

export const registerRequest = async (email, password, navigation) => {
    console.log("\n\nregister request")
    const API_LINK = process.env['API_LINK'] + "/api/auth/signup";
    axios.post(API_LINK, {
        email: email, 
        password: password
    }).then(response => {
        addStorage("token", response.data['token'])
        addStorage("userId", response.data['userId'].toString())
        console.log("connecté")
        navigation.navigate("Profile");
    }).catch(error => {
        console.log("api error : ", error);
    }); 
}


export const getInteretList = async () => {
    console.log("\n\n GetInteretList")
    const API_LINK = process.env['API_LINK'] + "/api/interet";
    return axios.get(API_LINK).then(res => {
        return (res.data);
    })
}

export const getQuestionList = async () => {
    console.log("\n\n getQuestionList")
    const API_LINK = process.env['API_LINK'] + "/api/question";
    return axios.get(API_LINK).then(res => {
        let data = res.data;
        for (let i = 0; i < data.length; i++) {
            let newobj = {};
            console.log("old obj : ", data[i])
            newobj.key = data[i].id;
            newobj.label = data[i].name;
            data[i] = newobj;
            console.log("newobj : ", newobj)
      }
        return (data);
    })
}


export const getMessageList = async (target_id) => {
    let userId = await getStorage('userId')
    let token = await  getStorage('token')
    const requestOptions = {  
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "authorization": token, "user_id":userId, "target_id":target_id  },
    };
    const API_LINK = process.env['API_LINK'] + "/api/chat";
    return axios.get(API_LINK,requestOptions).then(res => {
        return (res.data);
    })
}