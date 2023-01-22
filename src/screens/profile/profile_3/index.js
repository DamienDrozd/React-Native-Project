

import React, {  useEffect, useState  } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import Update_Button from "../../../components/Update_User";

import { getStorage } from "../../../functions/storage"; 

import {Slider} from '@miblanchard/react-native-slider';


import { ViewCustom, Title, MainText, SwitchSelectorCustom, SliderCustom, InputView, ConditionText } from "../styles";


 
const Recherche = ({ route, navigation }) => {
  const [user, setUser] = useState({});
  const { t } = useTranslation();
  const [navButton, setNavButton] = useState(null);

  useEffect(() => {
      getStorage('user').then(fetchedUser => {
        if (fetchedUser.preference_gender == undefined || fetchedUser.preference_gender == ""){
          fetchedUser.preference_gender = "hetero";
        }
        if(fetchedUser.age_min == undefined || fetchedUser.age_min < 0){
          fetchedUser.age_min = 20;
        } 
        if (fetchedUser.age_max == undefined || fetchedUser.age_max > 99 || fetchedUser.age_max < fetchedUser.age_min){
          fetchedUser.age_max = fetchedUser.age_min + 10;
        }
          setUser(fetchedUser);
      });
  }, []); 

  useEffect(() => {
    if (user.age_min != undefined && user.age_min != 0 && user.age_max != undefined && user.age_max != 0 && user.preference_gender != undefined && user.preference_gender != "" ){ 
        setNavButton(
            <>
                <Update_Button user={user} prevPage="Profile2" nextPage="Profile4"  navigation={navigation} />
            </>
        ) 
    } else {
        setNavButton(
            <> 
                <ConditionText>{t("profile.fill")}</ConditionText>
                <Update_Button user={user} prevPage="Profile2" nextPage=""  navigation={navigation} />
            </>
        )
    }
  }, [user]);
  
return (
  <ViewCustom>
    
    <Title>
      {t("profile.age")}
    </Title>
    <InputView>
      <SliderCustom>
        <Slider
          value={[user.age_min, user.age_max]}
          minimumValue={18}
          maximumValue={99}
          step={1}
          thumbTintColor="#FC912F"
          minimumTrackTintColor="#FC912F"
          onValueChange={value => {
              let newUser = {...user}
              newUser.age_min = value[0];
              newUser.age_max = value[1];
              setUser(newUser)
          }}
        />
      </SliderCustom>
      <MainText>{t("profile.min_age")}: {user.age_min}</MainText>
      <MainText>{t("profile.max_age")}: {user.age_max}</MainText>

      </InputView>
      <InputView>
        <MainText>
          {t("profile.sexual_preference")}
        </MainText>
        <View>
        <SwitchSelectorCustom 
          initial={1}
          buttonColor= "#FC912F"
          onPress={(value) => {
              let newUser = {...user}
              newUser.preference_gender = value;
              setUser(newUser)
          }}
          hasPadding
          options={[
            { label: t("profile.homo_search"), value: "homo"},
            { label: t("profile.hetero_search"), value: "hetero"}, 
            { label: t("profile.bi_search"), value: "bi"} 
          ]}
        />
      </View>
    </InputView>
    {navButton} 
</ViewCustom>
);
}

export default Recherche;