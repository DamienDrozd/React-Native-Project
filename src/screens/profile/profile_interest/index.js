

import React, { useEffect, useState } from "react";
import {View, SafeAreaView, ActivityIndicator} from 'react-native';
import { useTranslation } from "react-i18next";
import Update_Button from "../../../components/Update_User";
import Loading from "../../../components/loading";


import { getStorage } from "../../../functions/storage"; 
import { getInteretList } from "../../../functions/api_request";

import { InterestButton, InterestButtonText, ViewCustom, Title, MainText, InterestButtonSelected, InterestButtonDisabled } from "../styles";


const Interet = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [interetList, setInteretList] = useState([{}]);
  const [user, setUser] = useState({"interet": []});
  const [loading, setLoading] = React.useState(true);
  const [navButton, setNavButton] = useState(null);   
 
    useEffect(() => {
      getStorage('user').then(fetchedUser => {
          if (fetchedUser.interet == undefined) {
              fetchedUser.interet = [];
          }
          setUser(fetchedUser);
      });

      getInteretList().then(data => {
        setInteretList(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user.interet.length == 5 ){ 
      setNavButton(
        <View>
          <Update_Button user={user} prevPage="Profile4" nextPage="Profile6"  navigation={navigation} />
        </View>
      ) 
    } else {
      setNavButton(
        <View> 
          <MainText>{t("profile.fill")}</MainText>
          <Update_Button user={user} prevPage="Profile4" nextPage=""  navigation={navigation} />
        </View>
      )
    }
  }, [user]);

  if (loading) {
    return (
      <Loading />
    );
  }
MainText
  const addInteret = (interet) => {
    if (user.interet.length < 5){
      let newUser = {...user};
      newUser.interet.push(interet);
      setUser(newUser)
      console.log(user)
    } 
  }

  const removeInteret = (interet) => {
    let newUser = {...user};
    newUser.interet = newUser.interet.filter(item => item.id !== interet.id);
    setUser(newUser)
    console.log(newUser.interet)
  }


  

  
    
  return (
    <ViewCustom>
      <Title>{t("profile.interest")}</Title>
      <View>
        {interetList.map(interet => {
          if (user.interet.includes(interet)) {
            return (
              <InterestButtonSelected 
                key={interet.id}
                onPress={() => removeInteret(interet)}
              >
                <InterestButtonText>{interet.name}</InterestButtonText>
              </InterestButtonSelected>
          )
          } else if (user.interet.length < 5) {
            return (
                <InterestButton 
                  key={interet.id}
                  onPress={() => addInteret(interet)}
                >
                  <InterestButtonText>{interet.name}</InterestButtonText>
                </InterestButton>
            )
          } else {
            return (
              <InterestButtonDisabled key={interet.id}
                onPress={() => addInteret(interet)}
                color="#ff5c5c"
                disabled
              >
                <InterestButtonText>{interet.name}</InterestButtonText>
              </InterestButtonDisabled>
            )
          }
        })}
      </View>
      {navButton}
  </ViewCustom>

  );
}


export default Interet;