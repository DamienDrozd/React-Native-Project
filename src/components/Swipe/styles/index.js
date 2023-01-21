import { Dimensions } from "react-native";
import styled from 'styled-components/native';
import CardStack from "react-native-card-stack-swiper";


const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;



export const CustomView = styled.View`
    font-size: 20px;
    width: 100%;
    padding-top: 15%;
`



export const ButtonStack = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    position: absolute;
    bottom: 5%;
`

export const CardStackView = styled(CardStack)`
    width: 100%;
    height: 100%;
`



export const Button = styled.TouchableOpacity`
    background-color: white;
    border-radius: 30px;
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
`

export const Icon = styled.Image`
    width: 100%;
    height: 100%;

`