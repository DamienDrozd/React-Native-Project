

import React, {  useEffect, useState  } from "react";
import { View, Text, Button, TextInput, Dimensions } from "react-native";
import axios from "axios";
// import google from "google-maps"
import {Slider} from '@miblanchard/react-native-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import  MapView, {Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import Update_Button from "../../components/Update_User"; 



export default function Location({ route, navigation }) {
    const [user, setUser] = useState(route.params.user)



  useEffect(() => {
      getOneTimeLocation()   
  }, []);

  const getOneTimeLocation = () => {
    // if (hasLocationPermission) {
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
  // }
  };

console.log(user); 
    
return (
  <View>
    <View>
      {/* <Button onPress={getOneTimeLocation} title="Localiser" ></Button> */}

      <Text>Longitude</Text>
      <Text>{user.longitude}</Text>

      <Text>Latitude</Text>
      <Text>{user.latitude}</Text>
    <Text>Zone de recherche</Text>
      <Text> {user.searchRange} km</Text>
      <Slider
        value={user.searchRange}
        minimumValue={5}
        maximumValue={1000}
        step={5}
        onValueChange={value => {
            var newUser = user;
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

    <Update_Button user={user}/>  
  </View>
  );
} 



