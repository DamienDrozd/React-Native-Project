import React, { useState } from "react";
import CardStack, { Card } from 'react-native-card-stack-swiper';
import styles from './styles';
import Swipe_Card from "../Swipe_Card";
import {sendSwipe} from "../../functions/api_request"





const Swipe = (props) => { 

    const [userList, setUserList] = useState(props.userList);

    const like = (user, typeOfLike) => {
        sendSwipe(user, typeOfLike)
    }



    if (userList !== undefined) { 
        return (
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
        );
    }
}

 

export default Swipe; 