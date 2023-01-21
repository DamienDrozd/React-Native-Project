import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";
import { ViewCustom, ButtonOrange, ButtonOrangeText, HeaderText, MainText, Link, FieldInput, PasswordInput, Header, Spacer } from './styles';

import { loginRequest } from "../../functions/api_request";



const Login = ({ navigation }) => { 
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            if (token) {
                navigation.navigate('Auth')
            }
        })
    }, []);


    const log = () => {
        const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if ( !email.toLowerCase().match(email_regex)) {
            alert("erreur de saisie");
        } else {
            loginRequest(email, password, navigation);
        }
    }
    

    return (
        <>
            <Header>
                <HeaderText> 
                    {t("login.title")} 
                </HeaderText> 
            </Header>
            <ViewCustom>
                <Spacer />
                <MainText>
                    {t("login.email")}
                </MainText>
                <FieldInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                    autoComplete="email"
                />


                <MainText>
                    {t("login.password")}
                </MainText>
                <PasswordInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    autoComplete="password"
                />
                <ButtonOrange title={t("login.button_login")} onPress={() => log()}>
                    <ButtonOrangeText>
                        {t("login.button_login")}
                    </ButtonOrangeText>
                </ButtonOrange>

                <MainText>{t("login.no_account")}</MainText>
                
                <Link onPress={() => navigation.navigate('Register')} >
                    {t("login.button_register")}
                </Link>
            </ViewCustom >
        </>
    );
}


 

export default Login; 