import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/style";
import * as Speech from "expo-speech";
const End = ({ route }) => {
  const navigation = useNavigation();
  React.useEffect(() => {
    Speech.speak(`You scored ${route.params.correct} points out of 8`);
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fc77a6",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={[
          {
            flex: 0.5,
            backgroundColor: "white",
            borderRadius: 10,
            alignItems: "center",
            width: 300,
          },
          style.shadow,
        ]}
      >
        <Text style={{ margin: 20, fontSize: 25 }}>Quiz Finished</Text>
        <Text>Your Score: {route.params.correct}/8</Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("Start");
          }}
        >
          <Text style={styles.text}>Play Again</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.text}>Main Menu</Text>
        </Pressable>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  // pressable: {
  //   backgroundColor: "dodgerblue",
  //   width: 100,
  //   textAlign: "center",
  //   justifyContent: "center",
  // },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 20,
  },
});

export default End;
