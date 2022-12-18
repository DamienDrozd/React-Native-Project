import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import axios from "axios";




 
export default function Biographie() {
    const [biographie, setBiographie] = useState([]);

  //   useEffect(() => {
        

  //       const requestOptions = {  
  //           method: 'GET',
  //           headers: { 'Content-Type': 'application/json', "authorization": getCookie("token") },
  //           body: JSON.stringify(userList) 
  //       };
        
  //       axios.get('http://localhost:3001/api/profile/'+getCookie("userId"),requestOptions).then(async res => {
  //           var data = await res.data;
  //           setUserList(data); 
            
  //           let defaultValues = {};
  //           defaultValues.bio = data.bio;
  //           reset({ ...defaultValues }); 
            
  //       })
        
  // }, []);



    return (
      <View>        
          <Text className="title">Biographie</Text>

          <View className="form-group">
            <TextInput
              multiline
              numberOfLines={10}
              // style={styles.input}
              onChangeText={(text) => setBiographie(text)}
              value={biographie}
              placeholder="Entrez votre biographie"
              
            />
          </View>
          <Button title="Submit" onPress={() => submit()} >Mettre a jour le profil</Button>
      </View>
    );
  }


function submit(state, userList) {
        var bio = state.bio;


        userList.bio = bio;
        console.log(userList)
 
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
