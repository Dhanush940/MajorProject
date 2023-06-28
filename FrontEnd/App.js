import * as React from "react";
import { AppRegistry } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import * as RootNavigation from "./RootNavigation.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Start from "./screens/Start";
import End from "./screens/End";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Welcome from "./screens/Welcome";
import { AlanView } from "@alan-ai/alan-sdk-react-native";
import { useEffect } from "react";
import { NativeEventEmitter, NativeModules } from "react-native";
const Stack = createNativeStackNavigator();

export default function App() {
  const { AlanEventEmitter } = NativeModules;
  const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

  useEffect(() => {
    alanEventEmitter.addListener("onCommand", (data) => {
      if (data.command === "start") RootNavigation.navigate("Start");
      if (data.command === "logout") RootNavigation.navigate("Welcome");
    });
  });
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="End"
          component={End}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
      <AlanView
        projectid={
          "8b98922fb3a946a499590b14a21133ac2e956eca572e1d8b807a3e2338fdd0dc/stage"
        }
      />
    </NavigationContainer>
  );
}
