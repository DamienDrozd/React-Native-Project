

import React, {  useEffect, useState  } from "react";
import { View, Text, Button, TextInput } from "react-native";
import axios from "axios";
import SwitchSelector from "react-native-switch-selector";
import AsyncStorage from '@react-native-async-storage/async-storage';

 
export default function Recherche() {
  const [userList, setUserList] = useState({});
  const [age_min, setAge_min] = useState(0);
  const [age_max, setAge_max] = useState(0);
  const [preference , setPreference] = useState("")

    

  useEffect(() => {
        

        const requestOptions = {  
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "authorization": getStorage("token") },
            body: JSON.stringify(userList) 
        };
        
        axios.get('http://localhost:3001/api/profile/recherche/'+getStorage("userId"),requestOptions).then(async res1 => {
          axios.get('http://localhost:3001/api/profile/localisation/'+getStorage("userId"),requestOptions).then(async res2 => {
            var data = await res1.data[0];
            setUserList(data); 
            console.log(data)
          }).catch(error => {
              console.error('There was an error with api!', error);
          });
        }).catch(error => {
            console.error('There was an error with api!', error);
        });
         
  }, []);
    
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

        <View>
          <Text>
            Preférence sexuelle
          </Text>
          <View>
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

          
      <Button title="Mettre a jour le profil" onPress={() => submit()} ></Button>      
    </View>
  </View>
  );
}

  

const getStorage = (token) => {
  AsyncStorage.getItem(token).then((token) => {
    return token;
  })
}




function submit(state, userList) {
  userList.preference_gender = preference;
  userList.age_min = age_min;
  userList.age_max = age_max;

  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "authorization": getStorage("token")},
      body: JSON.stringify(userList)
  };
  fetch('http://localhost:3001/api/profile/recherche/'+getStorage("userId"), requestOptions)
    .then(async response1 => {
      fetch('http://localhost:3001/api/profile/localisation/'+getStorage("userId"), requestOptions)
        .then(async response2 => {

        })
    })

}
    
