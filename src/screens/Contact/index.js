import React, { useState, useEffect } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { GetContactList } from "../../functions/api_request";

import { ContactView, Button_Contact, Button_Contact_Text, ContactTitle, Container, NewMatchTitle, NewMatchView, Button_Contact_Sub_Text } from './styles';
import Loading from "../../components/loading";

 
const Contact = ({navigation}) => {
    const [contactList, setContactList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetContactList().then(list => {
            if (list != undefined) {
                setContactList(list);
                setLoading(false);
            } else {
                navigation.navigate('Public');
            }
        })
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <ContactView className="message-app">
            {/* <NewMatchView>
                <NewMatchTitle>Nouveaux matchs</NewMatchTitle>
            </NewMatchView> */}
            <ContactTitle>Contacts</ContactTitle>
            {contactList.map((contact) => (
                <Container key={contact.id}>
                    <Button_Contact onPress={() => {
                        navigation.navigate('Chat', {contact : contact})
                    }}>
                        <Button_Contact_Text>{contact.firstname}</Button_Contact_Text>
                        <Button_Contact_Sub_Text>last message appear here</Button_Contact_Sub_Text>
                    </Button_Contact>
                </Container>
            ))}
        </ContactView>
    );
}

export default Contact;
