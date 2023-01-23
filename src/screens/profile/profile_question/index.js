

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
  const [user, setUser] = useState({"questions": [{}, {}, {}]});
  let index = 0;
  const [navButton, setNavButton] = useState(null);   
  const [questionList, setquestionList] = useState([{ key: index++, label: "question 1 ?"},{ key: index++, label: "question 2 ?"},{ key: index++, label: "question 3 ?"}, {}, {},{}]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getStorage('user').then(fetchedUser => {
      if(fetchedUser.questions == undefined || fetchedUser.questions.length != 3){
        fetchedUser.questions = [{}, {}, {}];
      } 
      setUser(fetchedUser);
    });

    getQuestionList().then(data => {
      setquestionList(data);
      setLoading(false);
    });
        
  }, []);


  useEffect(() => {
    if (user.questions.length == 3 ){ 
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
              // initValue={questionList[user.questions[0]].questionId}
              onChange={(option)=>{
                let newUser = user;
                newUser.questions[0].questionId = option.key;
                newUser.questions[0].questionName = option.label;
                setUser(newUser)
              }}
            />
          </View>
          <View>
            <FieldInput
              value={user.questions[0]?.response}
              onChangeText={(text) => {
                  let newUser = {...user}
                  newUser.questions[0].response = text;
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
                  newUser.questions[1].questionId = option.key;
                  newUser.questions[1].questionName = option.label;
                  setUser(newUser)
              }}
            />
          </View>
          <View>
            <FieldInput
              value={user.questions[1]?.response}
              onChangeText={(text) => {
                  let newUser = {...user}
                  newUser.questions[1].response = text;
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
                  newUser.questions[2].questionId = option.key;
                  newUser.questions[2].questionName = option.label;
                  setUser(newUser)
              }}
            />
          </View>
          <View>
            <FieldInput
              value={user.questions[2]?.response}
              onChangeText={(text) => {
                  let newUser = {...user}
                  newUser.questions[2].response = text;
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



