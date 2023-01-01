import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Update_Button from "../../components/Update_User";




 
export default function Biographie({ route, navigation }) {
    const [user, setUser] = useState(route.params.user)



    return (
      <View>        
          <Text>Biographie</Text>

          <View>
            <TextInput
              multiline
              numberOfLines={10}
              // style={styles.input}
              onChangeText={(text) => {
                  var newUser = user;
                  newUser.biographie = text;
                  setUser(newUser)
              }}
              value={user.biographie}
              placeholder="Entrez votre biographie"
              
            />
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

