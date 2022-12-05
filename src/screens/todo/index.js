import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import axios from "axios";



const Todo = () => {
    const [todoList, setTodoList] = useState(["todo1", "todo2", "todo3"]);
    const [titleText, setTitleText] = useState("");


    const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    });


    return (
        <View>
            <Text>
                Enter TODO
            </Text>
            <TextInput
                style={styles.input}
                value={titleText}
                onChangeText={text => setTitleText(text)}
                placeholder="useless placeholder"
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={() => setTodoList([...todoList, titleText])}>
                <Text> 
                    add todo
                </Text>
            </TouchableOpacity>
            <View>
                {todoList.map((todo, index) => 
                    <>
                        <Text key={index}>
                            {todo}
                        </Text> 
                        <TouchableOpacity onPress={(index) => setTodoList(todoList.filter((todo) => todo !== index))}>
                            <Text> 
                                DELETE  
                            </Text>
                        </TouchableOpacity>
                    </>
                    )}
            </View>
        </View>
    );
}


export default Todo;