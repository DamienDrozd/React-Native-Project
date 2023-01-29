
import React, { useState, useEffect, PureComponent } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";

import { updateUser} from "../../functions/api_request"

import { Next_Button, Next_Button_Text, Prev_Button, Prev_Button_Text, NavigatorView } from './styles';


const Update_Button = (props) => {
    const user = (props.user);
    const nextPage = props.nextPage;
    const prevPage = props.prevPage;
    const navigation = props.navigation;
    
    
    return (
    <NavigatorView>
        <PrevButton prevPage={prevPage} navigation={navigation} user={user} />
        <NextButton nextPage={nextPage} navigation={navigation} user={user} />
    </NavigatorView>);
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
        <Next_Button  onPress={() => nextAction(nextPage, navigation, user)}>
            <Next_Button_Text>{t("profile_navigator.next_button")}</Next_Button_Text>
        </Next_Button>
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
        <Prev_Button  onPress={() => prevAction(prevPage, navigation, user)}>
            <Prev_Button_Text>{t("profile_navigator.prev_button")}</Prev_Button_Text>
        </Prev_Button>
    )
}  

const nextAction = (nextPage, navigation, user) => {
    updateUser(user);
    navigation.navigate(nextPage);
}

const prevAction = (prevPage, navigation, user) => {
    updateUser(user);
    navigation.navigate(prevPage);
}

export default Update_Button; 