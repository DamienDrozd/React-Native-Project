

import React, {  useEffect, useState  } from "react";
import { View, Text, Button, TextInput } from "react-native";
import axios from "axios";
import SwitchSelector from "react-native-switch-selector";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Update_Button from "../../components/Update_User";


 
export default function Recherche({ route, navigation }) {
    const [user, setUser] = useState(route.params.user)
    
    return (

      <View>
        <View>
          <Text>
            Age minimum recherché
          </Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            value={user.age_min}
            keyboardType="numeric"
            onChangeText={(text) => {
                var newUser = user;
                newUser.age_min = text;
                setUser(newUser)
            }}
          />
        </View>
        <View>
          <Text>
            Age maximum recherché
          </Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            value={user.age_max}
            keyboardType="numeric"
            onChangeText={(text) => {
                var newUser = user;
                newUser.age_max = text;
                setUser(newUser)
            }}
          />
        </View>

        <View>
          <Text>
            Preférence sexuelle
          </Text>
          <View>
          <SwitchSelector
            initial={0}
            onPress={value => {
                var newUser = user;
                newUser.preference_gender = value;
                setUser(newUser)
            }}
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

          
      <Update_Button user={user}/>
    </View>
  </View>
  );
}

  

const getStorage = (token) => {
  AsyncStorage.getItem(token).then((token) => {
    return token;
  })
}

