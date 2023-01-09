

import React, {  useEffect, useState  } from "react";
import { View, Text, TextInput } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";
import Update_Button from "../../components/Update_User";


 
export default function Recherche({ route, navigation }) {
  const [user, setUser] = useState({});
  const { t } = useTranslation();
  useEffect(() => {
      AsyncStorage.getItem('user').then(fetchedUser => {
          fetchedUser = JSON.parse(fetchedUser);
          fetchedUser.birthday = new Date(fetchedUser.birthday);
          setUser(fetchedUser);
          console.log("storage user : ", user)
      });
  }, []);


  let navButton;
  if (user.age_min != undefined && user.age_min != 0 && user.age_max != undefined && user.age_max != 0 && user.preference_gender != undefined && user.preference_gender != "" ){ 
      navButton = (
          <View>
              <Update_Button user={user} prevPage="Profile2" nextPage="Profile4"  navigation={navigation} />
          </View>
      ) 
  } else {
      navButton = (
          <View> 
              <Text>{t("profile.fill")}</Text>
              <Update_Button user={user} prevPage="Profile2" nextPage=""  navigation={navigation} />
          </View>
      )
  }
  
return (
  <View>
    <View>
      <Text>
        {t("profile.min_age")}
      </Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        value={user.age_min}
        keyboardType="numeric"
        onChangeText={(text) => {
            let newUser = {...user}
            newUser.age_min = text;
            setUser(newUser)
          }}
        />
      </View>
      <View>
        <Text>
          {t("profile.max_age")}
        </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          value={user.age_max}
          keyboardType="numeric"
          onChangeText={(text) => {
              let newUser = {...user}
              newUser.age_max = text;
              setUser(newUser)
          }}
        />
      </View>

      <View>
        <Text>
          {t("profile.sexual_preference")}
        </Text>
        <View>
        <SwitchSelector
          initial={0}
          onPress={(value) => {
              let newUser = {...user}
              newUser.preference_gender = value;
              setUser(newUser)
          }}
          hasPadding
          options={[
            { label: t("profile.male_search"), value: "Male"}, 
            { label: t("profile.female_search"), value: "Female"},
            { label: t("profile.bi_search"), value: "bi"} 
          ]}
          testID="gender-switch-selector"
          accessibilityLabel="gender-switch-selector"
        />
      </View>
    {navButton} 
  </View>
</View>
);
}

