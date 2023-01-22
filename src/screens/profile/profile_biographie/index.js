import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import Update_Button from "../../../components/Update_User";


import { getStorage } from "../../../functions/storage"; 

import { BioInput, ViewCustom, Title, MainText, ConditionText } from "../styles";



 
const Biographie = ({ route, navigation }) => {
    const { t } = useTranslation();
    const [user, setUser] = useState({});
        const [navButton, setNavButton] = useState(null);   

 
    useEffect(() => {
        getStorage('user').then(fetchedUser => {
            if (fetchedUser.biographie == undefined) {
                fetchedUser.biographie = "";     
            }
            setUser(fetchedUser);
        });
    }, []);


    useEffect(() => {
        if (user.biographie != undefined && user.biographie != "" && user.biographie.length < 200 && user.biographie.length > 20 ) { 
            setNavButton(
                <>
                    <Update_Button user={user} prevPage="Profile3" nextPage="Profile5"  navigation={navigation} />
                </>
            ) 
        } else {
            if (user.biographie != undefined) {
                if (user.biographie.length < 20) {
                    setNavButton(
                        <> 
                            <ConditionText>{t("profile.fill_min_bio")}</ConditionText>
                            <ConditionText>{t("profile.fill")}</ConditionText>
                            <Update_Button user={user} prevPage="Profile3" nextPage=""  navigation={navigation} />
                        </>
                    )
                } else if (user.biographie.length > 200) {
                    setNavButton(
                        <> 
                            <ConditionText>{t("profile.fill_max_bio")}</ConditionText>
                            <ConditionText>{t("profile.fill")}</ConditionText>
                            <Update_Button user={user} prevPage="Profile3" nextPage=""  navigation={navigation} />
                        </>
                    )
                }
            } else {
                setNavButton(
                    <> 
                        <ConditionText>{t("profile.fill")}</ConditionText>
                        <Update_Button user={user} prevPage="Profile3" nextPage=""  navigation={navigation} />
                    </>
                )
            }
        }
    }, [user]);

    return (
      <ViewCustom>        
          <Title>{t("profile.title")}</Title>
          <View>
            <BioInput
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
      </ViewCustom>
    );
  }


export default Biographie;