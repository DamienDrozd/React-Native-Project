import React, { useState, useEffect, PureComponent } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import axios from "axios";



 
export default function Profile1() {

    const [userList, setUserList] = useState([]);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
//     const { reset, register, handleSubmit, watch, formState: { errors }  } = useForm();

//     useEffect(() => {
        

//         const requestOptions = {  
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json', "authorization": getCookie("token") },
//             body: JSON.stringify(userList) 
//         };
        
//         axios.get('http://localhost:3001/api/profile/'+getCookie("userId"),requestOptions).then(async res => {
//             var data = await res.data;
//             setUserList(data); 
            
//             let defaultValues = {};
//             defaultValues.firstname = data.firstname;
//             defaultValues.lastname = data.lastname;
//             reset({ ...defaultValues }); 
            
//         })
        
//   }, []);


//     const onSubmit = (data) => {submit(data, userList)}
    
    return (
        <View>
            <Text>Profil</Text>

            <Text>Création de profil</Text>

            <View className="form-group">
                <Text>Prenom</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    value={firstname}
                    onChangeText={(text) => setFirstname(text)}
                />
            </View>

            <View className="form-group">
                <Text>Prenom</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    value={lastname}
                    onChangeText={(text) => setLastname(text)}
                />
            </View>

            <Button title="Submit" onPress={() => submit()} >Mettre a jour le profil</Button>
        </View>
    );
}




function submit(state, userList) {


        userList.firstname = firstname;
        userList.lastname = lastname;

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

   
  