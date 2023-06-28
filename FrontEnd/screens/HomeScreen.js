import { View, Text, StyleSheet } from "react-native";
import { Image, Pressable } from "react-native";
import React from "react";
import styles from "../styles/style";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={[styles.center, styles1.shadow]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Image
            source={require("../assets/world.jpg")}
            style={styles.image}
          ></Image>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              marginLeft: 20,
              fontSize: 25,
              color: "#31d4c9",
            }}
          >
            Geography Quiz
          </Text>
        </View>
        <View
          style={{
            marginTop: 70,
            justifyContent: "space-evenly",
            flexDirection: "column",
            flex: 0.7,
            width: 250,
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate("Start");
            }}
            style={styles1.button}
          >
            <Text style={styles.text}>Start</Text>
          </Pressable>

          <Pressable style={styles1.button}>
            <Text style={styles.text}>About</Text>
          </Pressable>

          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={[styles1.button, { flex: 0.5 }]}
              onPress={() => {
                navigation.navigate("Welcome");
              }}
            >
              <Text style={styles.text}>Log out</Text>
            </Pressable>
            <Pressable style={[styles1.button, { flex: 0.5 }]}>
              <Text style={styles.text}></Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles1 = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 20,
  },
  button: {
    padding: 15,
    margin: 10,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff2b77",
    borderRadius: 5,
  },
});
export default HomeScreen;
