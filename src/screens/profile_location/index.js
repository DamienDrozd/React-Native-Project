

import React, {  useEffect, useState  } from "react";
import { View, Text, Button, TextInput } from "react-native";
import axios from "axios";
// import google from "google-maps"
import SwitchSelector from "react-native-switch-selector";
 






export default function Location() {

    const [userList, setUserList] = useState({});
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [searchRange, setSearchRange] = useState(0);


  // useEffect(() => {
        

  //       const requestOptions = {  
  //           method: 'GET',
  //           headers: { 'Content-Type': 'application/json', "authorization": getCookie("token") },
  //           body: JSON.stringify(userList) 
  //       };
        
  //       axios.get('http://localhost:3001/api/profile/recherche/'+getCookie("userId"),requestOptions).then(async res1 => {
  //         axios.get('http://localhost:3001/api/profile/localisation/'+getCookie("userId"),requestOptions).then(async res2 => {
  //           var data = await res1.data[0];
  //           data.longitude = await res2.data[0].longitude; 
  //           data.latitude = await res2.data[0].lattitude;
  //           setUserList(data); 
  //           console.log(data)
  //           let defaultValues = {};  
  //           defaultValues.longitude = data.longitude;
  //           defaultValues.latitude = data.latitude;
  //           defaultValues.preference_gender = data.preference_gender;
  //           defaultValues.age_min = data.age_min;
  //           defaultValues.age_max = data.age_max;
  //           defaultValues.searchRange = data.zone_recherche;
  //           reset({ ...defaultValues });   
               
  //           document.getElementById("zone").value = document.getElementById("searchRange").value
  //       })
  //     })
         
  // }, []);


    
return (
  <View>
        
    {/* <Button onClick={getLocation} className="btn btn-dark btn-lg btn-block" >Localiser</Button> */}

      {/* <label>Longitude</label>
      <input {...register("longitude")} type="text" id="longitude" class="form-control ex1" disabled></input>

      <label>Latitude</label>
      <input {...register("latitude")} type="text" id="latitude" class="form-control ex1" disabled></input> */}
    <View className="form-group">
      <Text>Zone de recherche</Text>
      {/* <View class="range">
        <input {...register("searchRange", { required: true})} type="range" class="form-range" min="0" max="100" id="searchRange" />
      </View>
      <input type="text" id="zone" class="form-control ex1" disabled></input> */}
    </View>
    <Button title="Submit" onPress={() => submit()} >Mettre a jour le profil</Button>
  </View>
  );
}

  

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     console.error("Geolocation is not supported by this browser.");
//   }
// }

// function showPosition(position) {
//   document.getElementById("longitude").value = position.coords.longitude
//   document.getElementById("latitude").value = position.coords.latitude
//   return {latitude: position.coords.latitude, longitude: position.coords.longitude};
// }






function submit(state, userList) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position)=>{
      userList.longitude = position.coords.longitude;
      userList.latitude = position.coords.latitude;
      userList.zone_recherche = state.searchRange;
      console.log(userList)

  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "authorization": getCookie("token")},
      body: JSON.stringify(userList)
  };
  fetch('http://localhost:3001/api/profile/recherche/'+getCookie("userId"), requestOptions)
      .then(async response1 => {
        fetch('http://localhost:3001/api/profile/localisation/'+getCookie("userId"), requestOptions)
          .then(async response2 => {

          })
      })


    })
  }
}
    

