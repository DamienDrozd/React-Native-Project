import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";
import {HomeSwiperView, TitleView, TitleText} from "./styles"
import Swipe  from "../../components/Swipe";

import { GetMatchList} from "../../functions/api_request"
import Loading from "../../components/loading";



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
            <Loading />
        );
    }


    
    return (
        <View>
            <HomeSwiperView>
                <TitleView>
                    <TitleText>{t("home.title")}</TitleText>
                </TitleView>
                <Swipe userList={userList} />
            </HomeSwiperView>
        </View>
    )
}


export default Match




