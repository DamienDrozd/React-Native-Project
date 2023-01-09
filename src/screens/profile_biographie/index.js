import React, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";
import Update_Button from "../../components/Update_User";




 
export default function Biographie({ route, navigation }) {
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
    if (user.biographie != undefined && user.biographie != "" ){ 
        navButton = (
            <View>
                <Update_Button user={user} prevPage="Profile3" nextPage="Profile5"  navigation={navigation} />
            </View>
        ) 
    } else {
        navButton = (
            <View> 
                <Text>{t("profile.fill")}</Text>
                <Update_Button user={user} prevPage="Profile3" nextPage=""  navigation={navigation} />
            </View>
        )
    }

    return (
      <View>        
          <Text>{t("profile.title")}</Text>
          <View>
            <TextInput
              multiline
              numberOfLines={10}
              // style={styles.input}
              onChangeText={(text) => {
                  let newUser = {...user};
                  newUser.biographie = text;
                  setUser(newUser)
              }}
              value={user.biographie}
              placeholder={t("profile.biography")}     
            />
          </View>
          {navButton}
      </View>
    );
  }


