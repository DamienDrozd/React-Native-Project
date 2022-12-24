

import React, {  useEffect, useState  } from "react";
import { View, Text, Button, TextInput, Dimensions } from "react-native";
import axios from "axios";
// import google from "google-maps"
import {Slider} from '@miblanchard/react-native-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';




export default function Location() {

    const [userList, setUserList] = useState({});
    const [longitude, setLongitude] = useState(-122.08);
    const [latitude, setLatitude] = useState(37.47);
    const [searchRange, setSearchRange] = useState(50);


  useEffect(() => {
        

        const requestOptions = {  
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "authorization": getStorage("token") },
            body: JSON.stringify(userList) 
        };
        
        axios.get('http://localhost:3001/api/profile/recherche/'+getStorage("userId"),requestOptions).then(async res1 => {
          axios.get('http://localhost:3001/api/profile/localisation/'+getStorage("userId"),requestOptions).then(async res2 => {
            var data = await res1.data[0];
            data.longitude = await res2.data[0].longitude; 
            data.latitude = await res2.data[0].lattitude;
            setUserList(data); 
            console.log(data)
        }).catch(error => {
            console.error('There was an error with api!', error);
        });
      }).catch(error => {
          console.error('There was an error with api!', error);
      });
      getOneTimeLocation()
      
         
  }, []);

  const getOneTimeLocation = () => {
    console.log("getOneTimeLocation");
    Geolocation.getCurrentPosition(
      (position) => {
        //getting the Longitude / latitude  from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //Setting Longitude / latitude state
        setLongitude(currentLongitude);
        setLatitude(currentLatitude);
      }
    );
  };


    
return (
  <View>
    <Button onPress={getOneTimeLocation} title="Localiser" ></Button>

      <Text>Longitude</Text>
      <Text>{longitude}</Text>

      <Text>Latitude</Text>
      <Text>{latitude}</Text>
    <View>
    <Text>Zone de recherche</Text>
      <Text> {searchRange} km</Text>
      <Slider
        value={searchRange}
        minimumValue={5}
        maximumValue={1000}
        step={5}
        onValueChange={value => setSearchRange(value)}
      />
    </View>
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height-300}}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 10,
        longitudeDelta: 10,
      }}
    />

    <Button title="Mettre a jour le profil" onPress={() => submit()} ></Button>      
  </View>
  );
}

  

const getStorage = (token) => {
  AsyncStorage.getItem(token).then((token) => {
    return token;
  })
}






function submit(state, userList) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position)=>{
      userList.longitude = position.coords.longitude;
      userList.latitude = position.coords.latitude;
      userList.zone_recherche = state.searchRange;
      console.log(userList)

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
    })
  }
}
    

