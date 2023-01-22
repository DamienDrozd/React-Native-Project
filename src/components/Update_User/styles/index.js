import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const NavigatorView =  styled.View`
    flex-direction: row;
    /* flex-wrap: wrap; */
    width: 100%;
    /* display: flex; */
    /* flex: 1; */
    align-items: center;
    justify-content: space-around;
    position: absolute;
    bottom: 20px;
    background-color: ${props => props.theme.background};
`

export const Next_Button = styled.TouchableOpacity`
    width: 40%;
    /* height: 50px; */
    /* margin: 10px; */
    border-radius: 10px;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.background};
`
export const Next_Button_Text = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.background};
    align-self: center;
    /* padding-top: 10px; */
    margin: 10px;
`

export const Prev_Button = styled.TouchableOpacity`
    width: 40%;
    /* height: 50px; */
    margin: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.background};
`
export const Prev_Button_Text = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.background};
    align-self: center;
    /* padding-top: 10px; */
    margin: 10px;
`