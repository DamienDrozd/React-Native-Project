

import React, { useEffect, useState } from "react";
import axios from "axios";
import {View, Text, TextInput, SafeAreaView, ActivityIndicator} from 'react-native';
import ModalSelector from 'react-native-modal-selector'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";
import Update_Button from "../../components/Update_User";




 
export default function QuestionProfil({ route, navigation }) {
  const { t } = useTranslation();
  const [user, setUser] = useState({"question_id": [0,0,0], "response": ["","",""]});
  let index = 0;
  const [questionList, setquestionList] = useState([{ id: index++, name: "question 1 ?"},{ id: index++, name: "question 2 ?"},{ id: index++, name: "question 3 ?"}, {}, {},{}]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    AsyncStorage.getItem('user').then(fetchedUser => {
      fetchedUser = JSON.parse(fetchedUser);
      fetchedUser.birthday = new Date(fetchedUser.birthday);
      if(fetchedUser.question_id == undefined){
        fetchedUser.question_id = [0,0,0];
      } 
      if(fetchedUser.response == undefined){
        fetchedUser.response = ["","",""];
      }
      setUser(fetchedUser);
      console.log("storage user : ", user)
    });


    const API_LINK = process.env['API_LINK'] + "/api/question";
    axios.get(API_LINK).then(async res => {
      let data = res.data;
      for (let i = 0; i < data.length; i++) {
        let newobj = {};
        newobj.key = data[i].id;
        newobj.label = data[i].name;
        data[i] = newobj;
      }
      setquestionList(data)
      setLoading(false); 
    }).catch(error => {
      console.error('There was an error with api!', error);
      setLoading(false); 
    });
        
  }, []);

    if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }


  let navButton;
    if (user.question_id.length == 3 && user.response.length == 3 && user.response[0] != "" && user.response[1] != "" && user.response[2] != "" && user.question_id[0] != 0 && user.question_id[1] != 0 && user.question_id[2] != 0 ){ 
      navButton = (
        <View>
          <Update_Button user={user} prevPage="Profile6" nextPage="Public"  navigation={navigation} />
        </View>
      ) 
    } else {
      navButton = (
        <View> 
          <Text>{t("profile.fill")}</Text>
          <Update_Button user={user} prevPage="Profile6" nextPage=""  navigation={navigation} />
        </View>
      )
    }

  
    return (
      
      <View>
        <Text>{t("profile.question_title")}</Text>
        <View>
          <View>
            <ModalSelector
              data={questionList.splice(1, 1)}
              initValue={questionList[user.question_id[0]].name}
              onChange={(option)=>{
                let newUser = user;
                newUser.question_id[0] = option.key;
                setUser(newUser)
              }}
            />
          </View>
          <View>
            <TextInput
              value={user.response[0]}
              onChangeText={(text) => {
                  let newUser = {...user}
                  newUser.response[0] = text;
                  setUser(newUser);
              }}
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            />
          </View>
        </View>

        <View>
          <View>
            <ModalSelector
              data={questionList}
              initValue={questionList[user.question_id[1]].name}
              onChange={(option)=>{
                  let newUser = user;
                  newUser.question_id[1] = option.key;
                  setUser(newUser)
              }}
            />
          </View>
          <View>
            <TextInput
              value={user.response[1]}
              onChangeText={(text) => {
                  let newUser = {...user}
                  newUser.response[1] = text;
                  setUser(newUser);
              }}
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            />            
          </View>
        </View>

        <View>
          <View>
            <ModalSelector
              data={questionList}
              initValue={questionList[user.question_id[2]].name}
              onChange={(option)=>{
                  let newUser = user;
                  newUser.question_id[2] = option.key;
                  setUser(newUser)
              }}
            />
          </View>
          <View>
            <TextInput
              value={user.response[2]}
              onChangeText={(text) => {
                  let newUser = {...user}
                  newUser.response[2] = text;
                  setUser(newUser);
              }}
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            />   
          </View>
        </View>

        
        {navButton}   
      </View>
    );
  }






