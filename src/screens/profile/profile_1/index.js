import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { FieldInput, ViewCustom, Title, MainText } from "../styles";


import Update_Button from "../../../components/Update_User";

import { getStorage } from "../../../functions/storage"; 



 
const Profile1 = ({ route, navigation }) => {
    const { t } = useTranslation();
    const [user, setUser] = useState({});
    const [navButton, setNavButton] = useState(null);   
 
    useEffect(() => {
        getStorage('user').then(fetchedUser => {
            setUser(fetchedUser);
        });
    }, []);


    useEffect(() => {
        if (user.firstname != undefined && user.firstname != "" && user.lastname != undefined && user.lastname != ""  ){ 
            setNavButton(
                <View>
                    <Update_Button user={user} prevPage="" nextPage="Profile2"  navigation={navigation} />
                </View>
            )
        } else {
            setNavButton(
                <View> 
                    <MainText>{t("profile.fill")}</MainText>
                    <Update_Button user={user} prevPage="" nextPage=""  navigation={navigation} />
                </View>
            )
        }
    }, [user]);


    return (
        <ViewCustom>

            <Title>test</Title>

            <MainText>{t("profile.firstname")}</MainText>
            <FieldInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                value={user.firstname}
                onChangeText={(text) => {
                    let newUser = {...user}
                    newUser.firstname = text; 
                    setUser(newUser) 
                }}
            />
            <MainText>{t("profile.lastname")}</MainText> 
            <FieldInput 
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} 
                value={user.lastname}
                onChangeText={(text) => { 
                    let newUser = {...user}
                    newUser.lastname = text; 
                    setUser(newUser)
                }} 
            />
            {navButton} 
               
        </ViewCustom>  
    );
}

export default Profile1;






   
  