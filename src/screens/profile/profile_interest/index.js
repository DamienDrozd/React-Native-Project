

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Update_Button from "../../../components/Update_User";
import Loading from "../../../components/loading";



import { getStorage } from "../../../functions/storage"; 
import { getInterestList } from "../../../functions/api_request";

import { InterestButton, InterestButtonText, ViewCustom, Title, InterestButtonSelected, InterestButtonDisabled, InterestView, ConditionText } from "../styles";


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
          for (let i = 0; i < fetchedUser.interests.length; i++) {
            if(typeof fetchedUser.interests[i] == "string"){
              fetchedUser.interests[i] = fetchedUser.interests[i];
            }
          }
          setUser(fetchedUser);
      });

      getInterestList().then(data => {
        for (let i = 0; i < data.length; i++) {
          if(typeof data[i] == "string"){
            data[i] = JSON.parse(data[i]);
          }
        }
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


  const addInterest = (interest) => {
    if (user.interests?.length < 5){
      console.log("interest = ",interest)
      let newUser = {...user};
      newUser.interests.push(interest);
      setUser(newUser)
    } 
  }

  const removeInterest = (interest) => {
    let newUser = {...user};
    if (typeof interest == "string") {
      interest = JSON.parse(interest);
    }
    console.log("interest = ",interest._id)
    newUser.interests = newUser.interests?.filter(item => item._id !== interest._id);
    setUser( newUser)
  }
  

  if (loading) {
    return (
      <Loading />
    );
  }
    
  return (
    <ViewCustom>
      <Title>{t("profile.interest")}</Title>
      <InterestView>
        {InterestList.map(interest => {
          if (containsObject(interest, user.interests)) {
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
        }
      )}
      </InterestView>
      {navButton}
    </ViewCustom> 
  );
}

const containsObject = (obj, list) => {
    var i;
    if (list == undefined) {
      return false;
    }
    for (i = 0; i < list.length; i++) {
        // console.log(list[i]._id, obj._id)
        if (list[i]._id === obj._id) {
            return true;
        }
    }

    return false;
}



export default ProfileInterest;