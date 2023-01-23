

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Update_Button from "../../../components/Update_User";
import Loading from "../../../components/loading";


import { getStorage } from "../../../functions/storage"; 
import { getInterestList } from "../../../functions/api_request";

import { InterestButton, InterestButtonText, ViewCustom, Title, MainText, InterestButtonSelected, InterestButtonDisabled, InterestView, ConditionText } from "../styles";


const ProfileInterest = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [InterestList, setInterestList] = useState([{}]);
  const [user, setUser] = useState({"interests": []});
  const [loading, setLoading] = React.useState(true);
  const [navButton, setNavButton] = useState(null);   
 
    useEffect(() => {
      getStorage('user').then(fetchedUser => {
          if (fetchedUser.interests == undefined) {
              fetchedUser.interests = [];
          }
          setUser(fetchedUser);
      });

      getInterestList().then(data => {
        setInterestList(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user.interests?.length == 5 ){ 
      setNavButton(
        <>
          <Update_Button user={user} prevPage="Profile4" nextPage="Profile6"  navigation={navigation} />
        </>
      ) 
    } else {
      setNavButton(
        <> 
          <ConditionText>{t("profile.fill")}</ConditionText>
          <Update_Button user={user} prevPage="Profile4" nextPage=""  navigation={navigation} />
        </>
      )
    }
  }, [user]);

  if (loading) {
    return (
      <Loading />
    );
  }
// MainText
  const addInterest = (interest) => {
    if (user.interests?.length < 5){
      let newUser = {...user};
      newUser.interests.push(interest);
      setUser(newUser)
      console.log(user)
    } 
  }

  const removeInterest = (interest) => {
    let newUser = {...user};
    newUser.interests = newUser.interests?.filter(item => item.id !== interest.id);
    setUser(newUser)
    console.log(newUser.interests)
  }


  

  
    
  return (
    <ViewCustom>
      <Title>{t("profile.interest")}</Title>
      <InterestView>
        {InterestList.map(interest => {
          if (user.interests?.includes(interest)) {
            return (
              <InterestButtonSelected 
                key={interest._id}
                onPress={() => removeInterest(interest)}
              >
                <InterestButtonText>{interest.name}</InterestButtonText>
              </InterestButtonSelected>
          )
          } else if (user.interests?.length < 5) {
            return (
                <InterestButton 
                  key={interest._id}
                  onPress={() => addInterest(interest)}
                >
                  <InterestButtonText>{interest.name}</InterestButtonText>
                </InterestButton>
            )
          } else {
            return (
              <InterestButtonDisabled key={interest._id}
                onPress={() => addInterest(interest)}
                color="#ff5c5c"
                disabled
              >
                <InterestButtonText>{interest.name}</InterestButtonText>
              </InterestButtonDisabled>
            )
          }
        })}
      </InterestView>
      
      {navButton}
    </ViewCustom> 
  );
}


export default ProfileInterest;