import React from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";

import {onDisplayNotification} from "../../functions/notification";

import { SettingsView, Button_Settings, Button_Settings_Text, SettingsTitle } from './styles';


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
        <SettingsView>
            <SettingsTitle> 
                {t("settings.title")}
            </SettingsTitle>
            <Button_Settings  onPress={Logout} >
                <Button_Settings_Text>{t("settings.logout")}</Button_Settings_Text>
            </Button_Settings>
            <Button_Settings  onPress={() => navigation.navigate('Profile')} >
                <Button_Settings_Text>{t("settings.profile_edit")}</Button_Settings_Text>
            </Button_Settings>
            <Button_Settings
                onPress={() => i18n.changeLanguage("fr")}
            >
                <Button_Settings_Text>{t("settings.language_fr")}</Button_Settings_Text>
            </Button_Settings>
            <Button_Settings
                onPress={() => i18n.changeLanguage("en")}
            >
                <Button_Settings_Text>{t("settings.language_en")}</Button_Settings_Text>
            </Button_Settings>
            <Button_Settings
                onPress={() => onDisplayNotification("settings", "Voici la notification de test")}
            >
                <Button_Settings_Text>Notification</Button_Settings_Text>
            </Button_Settings>
        </SettingsView >
    );
    }
 

export default Settings; 