

import React, { useEffect, useState } from "react";
import {View, Text, SafeAreaView, ActivityIndicator} from 'react-native';
import { useTranslation } from "react-i18next";
import Update_Button from "../../../components/Update_User";


import { getStorage } from "../../../functions/storage"; 
import { getQuestionList } from "../../../functions/api_request";

import {  ViewCustom, Title, ModalSelectorCustom, FieldInput, InputView, ConditionText } from "../styles";

import Loading from "../../../components/loading";


 
const QuestionProfil = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState({"question_id": [0,0,0], "response": ["","",""]});
  let index = 0;
  const [navButton, setNavButton] = useState(null);   
  const [questionList, setquestionList] = useState([{ key: index++, label: "question 1 ?"},{ key: index++, label: "question 2 ?"},{ key: index++, label: "question 3 ?"}, {}, {},{}]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getStorage('user').then(fetchedUser => {
      fetchedUser.birthday = new Date(fetchedUser.birthday);
      console.log("question_id : ", fetchedUser.question_id)
      console.log("response : ", fetchedUser.response)
      if(fetchedUser.question_id == undefined || fetchedUser.question_id.length != 3){
        fetchedUser.question_id = [];
      } 
      if(fetchedUser.response == undefined || fetchedUser.response.length != 3){
        fetchedUser.response = ["","",""];
      }
      setUser(fetchedUser);
    });

    getQuestionList().then(data => {
      setquestionList(data);
      setLoading(false);
    });
        
  }, []);


  useEffect(() => {
    if (user.question_id.length == 3 && user.response.length == 3 && user.response[0] != "" && user.response[1] != "" && user.response[2] != ""  ){ 
      setNavButton(
        <>
          <Update_Button user={user} prevPage="Profile6" nextPage="Auth"  navigation={navigation} />
        </>
      ) 
    } else {
      setNavButton(
        <> 
          <ConditionText>{t("profile.fill")}</ConditionText>
          <Update_Button user={user} prevPage="Profile6" nextPage=""  navigation={navigation} />
        </>
      )
    }
  }, [user]);

    if (loading) {
    return (
      <Loading />
    );
  }


  

  
    return (
      
      <ViewCustom>
        <Title>{t("profile.question_title")}</Title>
        <InputView>
          <View>
            <ModalSelectorCustom
              data={questionList}
              // initValue={questionList[user.question_id[0]].label}
              onChange={(option)=>{
                let newUser = user;
                newUser.question_id[0] = option.key;
                setUser(newUser)
              }}
            />
          </View>
          <View>
            <FieldInput
              value={user.response[0]}
              onChangeText={(text) => {
                  let newUser = {...user}
                  newUser.response[0] = text;
                  setUser(newUser);
              }}
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            />
          </View>
        </InputView>

        <InputView>
          <View>
            <ModalSelectorCustom
              data={questionList}
              // initValue={questionList[user.question_id[1]].label}
              onChange={(option)=>{
                  let newUser = user;
                  newUser.question_id[1] = option.key;
                  setUser(newUser)
              }}
            />
          </View>
          <View>
            <FieldInput
              value={user.response[1]}
              onChangeText={(text) => {
                  let newUser = {...user}
                  newUser.response[1] = text;
                  setUser(newUser);
              }} 
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            />            
          </View>
        </InputView>

        <InputView>
          <View>
            <ModalSelectorCustom
              data={questionList}
              // initValue={questionList[user.question_id[2]].label}
              onChange={(option)=>{
                  let newUser = user;
                  newUser.question_id[2] = option.key;
                  setUser(newUser)
              }}
            />
          </View>
          <View>
            <FieldInput
              value={user.response[2]}
              onChangeText={(text) => {
                  let newUser = {...user}
                  newUser.response[2] = text;
                  setUser(newUser);
              }}
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            />   
          </View>
        </InputView>
        
        {navButton}
         
      </ViewCustom>
    );
  }


export default QuestionProfil;



