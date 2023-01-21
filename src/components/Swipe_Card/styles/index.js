import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const HomeCard =  styled.View`
    background-color: white;
    border-radius: 20px;
    width: 90%;
    margin: 5%;
    padding: 5%;
`

export const Name = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.primary};
`

export const Biography = styled.View`
    background-color: ${props => props.theme.background};
    border-radius: 20px;
`

export const BiographyText = styled.Text`
    font-size: 15px;
    color: ${props => props.theme.background};
    margin: 5%;
`

export const InteretBox = styled.Text`
    background-color: ${props => props.theme.primary};
    border-radius: 30px;
    /* width: 20%; */
    margin: 2%;
    padding: 5%;
    height: 50px;
`

export const InteretView = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    /* width: 100%; */
    /* display: block; */
    /* display:inline; */
`