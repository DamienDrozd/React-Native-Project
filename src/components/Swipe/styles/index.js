import { StyleSheet, Dimensions } from "react-native";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
    cardSwipe: {
        flex: 1,
        alignItems: "center",
    }
});