import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const ContactView =  styled.View`
    flex: 1;
    align-items: center;
    /* justify-content: center; */
    background-color: ${props => props.theme.background};
`

export const Button_Contact = styled.TouchableOpacity`
    height: 75px;
    border-style: solid;
    border-color: ${props => props.theme.sub_text};
    border-width: 1px;
    /* margin: 10px; */
    background-color: ${props => props.theme.background};
`
export const Button_Contact_Text = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.text};
    /* align-self: center; */
    padding-top: 10px;
    margin-left: 50px;
`

export const Button_Contact_Sub_Text = styled.Text`
    font-size: 15px;
    color: ${props => props.theme.sub_text};
    margin-left: 50px;
`

export const Container = styled.View`
    width: 110%;
`

export const ContactTitle = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.primary};
    padding-top: 10px;
    padding-bottom: 10px;
`

export const NewMatchTitle = styled.Text`   
    font-size: 20px;
    color: ${props => props.theme.primary};
    /* align-self: center; */
    padding-top: 10px;
`

export const NewMatchView = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    /* align-items: center; */
    justify-content: space-around;
    height: 100px;
`