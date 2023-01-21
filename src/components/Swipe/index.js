import React, { useState } from "react";
import { Card } from 'react-native-card-stack-swiper';
import {Text, Image} from "react-native";
import Swipe_Card from "../Swipe_Card";
import {sendSwipe} from "../../functions/api_request"



// import SVG from "./styles/cross.svg"


import {CustomView, ButtonStack, CardStackView, Button, Icon} from "./styles";





const Swipe = (props) => { 

    const [userList, setUserList] = useState(props.userList);



    if (userList !== undefined) { 
        return (
            <>
                <CustomView>
                    <CardStackView
                        loop={true}
                        verticalSwipe={false}
                        renderNoMoreCards={() => null}
                        ref={swiper => (this.swiper = swiper)}                    
                    >
                        {userList.map((user, index) => (
                            <Card 
                                onSwipedLeft={() => {sendSwipe(user, "dislike")}}
                                onSwipedRight={() => {sendSwipe(user, "like")}}
                                key={index} 
                                user={user}
                            >
                                <Swipe_Card 
                                    User={user} 
                                />
                            </Card>
                        ))}
                    </CardStackView> 
                </CustomView>
                <ButtonStack>
                    <Button onPress={() => {
                        this.swiper.swipeLeft();
                    }}> 
                        <Icon
                            source={require('./styles/cross.png')}
                        />
                    </Button>
                    <Button onPress={() => {
                        this.swiper.swipeRight();
                    }}> 
                        <Icon
                            source={require('./styles/heart.png')}
                        />
                    </Button >
                </ButtonStack>
            </>
            );
    }
}

 

export default Swipe; 