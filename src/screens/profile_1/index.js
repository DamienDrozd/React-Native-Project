import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

import Update_Button from "../../components/Update_User";



 
export default function Profile1({ route, navigation }) {
    const [user, setUser] = useState(route.params.user)

    
    return (
        <View>
            <Text>Profil</Text>

            <Text>Création de profil</Text>

            <View>
                <Text>Prenom</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    value={user.firstname}
                    onChangeText={(text) => {
                        var newUser = user;
                        newUser.firstname = text;
                        setUser(newUser);
                    }}
                />
            </View>
             <View>
                <Text>Prenom</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    value={user.lastname}
                    onChangeText={(text) => {
                        var newUser = user;
                        newUser.lastname = text;
                        setUser(newUser)
                    }}
                />
            </View>
            <Update_Button user={user}/>
               
        </View>
    );
}






   
  