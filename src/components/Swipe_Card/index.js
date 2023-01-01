import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from './styles';




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
        <View style = {styles.container}>
            <Text>
                {User.firstname} {getAge(User.birthday)}
            </Text>

            <View>
                <Text>
                    {User.bio}
                </Text>
            </View>
            <View>
                {User.interet.map((interet) => {
                    return (
                        <View key={interet}>
                            <Text>{interet}</Text>
                        </View>
                    )
                })}
            </View>

            {User.question.map((question) => {
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
        </View >
    );
    }

 
 

export default Swipe_Card; 