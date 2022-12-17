

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";



 
export default function InteretProfil() {

    const [interetList, setInteretList] = useState([]);
    const { reset, register, handleSubmit, watch, formState: { errors }  } = useForm();
    const final = [];

    useEffect(() => {
        

      var requestOptions = {  
          method: 'GET',
          headers: { 'Content-Type': 'application/json', "authorization": getCookie("token") },
          body: JSON.stringify(interetList) 
      };
      
      axios.get('http://localhost:3001/api/interet',requestOptions).then(async res => {
        var data = await res.data;
        

        for (let  interet of data) {
          final.push(<div>
                      <input class="form-check-input" type="checkbox" value={interet.id} id={interet.id} {...register('interet')}/>
                      <label class="form-check-label" for="{interet.id}">{interet.name}</label>
                    </div>);
        }

        setInteretList(final)
        // console.log(interetList)
          
      })
  
      requestOptions = {  
          method: 'GET',
          headers: { 'Content-Type': 'application/json', "authorization": getCookie("token") },
          body: JSON.stringify(interetList)  
      };
      axios.get('http://localhost:3001/api/profile/interet/'+getCookie("userId"),requestOptions).then(async res => {
      var data = await res.data;
      console.log(data);
      for(var i of data){
        if (i.interet_id != null){
          console.log(i.interet_id);
          document.getElementById(i.interet_id).checked  = true;
        }
      }
    })
        
  }, []);

  

    const onSubmit = (data) => {submit(data, getCookie("userId"))}

    
    return (
      
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="profilform">

        <h1 className="title">Vos centres d'intêret :</h1>

        <div className="container">
          <div className="row">
            <div>{interetList}</div>
          </div>
        </div>
      <button type="submit" className="btn btn-dark btn-lg btn-block" id="submit_button">Mettre a jour le profil</button>
    </form>
  </div>

        
      
    );
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



function submit(state, user_id) {

  var send = {}
  send.user_id = user_id;
  send.interet = state.interet

  if(state.interet.length === 5){


      //blockage du bruteforce 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "authorization": getCookie("token")},
        body: JSON.stringify(send)
    };
    fetch('http://localhost:3001/api/profile/interet/'+getCookie("userId"), requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            alert(data.message) 
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }  else { 
      alert("vous devez choissir 5 centres d'intêret")
    }
  }

