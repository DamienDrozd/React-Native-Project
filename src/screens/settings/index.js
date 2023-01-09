import React from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";

import "../../config/translationInit";


const Settings = ({ navigation }) => { 
    const { t, i18n } = useTranslation();

    const Logout = () => {
        AsyncStorage.getAllKeys().then((keys) => {
            AsyncStorage.multiRemove(keys).then(() => {
                console.log("Logout success");
                navigation.navigate("Public");
            }).catch((error) => {
                console.log("storage error : ", error);
            });
        }).catch((error) => {
            console.log("storage error : ", error);
        });
    }
    

    return (
        <View>
            <Text> 
                {t("settings.title")}
            </Text>
            <Button title={t("settings.logout")} onPress={Logout} />
            <Button title={t("settings.profile_edit")} onPress={() => navigation.navigate('Profile')} />
            <Button
                title={t("settings.language_fr")}
                onPress={() => i18n.changeLanguage("fr")}
            />
            <Button
                title={t("settings.language_en")}
                onPress={() => i18n.changeLanguage("en")}
            />
        </View >
    );
    }
 

export default Settings; 