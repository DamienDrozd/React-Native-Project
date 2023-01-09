import React from "react";
import { useTranslation } from "react-i18next";
import {ViewAuth, ButtonAuth, ButtonAuthText, Title, MainText} from './styles';
import Logo from "../../components/Logo";




const Auth = ({ navigation }) => { 
    const { t } = useTranslation();
    
    return (
        <>
            <ViewAuth>
                <Logo />
                <Title>
                    {t("Auth.title")}
                </Title>
                <MainText>
                    {t("Auth.main_text")}
                </MainText>
            </ViewAuth>
            <ViewAuth>
                <ButtonAuth onPress={() => navigation.navigate('Login')} >
                    <ButtonAuthText>
                        {t("Auth.login")}
                    </ButtonAuthText>
                </ButtonAuth>
                <ButtonAuth title={t("Auth.register")} onPress={() => navigation.navigate('Register')} >
                    <ButtonAuthText>
                        {t("Auth.register")}
                    </ButtonAuthText>
                </ButtonAuth>
            </ViewAuth> 
        </>
    );
} 



 

export default Auth; 