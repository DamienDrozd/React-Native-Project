import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const ViewCustom =  styled.SafeAreaView`
    flex-direction: row;
    /* position : absolute; */
    justify-content: center;
    bottom : 0;
    background-color: ${props => props.theme.background};
    /* width: ${DIMENSION_WIDTH}px; */
    /* height: 10%; */
    flex: 1;
`

export const CustomActivityIndicator = styled.ActivityIndicator`
    flex: 1;
    align-self: center;
    justify-content: center;
    color: ${props => props.theme.primary};
`

