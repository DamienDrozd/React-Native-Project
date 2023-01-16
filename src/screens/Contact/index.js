import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, SafeAreaView, Button } from "react-native";
import { GetContactList } from "../../functions/api_request";


 
export default function Contact({navigation}) {
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
        <SafeAreaView>
            <ActivityIndicator />
        </SafeAreaView>
        );
    }

    return (
        <View className="message-app">
            {contactList.map((contact) => (
                <View className="contact" key={contact.contact_id}>
                    <Text>{contact.firstname}</Text>
                    <Button  title={contact.firstname} onPress={() => {
                        navigation.navigate('Chat', {contact : contact})
                    }}/>
                </View>
            ))}
        </View>
    );
}


