import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


import Swipe  from "../../components/Swipe";



const userTestTab = []


export default function Match() {

    const [loading, setLoading] = React.useState(true);
    const [userList, setUserList] = useState(userTestTab);
    
    useEffect(() => {
        // console.log("test")
        AsyncStorage.getItem('userId').then(userId => {
            AsyncStorage.getItem('token').then(token => {

                const requestOptions = {  
                    headers: { 'Content-Type': 'application/json', "authorization": token },
                };
                const API_LINK = process.env['API_LINK'] + "/api/match/" + userId;
                axios.get(API_LINK,requestOptions)
                .then( res => {
                    setUserList(res.data);  
                    console.log(res.data[0]); 
                    setLoading(false); 
                }).catch( err => {
                    console.log(err);
                    setLoading(false);
                })
            })
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




