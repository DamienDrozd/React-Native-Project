import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text} from "react-native";
import styled from 'styled-components/native';
import axios from 'axios';
// import md5 from "react-native-md5";
import md5 from 'md5';






const Characters = () => { 
    const [characters, setCharacters] = useState([]);

    const privateKey = "4ac2e191a1cd6d16af69900436a9ea2a2920fe0b"
    const publicKey = "d8b110374a0d099a4413234c898e8385"



    useEffect(() => {
        axios({
                method: 'GET',
                url: 'https://gateway.marvel.com:443/v1/public/characters',
                params: {
                    ts: 1,
                    apikey: publicKey,
                    hash: md5("1"+privateKey+publicKey)
                },
            }).then(response => {
                console.log(response.data["results"]);
                setCharacters(response.data["results"])
            })
            .catch(error => {
                console.log(error)
            })

    }, []);


    return (
        <View>
            <Text>{characters}</Text>
        </View >
    );
    }
 

export default Characters; 