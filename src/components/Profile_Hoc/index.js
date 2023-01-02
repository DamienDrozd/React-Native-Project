import React from "react";
import { View, Text } from "react-native";

const NewHoc = ({ children }) => {
  return (
    <View>
      <Text>Profile HOC</Text>
      {children} 
    </View>
  );
};

export default NewHoc;