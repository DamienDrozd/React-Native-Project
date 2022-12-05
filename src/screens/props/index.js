import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import axios from "axios";

import Title from "../../components/Title";

const styles = StyleSheet.create({
    logo: {
        width: 66,
        height: 58,
    },
});


const Practice = () => {

    const [harryPotter, setHarryPotter] = useState([]);

    useEffect(() => {
        axios.get('https://hp-api.herokuapp.com/api/characters/students')
            .then(function (response) {
                console.log(response); 
                setHarryPotter(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    return (
        <View>
            <Title title="incroyable"/>
            <Title title="test"/>
            
                {harryPotter.map((character, index) =>
                    <View>
                        <Image style={styles.logo} source={{
                            uri: character.image
                        }} />
                        <Text >{character.name}</Text>
                        </View >
                )}
        </View>
    );
    }
 

export default Practice;