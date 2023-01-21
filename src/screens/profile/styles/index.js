import { Dimensions } from "react-native";
import styled from 'styled-components/native';
import SwitchSelector from "react-native-switch-selector";
import DatePicker from 'react-native-date-picker'
import {Slider} from '@miblanchard/react-native-slider';
import ModalSelector from 'react-native-modal-selector'




const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const ViewCustom =  styled.View`
    flex: 1;
    /* align-items: center; */
    background-color: ${props => props.theme.background};
`

export const ButtonOrange = styled.TouchableOpacity`
    width: 70%;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.background};
`

export const ButtonOrangeText = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.background};
    align-self: center;
    padding-top: 10px;
`

export const InterestButton = styled.TouchableOpacity`
    width: 70%;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.background};
`

export const InterestButtonSelected = styled.TouchableOpacity`
    width: 70%;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    background-color: red;
    color: ${props => props.theme.background};
`

export const InterestButtonDisabled = styled.TouchableOpacity`
    width: 70%;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    background-color: grey;
    color: ${props => props.theme.background};
`

export const InterestButtonText = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.background};
    align-self: center;
    padding-top: 10px;
`

export const Spacer = styled.View`
    height: 100px;
`

export const Header = styled.View`
    width: ${DIMENSION_WIDTH}px;
    height: 100px;
    background-color: ${props => props.theme.primary};
    align-items: center;
    justify-content: center;
`

export const HeaderText = styled.Text`
    font-size: 30px;
    color: ${props => props.theme.background};
`

export const FieldInput = styled.TextInput`
    width: 70%;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
`

export const BioInput = styled.TextInput`
    width: 80%;
    height: 50%;
    margin: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
`

export const Title = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.primary};
`

export const MainText = styled.Text`
    font-size: 16px;
    color: ${props => props.theme.text};
`
 

export const SwitchSelectorCustom = styled(SwitchSelector)`
    width: 70%;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
`

export const DatePickerCustom = styled(DatePicker)`
    width: 100%;
    border-radius: 10px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
`

export const SliderCustom = styled(Slider)`
    width: 100%;
    border-radius: 10px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
`

export const ModalSelectorCustom = styled(ModalSelector)`
    width: 80%;
    border-radius: 10px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
`