import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const ViewCustom =  styled.View`
    background-color: ${props => props.theme.background};
    width: 100%;
`