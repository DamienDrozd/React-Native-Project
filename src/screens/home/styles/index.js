import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const HomeSwiperView =  styled.View`
    display: flex;
    /* align-items: center; */
    /* justify-content: center; */
    /* width: 100%; */
    height: 100%
    background-color: ${props => props.theme.background};
`

export const TitleView =  styled.View`
    align-items: center;
    position: absolute;
    background-color: ${props => props.theme.primary};
    width: 100%;
    height: 50%;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
`

export const TitleText = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.background};
    margin: 5%;
`

