
import React, { useState, useEffect, PureComponent } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";

import { updateUser} from "../../functions/api_request"



const Update_Button = (props) => {
    const [user] = useState(props.user);
    const [nextPage] = useState(props.nextPage);
    const [prevPage] = useState(props.prevPage);
    const [navigation] = useState(props.navigation);
    
    
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

const nextAction = (nextPage, navigation, user) => {
    updateUser(user);
    navigation.navigate(nextPage);
}

const prevAction = (prevPage, navigation, user) => {
    updateUser(user);
    navigation.navigate(prevPage);
}

export default Update_Button; 