import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text} from "react-native";
import DatePicker from 'react-native-date-picker'





const Date_Input = (props) => { 
    const [user, setUser] = useState(props.user);
    const type = props.type;

    return (
        <>
            <Text>{type}</Text>
            <DatePicker
                date={user[type]}
                onDateChange={(date) => {
                    var newUser = user;
                    newUser[type] = date;
                    setUser(newUser)
                }}
                mode = "date"
            />
        </>
    );
}
 

export default Date_Input; 