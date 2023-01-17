

import React, {  useEffect, useState  } from "react";
import { View, Text, Button, TextInput, Dimensions } from "react-native";
import axios from "axios";
// import google from "google-maps"
import {Slider} from '@miblanchard/react-native-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import  MapView, {Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import Update_Button from "../../components/Update_User"; 
import { useTranslation } from "react-i18next";

import { getStorage } from "../../functions/storage"; 


export default function Location({ route, navigation }) {
  const { t } = useTranslation();
  const [user, setUser] = useState({longitude: 0, latitude: 0, searchRange: 100});
 
    useEffect(() => {
      getStorage('user').then(fetchedUser => {
        if ( fetchedUser.longitude == undefined || fetchedUser.longitude == "" || fetchedUser.longitude == null){
          fetchedUser.longitude = 0;
        }
        if ( fetchedUser.latitude == undefined || fetchedUser.latitude == "" || fetchedUser.latitude == null){
          fetchedUser.latitude = 0;
        }
        if ( fetchedUser.searchRange == undefined || fetchedUser.searchRange == "" || fetchedUser.searchRange == null){
          fetchedUser.searchRange = 100;
        }
        setUser(fetchedUser);
      });
      getOneTimeLocation();
    }, []);


    let navButton;
    if (user.longitude != undefined && user.longitude != 0 && user.latitude != undefined && user.latitude != 0 && user.searchRange != undefined && user.searchRange != 0 ){ 
        navButton = (
            <View>
                <Update_Button user={user} prevPage="Profile5" nextPage="Profile7"  navigation={navigation} />
            </View>
        ) 
    } else {
        navButton = (
            <View> 
                <Text>{t("profile.fill")}</Text>
                <Update_Button user={user} prevPage="Profile5" nextPage=""  navigation={navigation} />
            </View>
        )
    }

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
        (position) => {
          let newUser = user;
          newUser.longitude = position.coords.longitude;
          newUser.latitude = position.coords.latitude; 
          setUser(newUser);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

    
return (
  <View>
    <View>
    <Text>{t("profile.search_zone")}</Text>
      <Text> {user.searchRange} km</Text>
      <Slider
        value={user.searchRange}
        minimumValue={5}
        maximumValue={1000}
        step={5}
        onValueChange={value => {
            let newUser = {...user};
            newUser.searchRange = value;
            setUser(newUser)
        }}
      />
    </View>
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height-300}}
      region={{
        latitude: user.latitude,
        longitude: user.longitude,
        latitudeDelta: user.searchRange / 30,
        longitudeDelta: user.searchRange / 30,
      }}
      pitchEnabled={false}
      rotateEnabled={false}
      scrollEnabled={false}
      zoomEnabled={false}
    >
      <Circle
        key = { (user.longitude + user.latitude).toString() }
        center = {{
            latitude: user.latitude,
            longitude: user.longitude
          }}
        radius = { user.searchRange * 1000 }
        strokeWidth = { 1 }
        strokeColor = { '#1a66ff' }
        fillColor = { 'rgba(230,238,255,0.5)' }
      />
    </MapView>

    {navButton}
  </View>
  );
} 



