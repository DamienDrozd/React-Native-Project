import React, {  useEffect, useState  } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import axios from "axios";
import DatePicker from 'react-native-date-picker'
import SwitchSelector from "react-native-switch-selector";



export default function Profile2() {

  const [userList, setUserList] = useState([]);
  const [birthday, setBirthday] = useState(new Date());
  const [open, setOpen] = useState(false)
  const [gender, setGender] = useState("Male");
  



  // useEffect(() => {
        

  //       const requestOptions = {  
  //           method: 'GET',
  //           headers: { 'Content-Type': 'application/json', "authorization": getCookie("token") },
  //           body: JSON.stringify(userList) 
  //       };
        
  //       axios.get('http://localhost:3001/api/profile/'+getCookie("userId"),requestOptions).then(async res => {
  //           var data = await res.data;
  //           setUserList(data); 
            
  //           let defaultValues = {};
  //           defaultValues.birthday = data.birthday;
  //           defaultValues.gender = data.gender;
  //           reset({ ...defaultValues }); 
            
  //       })
        
  // }, []);


    return (
      <View>

          <Text>Profil</Text>

          <View className="form-group">
            <View>
              <Text>Date de naissance</Text>
              <DatePicker
                date={birthday}
                onDateChange={(date) => {
                  setOpen(false)
                  setBirthday(date)
                }}
                mode = "date"
              />
            </View>
          </View>
          <View className="container">
            <View className="form-group">
              <Text>Quel est votre sexe ?</Text>
            </View>
            <View>
              <View
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SwitchSelector
                  initial={0}
                  onPress={value => setGender({ gender: value })}
                  hasPadding
                  options={[
                    { label: "Homme", value: "Male"}, 
                    { label: "Femme", value: "Female"},
                    { label: "Autre", value: "Other"} 
                  ]}
                  testID="gender-switch-selector"
                  accessibilityLabel="gender-switch-selector"
                />
              </View>
            </View>
            

            <Button title="Submit" onPress={() => submit()} >Mettre a jour le profil</Button>
        </View>

      </View>
    );
  }




function submit(state, userList) {
        var birthday = state.birthday;
        var gender = state.gender;


        userList.birthday = birthday;
        userList.gender = gender;
        console.log(userList);

            //blockage du bruteforce 
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "authorization": getCookie("token")},
            body: JSON.stringify(userList)
        };
        fetch('http://localhost:3001/api/profile/'+getCookie("userId"), requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                alert(data.message)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    } 

