import React, { useState, useEffect } from "react";
import { View } from "react-native";
import CardStack, { Card } from 'react-native-card-stack-swiper';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipe_Card from "../Swipe_Card";





const Swipe = (props) => { 

    const [userList, setUserList] = useState(props.userList);

    const like = (user, typeOfLike) => {
    //blockage du bruteforce 
        console.log("like : " + typeOfLike);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "authorization": getStorage("token") },
            body: JSON.stringify({ user_id: getStorage("userId"), target_id: user.user_id, type: typeOfLike })
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
    }



    if (userList !== undefined) { 
        return (
            <View>
                <CardStack
                    loop={true}
                    verticalSwipe={false}
                    renderNoMoreCards={() => null}
                    style = {styles.cardSwipe}
                    ref={swiper => (this.swiper = swiper)}                    
                >
                    {userList.map((user, index) => (
                        <Card 
                            onSwipedLeft={() => {like(user, "dislike")}}
                            onSwipedRight={() => {like(user, "like")}}
                            key={index} 
                            user={user}
                        >
                            <Swipe_Card 
                                User={user} 
                            />
                        </Card>
                    ))}
                </CardStack> 
            </View>
        );
    }
}

const getStorage = (token) => {
  AsyncStorage.getItem(token).then((token) => {
    return token;
  })
}
 

export default Swipe; 