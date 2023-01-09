

import React, { useEffect, useState } from "react";
import axios from "axios";
import {View, Text, Button, SafeAreaView, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";
import Update_Button from "../../components/Update_User";




 
export default function Interet({ route, navigation }) {
  const { t } = useTranslation();
  const [interetList, setInteretList] = useState([{}]);
  const [user, setUser] = useState({"interet": []});
  const [loading, setLoading] = React.useState(true);
 
    useEffect(() => {
        AsyncStorage.getItem('user').then(fetchedUser => {
            fetchedUser = JSON.parse(fetchedUser);
            fetchedUser.birthday = new Date(fetchedUser.birthday);
            if (fetchedUser.interet == undefined) {
                fetchedUser.interet = [];
            }
            setUser(fetchedUser);
            console.log("storage user : ", user)
        });


      const API_LINK = process.env['API_LINK'] + "/api/interet";
      axios.get(API_LINK).then(async res => {
        let data = await res.data;
        console.log("data : ", data)
        setInteretList(data)
        setLoading(false);        
      }).catch(error => {
          setLoading(false);    
          console.error('There was an error with api!', error);
      });
  }, []);

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

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


  let navButton;
    if (user.interet.length == 5 ){ 
      navButton = (
        <View>
          <Update_Button user={user} prevPage="Profile4" nextPage="Profile6"  navigation={navigation} />
        </View>
      ) 
    } else {
      navButton = (
        <View> 
          <Text>{t("profile.fill")}</Text>
          <Update_Button user={user} prevPage="Profile4" nextPage=""  navigation={navigation} />
        </View>
      )
    }

  
    
  return (
    <View>
      <Text>{t("profile.interest")}</Text>
      <View>
        {interetList.map(interet => {
          if (user.interet.includes(interet)) {
            return (
              <View key={interet.id}>
                <Button
                  title={interet.name}
                  color="#ff5c5c"
                  onPress={() => removeInteret(interet)}
                />
              </View>
          )
          } else if (user.interet.length < 5) {
            return (
                <View key={interet.id}>
                  <Button
                    title={interet.name}
                    onPress={() => addInteret(interet)}
                  />
                </View>
            )
          } else {
            return (
              <View key={interet.id}>
                <Button
                  title={interet.name}
                  onPress={() => addInteret(interet)}
                  disabled
                />
              </View>
            )
          }
        })}
      </View>
      {navButton}
  </View>

  );
}
