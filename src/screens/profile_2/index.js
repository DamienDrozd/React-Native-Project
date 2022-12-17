import React, {  useEffect, useState  } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import axios from "axios";
// import { DateInput } from 'react-native-date-input';



export default function Profile2() {

  const [userList, setUserList] = useState([]);
  const [birthday, setBirthday] = useState('');


  // useEffect(() => {
        

  //       const requestOptions = {  
  //           method: 'GET',
  //           headers: { 'Content-Type': 'application/json', "authorization": getCookie("token") },
  //           body: JSON.stringify(userList) 
  //       };
        
  //       axios.get('http://localhost:3001/api/profile/'+getCookie("userId"),requestOptions).then(async res => {
  //           var data = await res.data;
  //           setUserList(data); 
            
  //           let defaultValues = {};
  //           defaultValues.birthday = data.birthday;
  //           defaultValues.gender = data.gender;
  //           reset({ ...defaultValues }); 
            
  //       })
        
  // }, []);


    return (
      <View>

          <Text>Profil</Text>

          <View className="form-group">
            <View>
              <Text>Date de naissance</Text>
              {/* <DateInput
                inputProps={{
                  style: {}
                }}
                dateFormat={'DD/MM/YYYY'}
                defaultValue={new Date(dayjs().subtract(5, 'year').format('DD/MM/YYYY'))}
                defaultDate={new Date(dayjs().subtract(5, 'year'))}
                minimumDate={new Date(dayjs().subtract(10, 'year'))}
                maximumDate={new Date()}
                handleChange={handleChange}
                onRef={(input) => (setBirthday(input))}
              /> */}
              {/* <input
                name="anniversaire"
                {...register("birthday", { required: true, maxLength: 50, minLength: 2 })}
                type="date"
                className="form-control"
                placeholder="date de naissance"
              /> */}
            </View>
          </View>
          <View className="container">
            <View className="form-group">
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
                {/* <input type="radio" {...register("gender")} value="Male" id="men" /> */}
                {/* <View for="homme">Homme</View> */}

                {/* <input type="radio" {...register("gender")} value="Female" id="women" /> */}
                {/* <View for="femme">Femme</View> */}
              </View>
            </View>
            

            <Button title="Register" onPress={() => submit()} >Mettre a jour le profil</Button>
        </View>

      </View>
    );
  }


// function getCookie(cname) {
//   let name = cname + "=";
//   let ca = document.cookie.split(';');
//   for(let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }



function submit(state, userList) {
        var birthday = state.birthday;
        var gender = state.gender;


        userList.birthday = birthday;
        userList.gender = gender;
        console.log(userList);

            //blockage du bruteforce 
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "authorization": getCookie("token")},
            body: JSON.stringify(userList)
        };
        fetch('http://localhost:3001/api/profile/'+getCookie("userId"), requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                alert(data.message)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    } 

