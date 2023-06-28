import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fc77a6",
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flex: 0.7,
    backgroundColor: "white",
    width: 350,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  image: {
    width: 60,
    height: 60,
  },
  button: {
    padding: 15,
    margin: 10,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff2b77",
    width: 130,
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});

export default styles;
