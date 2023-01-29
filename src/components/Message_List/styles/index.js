import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const UserMewssage = styled.View`
    background-color: ${props => props.theme.primary};
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    align-self: flex-end;
    max-width: 70%;
    right: 0px;
    
`


export const UserMewssageText = styled.Text`
    font-size: 10px;
    color: ${props => props.theme.background};
    text-align: right;
`

export const ContactMessage = styled.View`
    background-color: ${props => props.theme.white};
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    align-self: flex-start;
    max-width: 70%;
    right: 0px;
`

export const ContactMessageText = styled.Text`
    font-size: 10px;
    color: ${props => props.theme.background};
    text-align: left;
`

export const CustomFlatList = styled.View`
    /* background-color: ${props => props.theme.background}; */
    bottom: 50px;
    /* border-radius: 5px; */
    /* word-wrap:break-word; */
    padding: 10px;
    /* margin: 10px 0; */
    flex-direction: column;
    
    /* flex-grow: 1; */
    /* min-width: 120px; */
    /* width: 100%; */
    height: 88%;
    background-color: ${props => props.theme.background};
`