

import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import ModalSelector from 'react-native-modal-selector'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Update_Button from "../../components/Update_User";




 
export default function QuestionProfil({ route, navigation }) {
    const [user, setUser] = useState(route.params.user)
    let index = 0;
    const [questionList, setquestionList] = useState([{ key: index++, label: "question 1 ?"},{ key: index++, label: "question 2 ?"},{ key: index++, label: "question 3 ?"}]);

    useEffect(() => {
      var requestOptions = {  
          method: 'GET',
          headers: { 'Content-Type': 'application/json', "authorization": getStorage("token") },
          body: JSON.stringify(questionList) 
      };
      
      axios.get('http://localhost:3001/api/question',requestOptions).then(async res => {
        var data = await res.data;
        setquestionList(final)
      }).catch(error => {
          console.error('There was an error with api!', error);
      });
        
  }, []);
  
    return (
      
      <View>
          <Text>Decrivez vous :</Text>

          <View>
            <View>
              <ModalSelector
                data={questionList}
                initValue={questionList[user.question_id[0]].label}
                onChange={(option)=>{
                    var newUser = user;
                    newUser.question_id[0] = option.label;
                    setUser(newUser)
                }}
              />
            </View>
            <View>
              <TextInput
                value={user.response[0]}
                onChangeText={(text) => {
                    var newUser = user;
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
                initValue={questionList[user.question_id[1]].label}
                onChange={(option)=>{
                    var newUser = user;
                    newUser.question_id[1] = option.label;
                    setUser(newUser)
                }}
              />
            </View>
            <View>
              <TextInput
                value={user.response[1]}
                onChangeText={(text) => {
                    var newUser = user;
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
                initValue={questionList[user.question_id[2]].label}
                onChange={(option)=>{
                    var newUser = user;
                    newUser.question_id[2] = option.label;
                    setUser(newUser)
                }}
              />
            </View>
            <View>
              <TextInput
                value={user.response[2]}
                onChangeText={(text) => {
                    var newUser = user;
                    newUser.response[2] = text;
                    setUser(newUser);
                }}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              />   
            </View>
          </View>

          
          <Update_Button user={user}/>     
      </View>
    );
  }

const getStorage = (token) => {
  AsyncStorage.getItem(token).then((token) => {
    return token;
  })
}




