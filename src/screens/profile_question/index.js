

import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import ModalSelector from 'react-native-modal-selector'




 
export default function QuestionProfil() {
    let index = 0;
    const [questionList, setquestionList] = useState([{ key: index++, label: "question 1 ?"},{ key: index++, label: "question 2 ?"},{ key: index++, label: "question 3 ?"}]);
    const [responseList, setresponseList] = useState(["reponse 1","reponse 2","reponse 3"]);
    const [selectedQuestion, setSelectedQuestion] = useState(0);
    const final = [];

  //   useEffect(() => {
        

  //     var requestOptions = {  
  //         method: 'GET',
  //         headers: { 'Content-Type': 'application/json', "authorization": getCookie("token") },
  //         body: JSON.stringify(questionList) 
  //     };
      
  //     axios.get('http://localhost:3001/api/question',requestOptions).then(async res => {
  //       var data = await res.data;

  //       for (let  interet of data) {
  //         final.push(<option value={interet.id}>{interet.name}</option>)
  //       }

  //       setquestionList(final)
          
  //     })
  
  //     requestOptions = {  
  //         method: 'GET',
  //         headers: { 'Content-Type': 'application/json', "authorization": getCookie("token") },
  //         body: JSON.stringify(questionList)  
  //     };
  //     axios.get('http://localhost:3001/api/profile/question/'+getCookie("userId"),requestOptions).then(async res => {
  //     var data = await res.data;

  //     console.log(data[0].reponse)  
      
  //     let defaultChecked = {}; 
      
  //     defaultChecked.response1 = data[0].reponse; 
  //     defaultChecked.response2 = data[1].reponse; 
  //     defaultChecked.response3 = data[2].reponse; 

  //     defaultChecked.question1 = data[0].question_id; 
  //     defaultChecked.question2 = data[1].question_id; 
  //     defaultChecked.question3 = data[2].question_id;  
  //     console.log(defaultChecked)
  //     reset({ ...defaultChecked }); 
  //   })
        
  // }, []);

  


    
    return (
      
      <View>
          <Text>Decrivez vous :</Text>

          <View className="form-group">
            <View className="form-group">
              <ModalSelector
                data={questionList}
                initValue="Select something yummy!"
                onChange={(option)=>{ setSelectedQuestion(option.label)}} 
              />
            </View>
            <View className="form-group">
              <TextInput
                value={responseList[0]}
                onChangeText={(text) => setresponseList(0, text)}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              />
              {/* <input {...register("response1")} type="text" className="form-control" placeholder="Votre réponse" /> */}
            </View>
          </View>

          <View className="form-group">
            <View className="form-group">
              <ModalSelector
                data={questionList}
                initValue="Select something yummy!"
                onChange={(option)=>{ setSelectedQuestion(option.label)}} 
              />
            </View>
            <View className="form-group">
              <TextInput
                value={responseList[1]}
                onChangeText={(text) => setresponseList(1, text)}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              />            
            </View>
          </View>

          <View className="form-group">
            <View className="form-group">
              <ModalSelector
                data={questionList}
                initValue="Select something yummy!"
                onChange={(option)=>{ setSelectedQuestion(option.label)}} 
              />
            </View>
            <View className="form-group">
              <TextInput
                value={responseList[2]}
                onChangeText={(text) => setresponseList(2, text)}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              />   
            </View>
          </View>

          
          <Button title="Submit" onPress={() => submit()} >Mettre a jour le profil</Button>
          {/* <button type="submit" className="btn btn-dark btn-lg btn-block" id="submit_button">Mettre a jour le profil</button> */}
        
      </View>
    );
  }

  function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}



function submit(state, user_id) {

  console.log(state)

  var send = {}
  send.question_id = [];
  send.response = [];

  send.user_id = user_id;
  send.question_id.push(state.question1)
  send.question_id.push(state.question2)
  send.question_id.push(state.question3)

  send.response.push(state.response1)
  send.response.push(state.response2)
  send.response.push(state.response3)

  console.log(send)




      //blockage du bruteforce 
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "authorization": getCookie("token")},
      body: JSON.stringify(send)
  };
  fetch('http://localhost:3001/api/profile/question/'+getCookie("userId"), requestOptions)
      .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();
          alert(data.message)
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
  } 
  


