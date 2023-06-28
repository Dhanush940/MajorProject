import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React, { useState } from "react";

import pattern from "../assets/pattern1.jpg";

import { button1 } from "../styles/button";
import {
  errormessage,
  formgroup,
  head1,
  head2,
  input,
  label,
  link,
  link2,
} from "../styles/form";

const Login = ({ navigation }) => {
  const [fdata, setFdata] = useState({
    email: "",
    password: "",
  });

  const [errormsg, setErrormsg] = useState(null);

  const Sendtobackend = () => {
    // console.log(fdata);
    if (fdata.email == "" || fdata.password == "") {
      setErrormsg("All fields are required");
      return;
    } else {
      fetch("http://10.0.2.2:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fdata),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.error) {
            setErrormsg(data.error);
          } else {
            alert("logged successfully");
            navigation.navigate("Home");
          }
        });
    }
  };
  return (
    <View style={styles.container}>
      <Image style={styles.patternbg} source={pattern} />

      <View style={styles.container1}>
        <View style={styles.s1}>
          <Text
            style={styles.h1}
            onPress={() => navigation.navigate("Welcome")}
          >
            Quiz Application
          </Text>
        </View>

        <View style={styles.s2}>
          <Text style={head1}>Login</Text>
          <Text style={head2}>Sign in to continue</Text>
          {errormsg ? <Text style={errormessage}>{errormsg}</Text> : null}
          <View style={formgroup}>
            <Text style={label}>Email</Text>
            <TextInput
              style={input}
              placeholder="Enter your email"
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, email: text })}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>Password</Text>
            <TextInput
              style={input}
              placeholder="Enter your password"
              secureTextEntry={true}
              onChangeText={(text) => setFdata({ ...fdata, password: text })}
              onPressIn={() => setErrormsg(null)}
            />
          </View>
          {/* <View style={styles.fp}>
            <Text style={link}>Forgot Password?</Text>
          </View> */}
          <Text style={button1} onPress={() => Sendtobackend()}>
            Login
          </Text>
          {/* <Text style={button1} onPress={() => navigation.navigate("Home")}>
            Login
          </Text> */}
          <Text style={link2}>
            Don't have an account?&nbsp;
            <Text style={link} onPress={() => navigation.navigate("Signup")}>
              Create a new account
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
  patternbg: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    // resizeMode: "contain",
  },
  container1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  s1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
  },
  small1: {
    color: "#fff",
    fontSize: 17,
  },
  h1: {
    fontSize: 30,
    color: "#fff",
  },
  s2: {
    display: "flex",
    backgroundColor: "#fff",
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  formgroup: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginVertical: 10,
  },
  label: {
    fontSize: 17,
    color: "#000",
    marginLeft: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#39cedb",
    borderRadius: 20,
    padding: 10,
  },
  fp: {
    display: "flex",
    alignItems: "flex-end",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  logo: {
    height: 80,
    resizeMode: "contain",
  },
});
