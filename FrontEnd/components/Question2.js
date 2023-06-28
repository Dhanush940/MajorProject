import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
// import { ProgressBar } from "@react-native-community/progress-bar-android";
import CheckBox from "expo-checkbox";
import React, { useState } from "react";
import data from "../DB/Data";
import Response from "../DB/Response";
import styles from "../styles/style";
import Answers from "../DB/Answers";
import { useNavigation } from "@react-navigation/native";
import * as Speech from "expo-speech";
import { NativeEventEmitter, NativeModules } from "react-native";
// let partialResults = [...Response];
const Question1 = () => {
  const navigator = useNavigation();
  const [number, setNumber] = useState(0);
  const [checked, setChecked] = useState(0);
  const [answer, setAnswers] = useState([]);

  const { AlanEventEmitter } = NativeModules;
  const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

  // React.useEffect(() => {
  //   alanEventEmitter.addListener("onCommand", (data) => {
  //     if (data.command === "nextQuestion") {
  //       changeQuestionFront();
  //       console.log("Next question is from this");
  //     } else if (data.command === "previousQuestion") {
  //       changeQuestionBack();
  //       console.log("Previous question is from this");
  //     }
  //   });
  // });

  React.useEffect(() => {
    alanEventEmitter.addListener("onCommand", (info) => {
      if (info.command === "nextQuestion") {
        if (number <= data.length - 1) {
          setNumber(number + 1);
          // changeQuestionFront();
          console.log("Next Question is :");
          return;
        }
      } else if (info.command === "previousQuestion") {
        if (number > 0) {
          setNumber(number - 1);
          console.log("Previous Question is :");
          return;
        }
      } else if (info.command === "first") {
        Response[number][1] = true;
        Response[number][2] = false;
        Response[number][3] = false;
        Response[number][4] = false;
        Response[number].selected = 1;
        Response[number].chose = true;
        setChecked(checked + 1);
      } else if (info.command === "second") {
        Response[number][1] = false;
        Response[number][2] = true;
        Response[number][3] = false;
        Response[number][4] = false;
        Response[number].selected = 2;
        Response[number].chose = true;
        setChecked(checked + 1);
      } else if (info.command === "third") {
        Response[number][1] = false;
        Response[number][2] = false;
        Response[number][3] = true;
        Response[number][4] = false;
        Response[number].selected = 3;
        Response[number].chose = true;
        setChecked(checked + 1);
      } else if (info.command === "fourth") {
        Response[number][2] = false;
        Response[number][3] = false;
        Response[number][4] = true;
        Response[number][1] = false;
        Response[number].selected = 4;
        Response[number].chose = true;
        setChecked(checked + 1);
      } else if (info.command === "submit") {
        handleSubmit();
      }
    });
  });
  // partialResults = [...Response];
  // for (let i = 0; i < partialResults.length; i++) {
  //   console.log("Value stored in partial results", partialResults[i][1]);
  // }

  // for (let i = 0; i < partialResults.length; i++) {
  //   console.log("Value stored in Response", Response[i][1]);
  // }

  const changeQuestionFront = () => {
    if (number >= data.length - 1) {
      setNumber(0);
      return;
    }
    setNumber((preState) => preState + 1);
    // console.log(number);
    // console.log(data[number]);
  };
  const changeQuestionBack = () => {
    if (number == 0) return;
    setNumber((preState) => preState - 1);
    // console.log(number);
    // console.log(data[number]);
  };

  const updateOption = (id, number) => {
    if (Response[number].chose != true) {
      Response[number][id] = true;
      Response[number].chose = true;
      Response[number].selected = id;
      Speech.speak(`You have selected ${data[number][id]} `, {
        language: "en",
      });
      // console.log(answer);
      // console.log((Response[number].selected = id));
    } else if (
      Response[number].chose == true &&
      Response[number].selected === id
    ) {
      // !Response[number][id]
      Response[number][id] = false;
      Response[number].chose = false;
      Response[number].selected = null;
      Speech.speak(`You have de-selected ${data[number][id]}`);
    } else {
      Alert.alert("Can't Perform This Action ", "Choose Only One Option.", [
        {
          text: "OK",
          onPress: () => {
            return;
          },
        },
      ]);
      Speech.speak("Choose only one option", { language: "en" });
    }

    setChecked((prevState) => prevState + 1);

    // console.log(typeof number);
  };

  const handleSubmit = () => {
    let count = 0;
    for (let i = 0; i < Response.length; i++) {
      if (Response[i].chose === true && Response[i].selected === Answers[i]) {
        count++;
        // Response[i][Response[i].selected] = false;
        // console.log(typeof Response[i].selected);
      }
    }
    console.log(count, "Answers are correct");
    for (let i = 0; i < Response.length; i++) {
      Response[i][1] = false;
      Response[i][2] = false;
      Response[i][3] = false;
      Response[i][4] = false;
      Response[i].chose = false;
      Response[i].selected = null;
      // console.log("Question :", i);
    }
    navigator.navigate("End", { correct: count });
    setChecked((prevState) => prevState + 1);
    // setNumber(0);

    return;
  };

  React.useEffect(() => {
    Speech.stop();
    Speech.speak(data[number].question);
    Speech.speak(data[number][1]);
    Speech.speak(data[number][2]);
    Speech.speak(data[number][3]);
    Speech.speak(data[number][4]);
  }, [number]);
  return (
    <View
      style={[
        {
          flex: 0.8,
          backgroundColor: "white",
          width: 300,
          borderRadius: 5,
        },
        createStyle.shadow,
      ]}
    >
      <Text style={{ paddingTop: 15, marginLeft: 10, fontSize: 20 }}>
        {number + 1}){data[number].question}
      </Text>

      <View>
        {/* {
       findItem=data.find((item,index) =>index===number)
       } */}
        <View>
          <View style={createStyle.direction}>
            <CheckBox
              value={Response[number][1]}
              style={createStyle.radioButton}
              onValueChange={() => {
                // console.log(key);
                updateOption(1, number);
              }}
            />
            <Text style={createStyle.text}>{data[number][1]}</Text>
          </View>
          <View style={createStyle.direction}>
            <CheckBox
              value={Response[number][2]}
              style={createStyle.radioButton}
              onValueChange={() => {
                updateOption(2, number);
              }}
            />
            <Text style={createStyle.text}>{data[number][2]}</Text>
          </View>
          <View style={createStyle.direction}>
            <CheckBox
              value={Response[number][3]}
              style={createStyle.radioButton}
              onValueChange={() => {
                updateOption(3, number);
              }}
            />
            <Text style={createStyle.text}>{data[number][3]}</Text>
          </View>
          <View style={createStyle.direction}>
            <CheckBox
              value={Response[number][4]}
              style={createStyle.radioButton}
              onValueChange={() => {
                updateOption(4, number);
              }}
            />
            <Text style={createStyle.text}>{data[number][4]}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          width: 300,
          alignItems: "center",
        }}
      >
        <Pressable style={styles.button} onPress={changeQuestionFront}>
          <Text style={styles.text}>Next</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={changeQuestionBack}>
          <Text style={styles.text}>Back</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.text}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

const createStyle = StyleSheet.create({
  direction: {
    flexDirection: "row",
    margin: 10,
    padding: 5,
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 20,
  },
  radioButton: {
    borderRadius: 11,
    width: 22,
    height: 22,
  },
});

export default Question1;
