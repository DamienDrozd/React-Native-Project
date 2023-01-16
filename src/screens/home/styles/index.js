import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const HomeSwiperView =  styled.View`
    background-color: white;
    display: flex;
    /* flex: 1; */
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%
`

