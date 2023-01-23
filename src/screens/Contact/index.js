import React, { useState, useEffect } from "react";
import { GetContactList } from "../../functions/api_request";

import { ContactView, Button_Contact, Button_Contact_Text, ContactTitle, Container, NewMatchTitle, NewMatchView, Button_Contact_Sub_Text, Button_New_Contact, Button_New_Contact_Text } from './styles';
import Loading from "../../components/loading";

 
const Contact = ({navigation}) => {
    const [contactList, setContactList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetContactList().then(list => {
            if (list != undefined) {
                setContactList(list);
                setLoading(false);
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
            
            <NewMatchTitle>Nouveaux matchs</NewMatchTitle>
            <NewMatchView>
                {contactList.map((contact) => {
                    if (contact.last_message_content == undefined) {
                        return(
                                <Button_New_Contact onPress={() => {
                                    navigation.navigate('Chat', {conversation : contact})
                                }}>
                                    <Button_New_Contact_Text>{contact.members[0].firstName}</Button_New_Contact_Text>
                                </Button_New_Contact>
                        )
                    }
                })}
            </NewMatchView>
            <ContactTitle>Contacts</ContactTitle>
            {contactList.map((contact) => {
                if (contact.last_message_content != undefined) {
                    return(
                        <Container key={contact.id}>
                            <Button_Contact onPress={() => {
                                navigation.navigate('Chat', {contact : contact})
                            }}>
                                <Button_Contact_Text>{contact.firstName}</Button_Contact_Text>
                                <Button_Contact_Sub_Text>{contact.last_message_content}</Button_Contact_Sub_Text>
                                <Button_Contact_Sub_Text>{contact.updatedAt}</Button_Contact_Sub_Text>
                            </Button_Contact>
                        </Container>
                    )
                }
            })}
        </ContactView>
    );
}

export default Contact;
