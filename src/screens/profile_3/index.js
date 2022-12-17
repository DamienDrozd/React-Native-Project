

import React, {  useEffect, useState  } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import google from "google-maps"







export default function Recherche() {

    const [userList, setUserList] = useState({});
    const { reset, register, handleSubmit, watch, formState: { errors }  } = useForm();

    

  useEffect(() => {
        

        const requestOptions = {  
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "authorization": getCookie("token") },
            body: JSON.stringify(userList) 
        };
        
        axios.get('http://localhost:3001/api/profile/recherche/'+getCookie("userId"),requestOptions).then(async res1 => {
          axios.get('http://localhost:3001/api/profile/localisation/'+getCookie("userId"),requestOptions).then(async res2 => {
            var data = await res1.data[0];
            data.longitude = await res2.data[0].longitude; 
            data.latitude = await res2.data[0].lattitude;
            setUserList(data); 
            console.log(data)
            let defaultValues = {};  
            defaultValues.longitude = data.longitude;
            defaultValues.latitude = data.latitude;
            defaultValues.preference_gender = data.preference_gender;
            defaultValues.age_min = data.age_min;
            defaultValues.age_max = data.age_max;
            defaultValues.searchRange = data.zone_recherche;
            reset({ ...defaultValues });   
               
            document.getElementById("zone").value = document.getElementById("searchRange").value
        })
      })
         
  }, []);

  const onSubmit = (data) => {submit(data, userList)}

  // document.getElementById("searchRange").value
  if(document.getElementById("searchRange") !== null){
    document.getElementById("zone").value = document.getElementById("searchRange").value
  }

    
    return (

      <div>
        
        <button onClick={getLocation} className="btn btn-dark btn-lg btn-block" >Localiser</button>


        <form onSubmit={handleSubmit(onSubmit)} className="profilform">

          <label>Longitude</label>
          <input {...register("longitude")} type="text" id="longitude" class="form-control ex1" disabled></input>

          <label>Latitude</label>
          <input {...register("latitude")} type="text" id="latitude" class="form-control ex1" disabled></input>
          

        <div className="form-group">


          <label class="form-label" for="customRange2">Zone de recherche</label>
          <div class="range">
            <input {...register("searchRange", { required: true})} type="range" class="form-range" min="0" max="100" id="searchRange" />
          </div>
          <input type="text" id="zone" class="form-control ex1" disabled></input>



        </div>
        <div>
          <label>
            Age minimum recherché
            <input
              type="text"
              className="form-control"
              placeholder="Age minimum"
              {...register("age_min", { required: true})}
            />
          </label>
          
        </div>
        <div>
          <label>
            Age maximum recherché
            <input
              type="text"
              className="form-control"
              placeholder="Age maximum"
              {...register("age_max", { required: true})}
            />
          </label>
          
        </div>

        <div className="form-group">
          <label>
            Preférence sexuelle
            <div className="container">
              <div>
                <input class="form-check-input" type="radio" value="male" id="male" {...register('preference_gender')}/>
                <label class="form-check-label" for="male">homme</label>
              </div>
              <div>
              <input class="form-check-input" type="radio" value="female" id="female" {...register('preference_gender')}/>
              <label class="form-check-label" for="female">femme</label>
              </div>
              <div>
              <input class="form-check-input" type="radio" value="bi" id="bi" {...register('preference_gender')}/>
              <label class="form-check-label" for="bi">Bisexuel</label>
              </div>
            </div>
          </label>
            
        </div>

        
        <button type="submit" className="btn btn-dark btn-lg btn-block" id="submit_button">Mettre a jour le profil</button>
      </form>
      </div>
    );
  }

  

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  document.getElementById("longitude").value = position.coords.longitude
  document.getElementById("latitude").value = position.coords.latitude
  return {latitude: position.coords.latitude, longitude: position.coords.longitude};
}






function submit(state, userList) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position)=>{
      userList.preference_gender = state.preference_gender;
      userList.longitude = position.coords.longitude;
      userList.latitude = position.coords.latitude;
      userList.zone_recherche = state.searchRange;
      userList.age_min = state.age_min;
      userList.age_max = state.age_max;
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
    


function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}