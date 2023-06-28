import { View, SafeAreaView, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/style";
// import Question from "../components/Question";
import Question1 from "../components/Question1";
const Start = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fc77a6",
      }}
    >
      <Question1></Question1>
    </SafeAreaView>
  );
};

export default Start;
// #FFB0CC
