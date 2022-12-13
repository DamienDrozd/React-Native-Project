import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet} from "react-native";
import styled from 'styled-components/native';
import marvelLogo from "../../img/peel_logo.png";





const Logo = () => { 

    const ImageLogo = styled.Image`
        width: 50%;
        height: 50%;
        `;



    return (
        <View>
            {/* <ImageLogo source={marvelLogo}/> */}
            <ImageLogo source={marvelLogo} />
        </View >
    );
    }
 

export default Logo; 