

import React, {  useEffect, useState  } from "react";
import { View, Text, Button, TextInput } from "react-native";
import axios from "axios";
import SwitchSelector from "react-native-switch-selector";
 
export default function Recherche() {

    const [age_min, setAge_min] = useState(0);
    const [age_max, setAge_max] = useState(0);
    const [preference , setPreference] = useState("")

    

  // useEffect(() => {
        

  //       const requestOptions = {  
  //           method: 'GET',
  //           headers: { 'Content-Type': 'application/json', "authorization": getCookie("token") },
  //           body: JSON.stringify(userList) 
  //       };
        
  //       axios.get('http://localhost:3001/api/profile/recherche/'+getCookie("userId"),requestOptions).then(async res1 => {
  //         axios.get('http://localhost:3001/api/profile/localisation/'+getCookie("userId"),requestOptions).then(async res2 => {
  //           var data = await res1.data[0];
  //           data.longitude = await res2.data[0].longitude; 
  //           data.latitude = await res2.data[0].lattitude;
  //           setUserList(data); 
  //           console.log(data)
  //           let defaultValues = {};  
  //           defaultValues.longitude = data.longitude;
  //           defaultValues.latitude = data.latitude;
  //           defaultValues.preference_gender = data.preference_gender;
  //           defaultValues.age_min = data.age_min;
  //           defaultValues.age_max = data.age_max;
  //           defaultValues.searchRange = data.zone_recherche;
  //           reset({ ...defaultValues });   
               
  //           document.getElementById("zone").value = document.getElementById("searchRange").value
  //       })
  //     })
         
  // }, []);


  // document.getElementById("searchRange").value
  // if(document.getElementById("searchRange") !== null){
  //   document.getElementById("zone").value = document.getElementById("searchRange").value
  // }

    
    return (

      <View>
        <View>
          <Text>
            Age minimum recherché
          </Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            value={age_min}
            keyboardType="numeric"
            onChangeText={(text) => setAge_min(text)}
          />
        </View>
        <View>
          <Text>
            Age maximum recherché
          </Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            value={age_max}
            keyboardType="numeric"
            onChangeText={(text) => setAge_max(text)}
          />
        </View>

        <View className="form-group">
          <Text>
            Preférence sexuelle
          </Text>
          <View className="container">
          <SwitchSelector
            initial={0}
            onPress={value => setPreference({ gender: value })}
            hasPadding
            options={[
              { label: "Homme", value: "Male"}, 
              { label: "Femme", value: "Female"},
              { label: "Bisexuel", value: "bi"} 
            ]}
            testID="gender-switch-selector"
            accessibilityLabel="gender-switch-selector"
          />
        </View>

          
        <Button title="Submit" onPress={() => submit()} >Mettre a jour le profil</Button>
      </View>
  </View>
  );
}

  






function submit(state, userList) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position)=>{
      userList.preference_gender = state.preference_gender;
      userList.age_min = state.age_min;
      userList.age_max = state.age_max;
      console.log(userList)

  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "authorization": getCookie("token")},
      body: JSON.stringify(userList)
  };
  fetch('http://localhost:3001/api/profile/recherche/'+getCookie("userId"), requestOptions)
      .then(async response1 => {
        fetch('http://localhost:3001/api/profile/localisation/'+getCookie("userId"), requestOptions)
          .then(async response2 => {

          })
      })


    })
  }
}
    
