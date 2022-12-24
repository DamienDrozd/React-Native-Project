

import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import ModalSelector from 'react-native-modal-selector'
import AsyncStorage from '@react-native-async-storage/async-storage';





 
export default function QuestionProfil() {
    let index = 0;
    const [userList, setUserList] = useState({});
    const [questionList, setquestionList] = useState([{ key: index++, label: "question 1 ?"},{ key: index++, label: "question 2 ?"},{ key: index++, label: "question 3 ?"}]);
    const [responseList, setresponseList] = useState(["reponse 1","reponse 2","reponse 3"]);
    const [selectedQuestion, setSelectedQuestion] = useState([1,2,0]);

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
  
      requestOptions = {  
          method: 'GET',
          headers: { 'Content-Type': 'application/json', "authorization": getStorage("token") },
          body: JSON.stringify(questionList)  
      };
      axios.get('http://localhost:3001/api/profile/question/'+getStorage("userId"),requestOptions).then(async res => {
        var data = await res.data;      
        
        // setresponseList() = data[0].reponse; 
        // setresponseList() = data[1].reponse; 
        // ssetresponseList() = data[2].reponse; 

        // questionList() = data[0].question_id; 
        // questionList() = data[1].question_id; 
        // questionList() = data[2].question_id;  
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
                initValue={questionList[selectedQuestion[0]].label}
                onChange={(option)=>{ setSelectedQuestion(option.label)}} 
              />
            </View>
            <View>
              <TextInput
                value={responseList[0]}
                onChangeText={(text) => setresponseList(0, text)}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              />
            </View>
          </View>

          <View>
            <View>
              <ModalSelector
                data={questionList}
                initValue={questionList[selectedQuestion[1]].label}
                onChange={(option)=>{ setSelectedQuestion(option.label)}} 
              />
            </View>
            <View>
              <TextInput
                value={responseList[1]}
                onChangeText={(text) => setresponseList(1, text)}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              />            
            </View>
          </View>

          <View>
            <View>
              <ModalSelector
                data={questionList}
                initValue={questionList[selectedQuestion[2]].label}
                onChange={(option)=>{ setSelectedQuestion(option.label)}} 
              />
            </View>
            <View>
              <TextInput
                value={responseList[2]}
                onChangeText={(text) => setresponseList(2, text)}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              />   
            </View>
          </View>

          
          <Button title="Mettre a jour le profil" onPress={() => submit()} ></Button>              
      </View>
    );
  }

const getStorage = (token) => {
  AsyncStorage.getItem(token).then((token) => {
    return token;
  })
}

function submit() {

  var send = {}
  send.question_id = [];
  send.response = [];

  send.user_id = user_id;
  send.question_id.push(selectedQuestion[0])
  send.question_id.push(selectedQuestion[1])
  send.question_id.push(selectedQuestion[2])

  send.response.push(responseList[0])
  send.response.push(responseList[1])
  send.response.push(responseList[2])

  console.log(send)
      //blockage du bruteforce 
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "authorization": getStorage("token")},
      body: JSON.stringify(send)
  };
  fetch('http://localhost:3001/api/profile/question/'+getStorage("userId"), requestOptions)
      .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();
          alert(data.message)
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
  } 
  


