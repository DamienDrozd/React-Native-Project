import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const ViewCustom =  styled.View`
    flex-direction: row;
    background-color: ${props => props.theme.background};
    /* height: 200px; */
    /* background-color: ${props => props.theme.white}; */
    /* position : absolute; */
    bottom : 60px;
    /* width: ${DIMENSION_WIDTH}px; */
    /* height: 10%; */
    /* flex: 1; */
`

export const FieldInput = styled.TextInput`
    width: 80%;
    height: 40px;
    /* margin: 10px; */
    margin: 20px;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.primary};
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.text};
    flex: 1;
` 

export const MessageButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    margin: 20px;
    border-radius: 25px;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.background};
`
export const MessageButtonText = styled.Text`
    margin-top: 10px;
    font-size: 20px;
    color: ${props => props.theme.background};
    align-self: center;
`;

export const SendIcon = styled.Image `
    width: 20px;
    height: 20px;
    /* margin : 5px; */
    align-self: center;
    margin-top: 10px;
    margin-left: 5px;
`