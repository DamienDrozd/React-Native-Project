import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


import Swipe  from "../../components/Swipe";



const userTestTab = [{ firstname: "Damien", birthday: "1990-01-01", interet: ["interet1", "interet2", "interet3"], question: [{ name: "question1", reponse: "response1" }, { name: "question2", reponse: "response2" }, { name: "question3", reponse: "response3" }] },
{ firstname: "Axel", birthday: "1990-01-01", interet: ["interet1", "interet2", "interet3"], question: [{ name: "question1", reponse: "response1" }, { name: "question2", reponse: "response2" }, { name: "question3", reponse: "response3" }] },
{ firstname: "Zack", birthday: "1990-01-01", interet: ["interet1", "interet2", "interet3"], question: [{ name: "question1", reponse: "response1" }, { name: "question2", reponse: "response2" }, { name: "question3", reponse: "response3" }] }]


export default function Match() {

    const [loading, setLoading] = React.useState(true);
    const [userList, setUserList] = useState(userTestTab);
    
    useEffect(() => {
        // console.log("test")
        const requestOptions = {  
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "authorization": getStorage("token") },
            body: JSON.stringify(userList) 
        };
        axios.get('http://localhost:3001/api/match/'+getStorage("userId"),requestOptions)
        .then( res => {
            var data = res.data;
            setUserList(data);  
            console.log(data);
            setLoading(false);
        }) 
    }, []);

    if (loading) {
        return (
        <SafeAreaView>
            <ActivityIndicator />
        </SafeAreaView>
        );
    }


    
    return (
        <View>
            <View>
                <Text>HomePage</Text>
                <Swipe userList={userList} />
            </View>
        </View>
    )
}



const getStorage = (token) => {
  AsyncStorage.getItem(token).then((token) => {
    return token;
  })
}




