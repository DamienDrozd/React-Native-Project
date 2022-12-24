import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button, Animated, Dimensions } from "react-native";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
const Math = require("mathjs")



const userTestTab = [{ firstname: "Damien", birthday: "1990-01-01", interet: ["interet1", "interet2", "interet3"], question: [{ name: "question1", reponse: "response1" }, { name: "question2", reponse: "response2" }, { name: "question3", reponse: "response3" }] },
{ firstname: "Axel", birthday: "1990-01-01", interet: ["interet1", "interet2", "interet3"], question: [{ name: "question1", reponse: "response1" }, { name: "question2", reponse: "response2" }, { name: "question3", reponse: "response3" }] },
{ firstname: "Zack", birthday: "1990-01-01", interet: ["interet1", "interet2", "interet3"], question: [{ name: "question1", reponse: "response1" }, { name: "question2", reponse: "response2" }, { name: "question3", reponse: "response3" }] }]

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default function Match() {


    const [userList, setUserList] = useState(userTestTab);
    const [count, setCount] = useState(0);
    const [backgroundColor, setBackgroundColor] = useState("white");
    useEffect(() => {
        // console.log("test")
        const requestOptions = {  
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "authorization": getStorage("token") },
            body: JSON.stringify(userList) 
        };
        axios.get('http://localhost:3001/api/match/'+getStorage("userId"),requestOptions).then(async res => {
            var data = await res.data;
            setUserList(data);  
            console.log(data);
        }) 
    }, []);

    const onSwipe = (gestureName, gestureState) => {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case SWIPE_LEFT:
                setBackgroundColor('blue')
                break;
            case SWIPE_RIGHT:
                setBackgroundColor('yellow')
                break;
        }
    }

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };


    if (userList[count] !== undefined) {
        return (
            <View>
                <View>
                    <View>
                        <Text>HomePage</Text>
                        <GestureRecognizer
                            onSwipe={(direction, state) => onSwipe(direction, state)}
                            onSwipeLeft={() => setCount(count + like(count, "dislike", userList))}
                            onSwipeRight={() => setCount(count + like(count, "like", userList))}
                            config={config}
                            style={{
                                // flex: 1,
                                backgroundColor: backgroundColor
                            }}
                        >
                            <Animated.View
                                style={[this.rotateAndTranslate,
                                {
                                    height: SCREEN_HEIGHT - 200,
                                    width: SCREEN_WIDTH,
                                    padding: 10,
                                    // position: "absolute"
                                }
                                ]}
                            >
                                <Text>
                                    {userList[count].firstname} {getAge(userList[count].birthday)}
                                </Text>

                                <View>
                                    <Text>
                                        {userList[count].bio}
                                    </Text>
                                </View>
                                <View>
                                    {userList[count].interet.map((interet) => {
                                        return (
                                            <View key={interet}>
                                                <Text>{interet}</Text>
                                            </View>
                                        )
                                    })}
                                </View>

                                {userList[count].question.map((question) => {
                                    return (
                                        <View key={question.name}>
                                            <View>
                                                <Text>{question.name}</Text>
                                            </View>
                                            <View>
                                                <Text>{question.reponse}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </Animated.View>
                        </GestureRecognizer>
                    </View>
                </View>
                <Text>{count}</Text>
                <View>
                    <View>
                        <Button onPress={() => setCount(count + like(count, "dislike", userList))} title="Dislike" />
                        <Button onPress={() => setCount(count + like(count, "like", userList))} title="Like" />
                    </View>
                </View>
            </View>
        )
    }
}





function like(nb, typeOfLike, userList) {

    //blockage du bruteforce 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "authorization": getStorage("token") },
        body: JSON.stringify({ user_id: getStorage("userId"), target_id: userList[nb].user_id, type: typeOfLike })
    };
    console.log(requestOptions)
    fetch('http://localhost:3001/api/match/' + getStorage("userId"), requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();


        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    return 1;
}

const getStorage = (token) => {
  AsyncStorage.getItem(token).then((token) => {
    return token;
  })
}




function getAge(birthday) {

    birthday = new Date(birthday)

    let now = new Date()

    var month_diff = (now.getTime() - birthday.getTime())
    //convert the calculated difference in date format  
    var age_dt = new Date(month_diff);
    //extract year from date      
    var year = age_dt.getUTCFullYear();
    //now calculate the age of the user  
    var user_age = Math.abs(year - 1970);

    return user_age
}