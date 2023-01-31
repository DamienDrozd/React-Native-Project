import React, { useState } from "react";
import { View, Text } from "react-native";
import {HomeCard, Name, Biography, BiographyText, InteretBox, InteretView, InteretText, QuestionText, ResponseText} from './styles';




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
                {User.firstName} {getAge(User.birthday)}
            </Name>

            <Biography>
                <BiographyText>
                    {User.biographie}
                </BiographyText>
            </Biography>
            <InteretView>
                {User.interests?.map((interet) => {
                    return (
                        <InteretBox key={interet._id}>
                            <InteretText>{interet.name}</InteretText>
                        </InteretBox>
                    )
                })}
            </InteretView>

            {User.questions?.map((question) => {
                return (
                    <View key={question._id}>
                        <View>
                            <QuestionText>{question.question?.question}</QuestionText>
                        </View>
                        <View>
                            <ResponseText>{question.answer}</ResponseText>
                        </View>
                    </View>
                ) 
            })}
        </HomeCard >
    );
    }

 
 

export default Swipe_Card; 