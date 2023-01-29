import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const HomeCard =  styled.View`
    background-color: white;
    border-radius: 20px;
    margin: 5%;
    padding: 5%;
    height: 100%;
    /* width: 80%; */
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
    color: ${props => props.theme.text};
    margin: 5%;
`

export const InteretBox = styled.Text`
    background-color: ${props => props.theme.primary};
    border-radius: 30px;
    margin: 2%;
    padding: 5%;
`

export const InteretText = styled.Text`
    font-size: 15px;
    color: ${props => props.theme.background};
`

export const QuestionText = styled.Text`
    font-size: 15px;
    color: ${props => props.theme.text};
    margin-left: 5%; 
    font-weight: bold;
`

export const ResponseText = styled.Text`
    font-size: 15px;
    color: ${props => props.theme.text};
    margin-left: 5%;
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