

import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import { SelectMultipleGroupButton } from 'react-native-selectmultiple-button'





 
export default function Interet() {

    const [interetList, setInteretList] = useState(["Interet1", "Interet2", "Interet3"]);
    const [selectedInteret, setSelectedInteret] = useState([]);

  //   useEffect(() => {
        

  //     var requestOptions = {  
  //         method: 'GET',
  //         headers: { 'Content-Type': 'application/json', "authorization": getCookie("token") },
  //         body: JSON.stringify(interetList) 
  //     };
      
  //     axios.get('http://localhost:3001/api/interet',requestOptions).then(async res => {
  //       var data = await res.data;
        

  //       for (let  interet of data) {
  //         final.push(<View>
  //                     <input class="form-check-input" type="checkbox" value={interet.id} id={interet.id} {...register('interet')}/>
  //                     <label class="form-check-label" for="{interet.id}">{interet.name}</label>
  //                   </View>);
  //       }

  //       setInteretList(final)
  //       // console.log(interetList)
          
  //     })
  
  //     requestOptions = {  
  //         method: 'GET',
  //         headers: { 'Content-Type': 'application/json', "authorization": getCookie("token") },
  //         body: JSON.stringify(interetList)  
  //     };
  //     axios.get('http://localhost:3001/api/profile/interet/'+getCookie("userId"),requestOptions).then(async res => {
  //     var data = await res.data;
  //     console.log(data);
  //     for(var i of data){
  //       if (i.interet_id != null){
  //         console.log(i.interet_id);
  //         document.getElementById(i.interet_id).checked  = true;
  //       }
  //     }
  //   })
  // }, []);

  
  // const addInteret = (interet) => {
  //   console.log("test")
  //   setSelectedInteret([...selectedInteret, interet]);
  // }
  
    
    return (
      
    <View>
        <Text>Vos centres d'intêret :</Text>

        <View className="container">
          {interetList.map(interet => (
            <View key={interet}>
              <TouchableOpacity
                onPress={() => console.log("text")}
              >
                <Text>{interet}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      <Button title="Submit" onPress={() => submit()} >Mettre a jour le profil</Button>
  </View>

  );
}




function submit(state, user_id) {

  var send = {}
  send.user_id = user_id;
  send.interet = state.interet

  if(state.interet.length === 5){


      //blockage du bruteforce 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "authorization": getCookie("token")},
        body: JSON.stringify(send)
    };
    fetch('http://localhost:3001/api/profile/interet/'+getCookie("userId"), requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            alert(data.message) 
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }  else { 
      alert("vous devez choissir 5 centres d'intêret")
    }
  }

