import React, { useState, useEffect, PureComponent } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';




const Settings = ({ navigation }) => { 

    const Logout = () => {
        AsyncStorage.getAllKeys().then((keys) => {
            AsyncStorage.multiRemove(keys).then(() => {
                console.log("Logout success");
                navigation.navigate("Public");
            }).catch((error) => {
                console.log("storage error : ", error);
            });
        }).catch((error) => {
            console.log("storage error : ", error);
        });
    }
    

    return (
        <View>
            <Text>
                Settings
            </Text>
            <Button title="Logout" onPress={Logout} />
            <Button title="Profile settings" onPress={() => navigation.navigate('Profile')} />
        </View >
    );
    }
 

export default Settings; 