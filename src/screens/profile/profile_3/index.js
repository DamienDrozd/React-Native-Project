

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
        if (fetchedUser.preferences == undefined){
          fetchedUser.preferences = {};
        }
        if (fetchedUser.preferences?.sexual_orientation == undefined || fetchedUser.preferences?.sexual_orientation == ""){
          fetchedUser.preferences.sexual_orientation = "hetero";
        }
        if (fetchedUser.preferences?.age == undefined){
          fetchedUser.preferences.age = {};
        }
        if(fetchedUser.preferences?.age?.min == undefined || fetchedUser.preferences?.age?.min < 0){
          fetchedUser.preferences.age.min = 20;
        } 
        if (fetchedUser.preferences?.age?.max == undefined || fetchedUser.preferences?.age?.max > 99 || fetchedUser.preferences?.age?.max < fetchedUser.preferences?.age?.min){
          fetchedUser.preferences.age.max = fetchedUser.preferences.age.min + 10;
        }
          setUser(fetchedUser);
      });
  }, []); 

  useEffect(() => {
    if (user.preferences?.age?.min != undefined && user.preferences?.age?.min != 0 && user.preferences?.age?.max != undefined && user.preferences?.age?.max != 0 && user.preferences?.sexual_orientation != undefined && user.preferences?.sexual_orientation != "" ){ 
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
          value={[user.preferences?.age?.min, user.preferences?.age?.max]}
          minimumValue={18}
          maximumValue={99}
          step={1}
          thumbTintColor="#FC912F"
          minimumTrackTintColor="#FC912F"
          onValueChange={value => {
              let newUser = {...user}
              newUser.preferences.age.min = value[0];
              newUser.preferences.age.max = value[1];
              setUser(newUser)
          }}
        />
      </SliderCustom>
      <MainText>{t("profile.min_age")}: {user.preferences?.age?.min}</MainText>
      <MainText>{t("profile.max_age")}: {user.preferences?.age?.max}</MainText>

      </InputView>
      <InputView>
        <MainText>
          {t("profile.sexual_preferences")}
        </MainText>
        <View>
        <SwitchSelectorCustom 
          initial={1}
          buttonColor= "#FC912F"
          onPress={(value) => {
              let newUser = {...user}
              newUser.preferences.sexual_orientation = value;
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