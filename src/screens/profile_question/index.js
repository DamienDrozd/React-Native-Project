

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";



 
export default function QuestionProfil() {

    const [questionList, setquestionList] = useState([]);
    const { reset, register, handleSubmit, watch, formState: { errors }  } = useForm();
    const final = [];

    useEffect(() => {
        

      var requestOptions = {  
          method: 'GET',
          headers: { 'Content-Type': 'application/json', "authorization": getCookie("token") },
          body: JSON.stringify(questionList) 
      };
      
      axios.get('http://localhost:3001/api/question',requestOptions).then(async res => {
        var data = await res.data;

        for (let  interet of data) {
          final.push(<option value={interet.id}>{interet.name}</option>)
        }

        setquestionList(final)
          
      })
  
      requestOptions = {  
          method: 'GET',
          headers: { 'Content-Type': 'application/json', "authorization": getCookie("token") },
          body: JSON.stringify(questionList)  
      };
      axios.get('http://localhost:3001/api/profile/question/'+getCookie("userId"),requestOptions).then(async res => {
      var data = await res.data;

      console.log(data[0].reponse)  
      
      let defaultChecked = {}; 
      
      defaultChecked.response1 = data[0].reponse; 
      defaultChecked.response2 = data[1].reponse; 
      defaultChecked.response3 = data[2].reponse; 

      defaultChecked.question1 = data[0].question_id; 
      defaultChecked.question2 = data[1].question_id; 
      defaultChecked.question3 = data[2].question_id;  
      console.log(defaultChecked)
      reset({ ...defaultChecked }); 
    })
        
  }, []);

  

    const onSubmit = (data) => {submit(data, getCookie("userId"))}

    
    return (
      
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="profilform" >
          <h1 className="title">Decrivez vous :</h1>

          <div className="form-group">
            <div className="form-group">
              <select {...register("question1")} className="form-select question">
                  <option value="q">question 1 :</option>
                {questionList}
              </select>
            </div>
            <div className="form-group">
              <input {...register("response1")} type="text" className="form-control" placeholder="Votre réponse" />
            </div>
          </div>

          <div className="form-group">
            <div className="form-group">
              <select {...register("question2")} className="form-select question">
                  <option value="q">question 2 :</option>
                {questionList}
              </select>
            </div>
            <div className="form-group">
              <input {...register("response2")} type="text" className="form-control" placeholder="Votre réponse" />
            </div>
          </div>

          <div className="form-group">
            <div className="form-group">
              <select {...register("question3")} className="form-select question">
                  <option value="q">question 3 :</option>
                {questionList}
              </select>
            </div>
            <div className="form-group">
              <input {...register("response3")} type="text" className="form-control" placeholder="Votre réponse" />
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

  console.log(state)

  var send = {}
  send.question_id = [];
  send.response = [];

  send.user_id = user_id;
  send.question_id.push(state.question1)
  send.question_id.push(state.question2)
  send.question_id.push(state.question3)

  send.response.push(state.response1)
  send.response.push(state.response2)
  send.response.push(state.response3)

  console.log(send)




      //blockage du bruteforce 
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "authorization": getCookie("token")},
      body: JSON.stringify(send)
  };
  fetch('http://localhost:3001/api/profile/question/'+getCookie("userId"), requestOptions)
      .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();
          alert(data.message)
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
  } 
  


