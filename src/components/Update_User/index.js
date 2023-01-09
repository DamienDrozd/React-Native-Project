
import React, { useState, useEffect, PureComponent } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";


const Update_Button = (props) => {
    const [user, setUser] = useState(props.user);
    const [nextPage, setNextPage] = useState(props.nextPage);
    const [prevPage, setPrevPage] = useState(props.prevPage);
    const [navigation, setNavigation] = useState(props.navigation);
    
    
    return (
    <View>
        <PrevButton prevPage={prevPage} navigation={navigation} user={user} />
        <NextButton nextPage={nextPage} navigation={navigation} user={user} />
    </View>);
}

const NextButton = (props) => {
    const { t } = useTranslation();
    let nextPage = props.nextPage;
    let navigation = props.navigation;
    let user = props.user;
    if (nextPage == "" || nextPage == null || nextPage == undefined) {
        return null;
    }
    return(
        <View>
            <Button title={t("profile_navigator.next_button")} onPress={() => nextAction(nextPage, navigation, user)} ></Button>
        </View>
    )
}   

const PrevButton = (props) => {
    const { t } = useTranslation();
    let prevPage = props.prevPage;
    let navigation = props.navigation;
    let user = props.user;
    if (prevPage == "" || prevPage == null || prevPage == undefined) {
        return null;
    }
    return(
        <View>
            <Button title={t("profile_navigator.prev_button")} onPress={() => prevAction(prevPage, navigation, user)} ></Button>
        </View>
    )
}  


const getStorage = (token) => {
  AsyncStorage.getItem(token).then((token) => {
    return token; 
  })
}

const nextAction = (nextPage, navigation, user) => {
    submit(user);
    navigation.navigate(nextPage);
}

const prevAction = (prevPage, navigation, user) => {
    submit(user);
    navigation.navigate(prevPage);
}

const submit = (User) => {
    console.log(User)
    //blockage du bruteforce 
    
    AsyncStorage.setItem('user', JSON.stringify(User)).then(() => {
        AsyncStorage.getItem('userId').then(userId => {
            AsyncStorage.getItem('token').then(token => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', "authorization": token},
                    body: JSON.stringify(User)
                };
                const API_LINK = process.env['API_LINK'] + "/api/profile/";
                fetch(API_LINK+userId, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    alert(data.message)
                    
                }).catch((error) => {
                    console.log("api error : ", error);
                });
            });
        });
    })
    .catch(error => {
        console.error('Storage error!', error);
    });
} 

export default Update_Button;