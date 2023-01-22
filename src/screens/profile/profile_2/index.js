import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";


import Update_Button from "../../../components/Update_User";
import { getStorage } from "../../../functions/storage"; 

import { ViewCustom, Title, MainText, SwitchSelectorCustom, DatePickerCustom, InputView, ConditionText } from "../styles";




const Profile2 = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState({"birthday": new Date()});
  const [navButton, setNavButton] = useState(null);

  useEffect(() => {
   getStorage('user').then(fetchedUser => {
        if (fetchedUser.birthday == undefined){
          fetchedUser.birthday = new Date();
          fetchedUser.birthday.setFullYear(fetchedUser.birthday.getFullYear() - 18);
        } else {
          fetchedUser.birthday = new Date(fetchedUser.birthday);
          let age = new Date().getFullYear() - fetchedUser.birthday.getFullYear();
          console.log(age);
          if (age < 18){
            fetchedUser.birthday.setFullYear(fetchedUser.birthday.getFullYear() - 18);
          }
        }
        setUser(fetchedUser);
    });
  }, []);

  useEffect(() => {
    let age = new Date().getFullYear() - user.birthday.getFullYear();
    console.log(age);
    if (user.birthday != undefined && user.birthday != "" && user.gender != undefined && user.gender != "" && age >= 18 && age < 99){ 
      setNavButton(
        <>
          <Update_Button user={user} prevPage="Profile1" nextPage="Profile3"  navigation={navigation} />
        </>
      )
    } else {
      setNavButton(
        <> 
          <ConditionText>Remplissez tous les champs</ConditionText>
          <Update_Button user={user} prevPage="Profile1" nextPage=""  navigation={navigation} />
        </>
      )
    }
  }, [user]);


  return (
    <ViewCustom>

      <Title>{t("profile.title")}</Title>
 
      <InputView>
          <MainText>{t("profile.birth_date")}</MainText>
          <DatePickerCustom
            date={user["birthday"]}
            onDateChange={(date) => {
                let newUser = {...user};
                newUser["birthday"] = date;
                setUser(newUser);
            }}
            mode = "date"
          />
      </InputView>
      <InputView>
          <MainText>{t("profile.gender")}</MainText>

            <SwitchSelectorCustom
              initial={0}
              onPress={value => {
                let newUser = {...user};
                newUser.gender = value;
                setUser(newUser)
              }}
              buttonColor= "#FC912F"
              hasPadding
              options={[
                { label: t("profile.male_gender"), value: "Male" },
                { label: t("profile.female_gender"), value: "Female" },
                { label: t("profile.other_gender"), value: "Other" }
              ]}
            />

      </InputView>
      {navButton}
    </ViewCustom>
  );
}


export default Profile2;

