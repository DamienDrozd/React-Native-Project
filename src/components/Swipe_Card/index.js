import React, { useState } from "react";
import { View, Text } from "react-native";
import {HomeCard, Name, Biography, BiographyText, InteretBox, InteretView} from './styles';




const Swipe_Card = (props) => { 

    const [User, setUser] = useState(props.User)

    const getAge = (birthday) => {
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

    


    return (
        <HomeCard>
            <Name>
                {User.firstname} {getAge(User.birthday)}
            </Name>

            <Biography>
                <BiographyText>
                    {User.bio}
                </BiographyText>
            </Biography>
            <InteretView>
                {User.interet?.map((interet) => {
                    return (
                        <InteretBox key={interet.name}>
                            <BiographyText>{interet.name}</BiographyText>
                        </InteretBox>
                    )
                })}
            </InteretView>

            {User.question?.map((question) => {
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
        </HomeCard >
    );
    }

 
 

export default Swipe_Card; 