import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchSelector from "react-native-switch-selector";
import DatePicker from 'react-native-date-picker'
import { useTranslation } from "react-i18next";


import Update_Button from "../../components/Update_User";
import { getStorage } from "../../functions/storage"; 




export default function Profile2({ route, navigation }) {
  const { t } = useTranslation();
  const [user, setUser] = useState({"birthday": new Date()});

  useEffect(() => {
   getStorage('user').then(fetchedUser => {
        if (fetchedUser.birthday == undefined){
          fetchedUser.birthday = new Date();
        } else {
          fetchedUser.birthday = new Date(fetchedUser.birthday);
        }
        setUser(fetchedUser);
    });
  }, []);


  let navButton;
  if (user.birthday != undefined && user.birthday != "" && user.gender != undefined && user.gender != "" ){ 
    navButton = (
      <View>
        <Update_Button user={user} prevPage="Profile1" nextPage="Profile3"  navigation={navigation} />
      </View>
    )
  } else {
    navButton = (
      <View> 
        <Text>Remplissez tous les champs</Text>
        <Update_Button user={user} prevPage="Profile1" nextPage=""  navigation={navigation} />
      </View>
    )
  }


  return (
    <View>

      <Text>{t("profile.title")}</Text>
 
      <View>
        <View>
          <Text>{t("profile.birth_date")}</Text>
          <DatePicker
            date={user["birthday"]}
            onDateChange={(date) => {
                let newUser = {...user};
                newUser["birthday"] = date;
                setUser(newUser);
            }}
            mode = "date"
          />
        </View>
      </View>
      <View>
        <View>
          <Text>{t("profile.gender")}</Text>
        </View>
        <View>
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SwitchSelector
              initial={0}
              onPress={value => {
                let newUser = {...user};
                newUser.gender = value;
                setUser(newUser)
              }}
              hasPadding
              options={[
                { label: t("profile.male_gender"), value: "Male" },
                { label: t("profile.female_gender"), value: "Female" },
                { label: t("profile.other_gender"), value: "Other" }
              ]}
              testID="gender-switch-selector"
              accessibilityLabel="gender-switch-selector"
            />
          </View>
        </View>


        {navButton}
      </View>

    </View>
  );
}




