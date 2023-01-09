import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";



import Update_Button from "../../components/Update_User";



 
export default function Profile1({ route, navigation }) {
    const { t } = useTranslation();
    const [user, setUser] = useState({});
 
    useEffect(() => {
        AsyncStorage.getItem('user').then(fetchedUser => {
            fetchedUser = JSON.parse(fetchedUser);
            fetchedUser.birthday = new Date(fetchedUser.birthday);
            setUser(fetchedUser);
            console.log("storage user : ", user)
        });
    }, []);



    let navButton;
    if (user.firstname != undefined && user.firstname != "" && user.lastname != undefined && user.lastname != "" ){ 
        navButton = (
            <View>
                <Update_Button user={user} prevPage="" nextPage="Profile2"  navigation={navigation} />
            </View>
        )
    } else {
        navButton = (
            <View> 
                <Text>{t("profile.fill")}</Text>
                <Update_Button user={user} prevPage="" nextPage=""  navigation={navigation} />
            </View>
        )
    }


    return (
        <View>

            <Text>{t("profile.title")}</Text>

            <View>
                <Text>{t("profile.firstname")}</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    value={user.firstname}
                    onChangeText={(text) => {
                        let newUser = {...user}
                        newUser.firstname = text; 
                        setUser(newUser)
                    }}
                />
            </View>
             <View>
                <Text>{t("profile.lastname")}</Text> 
                <TextInput 
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} 
                    value={user.lastname}
                    onChangeText={(text) => { 
                        let newUser = {...user}
                        newUser.lastname = text; 
                        setUser(newUser)
                    }} 
                />
            </View>
            {navButton} 
               
        </View>  
    );
}








   
  