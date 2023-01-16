import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";
import {HomeSwiperView} from "./styles"
import Swipe  from "../../components/Swipe";

import { GetMatchList} from "../../functions/api_request"



const Match = () => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const [userList, setUserList] = useState([{}]);
    
    useEffect(() => {
        GetMatchList().then(matchList => {
            if (matchList != undefined) {
                setUserList(matchList);
                setLoading(false);
            } else {
                navigation.navigate('Public');
            }
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
            <HomeSwiperView>
                <Text>{t("home.title")}</Text>
                <Swipe userList={userList} />
            </HomeSwiperView>
        </View>
    )
}


export default Match




