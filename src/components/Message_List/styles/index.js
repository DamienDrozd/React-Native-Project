import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const UserMewssage = styled.View`
    background-color: ${props => props.theme.background};
    padding: 10px;
    align-items: flex-end;
    margin: 10px;
    flex-direction: column;
    display: flex;
    margin-left: 40%;
`


export const UserMewssageText = styled.Text`
    font-size: 10px;
    color: ${props => props.theme.text};
    text-align: right;
`

export const ContactMessage = styled.View`
    background-color: ${props => props.theme.primary};
    align-items: flex-start;
    padding: 10px;
    margin: 10px;
    flex-direction: column;
    display: flex;
    margin-right: 40%;
`

export const ContactMessageText = styled.Text`
    font-size: 10px;
    color: ${props => props.theme.background};
    text-align: left;
`

export const CustomFlatList = styled.FlatList`
    /* background-color: ${props => props.theme.background}; */
    border-radius: 5px;
    word-wrap:break-word;
    padding: 10px;
    margin: 10px 0;
    flex-direction: column;
    flex-grow: 1;
    min-width: 120px;
    width: 100%;
    height: 92%;
`