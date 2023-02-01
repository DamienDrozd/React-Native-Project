import axios from "axios";
import  { addStorage, getStorage, Logout } from './storage';


export const GetUser = async (defaultUser) => {
    console.log("\n\n GetUser")
    let token = await  getStorage('token')
    const requestOptions = {  
        headers: { 'Content-Type': 'application/json', "authorization": token  },
    };
    const API_LINK = process.env['API_LINK'] + "/api/user/";
    return axios.get(API_LINK ,requestOptions).then(res => {
        let user = res.data;
        console.log("User fetched : ", user);
        if (user.birthday == null) {
            user.birthday = new Date();
            user.birthday.setFullYear(user.birthday.getFullYear() - 18);
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

export const updateUser = async (user) => {
    console.log("\n\n updateUser")
    addStorage('user', user);
    console.log("user saved : ", user)
    let token = await  getStorage('token')
    const body = JSON.stringify(user)
    console.log("body : ", body)
    const requestOptions = {
        headers: { 'Content-Type': 'application/json', "authorization": token},
    };
    const API_LINK = process.env['API_LINK'] + "/api/user/";
    return axios.put(API_LINK, body, requestOptions).then(res => {
        if (res.status !== 200) {
            const error = (data && data.message) || res.status;
            console.log(error);
            return Promise.reject(error);
        } 
    }).catch(error => {
        console.log("error : ", error)
    });
}


export  const  TestAuth = async () => {
    console.log("\n\n TestAuth")
    let userId = await getStorage('userId')
    let token = await  getStorage('token')
    let auth_bool = false;
    const API_LINK = process.env['API_LINK'] + "/api/auth/protected";
    console.log("get env : ", API_LINK)
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
    const API_LINK = process.env['API_LINK'] + "/api/match/swipeProfil" ;
    return axios.get(API_LINK,requestOptions).then(res => {
        console.log("match list : ", res.data)
        return (res.data);
    }).catch(error => {
        console.log("error : ", error)
    });
}




export const GetContactList = async () => {
    console.log("\n\n GetContactList")
    let token = await  getStorage('token')
    const requestOptions = {  
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "authorization": token},
    };
    const API_LINK = process.env['API_LINK'] + "/api/conversation/";
    return axios.get(API_LINK,requestOptions).then(res => {
        return (res.data);
    }).catch(error => {
        console.log("error : ", error)
    });
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
    const API_LINK = process.env['API_LINK'] + "/api/match/like/ " + userId;
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
    const API_LINK = process.env['API_LINK'] + "/api/auth/login";
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
    const API_LINK = process.env['API_LINK'] + "/api/auth/register";
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


export const getInterestList = async () => {
    console.log("\n\n GetInterestList")
    const API_LINK = process.env['API_LINK'] + "/api/interest";
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
            newobj.key = data[i]._id;
            newobj.label = data[i].question;
            data[i] = newobj;
            console.log("newobj : ", newobj)
      }
        return (data);
    })
}


export const getMessageList = async (conversationId) => {
    console.log("\n\n getMessageList")
    let token = await  getStorage('token')
    const requestOptions = {  
        headers: { 'Content-Type': 'application/json', "authorization": token, "conversation_id": conversationId},
    };
    const API_LINK = process.env['API_LINK'] + "/api/conversation/message/";
    return axios.get(API_LINK,  requestOptions ).then(res => {
        return (res.data);
    })
}