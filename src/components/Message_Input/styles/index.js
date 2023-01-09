import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const ViewCustom =  styled.View`
    flex-direction: row;
    /* position : absolute; */
    bottom : 0;
    /* width: ${DIMENSION_WIDTH}px; */
    /* height: 10%; */
    flex: 1;
`

export const FieldInput = styled.TextInput`
    width: 70%;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.primary};
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
`

export const MessageButton = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.background};
`
export const MessageButtonText = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.background};
    align-self: center;
`;