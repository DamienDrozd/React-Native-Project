import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchSelector from "react-native-switch-selector";
import DatePicker from 'react-native-date-picker'


import Update_Button from "../../components/Update_User";




export default function Profile2({ route, navigation }) {
    const [user, setUser] = useState(route.params.user)


  return (
    <View>

      <Text>Profil</Text>
 
      <View>
        <View>
          <DatePicker
            date={user["birthday"]}
            onDateChange={(date) => {
                var newUser = user;
                newUser["birthday"] = date;
                setUser(newUser);
                console.log(user.birthday.toString());
            }}
            mode = "date"
          />
        </View>
      </View>
      <View>
        <View>
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
              onPress={value => {
                var newUser = user;
                newUser.gender = value;
                setUser(newUser)
              }}
              hasPadding
              options={[
                { label: "Homme", value: "Male" },
                { label: "Femme", value: "Female" },
                { label: "Autre", value: "Other" }
              ]}
              testID="gender-switch-selector"
              accessibilityLabel="gender-switch-selector"
            />
          </View>
        </View>


        <Update_Button user={user} />
      </View>

    </View>
  );
}




