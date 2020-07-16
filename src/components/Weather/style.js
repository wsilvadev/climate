import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  addressText: {
    fontSize: 10,
    color: "white",
    paddingLeft: 30,
    lineHeight: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    fontSize: 23,
    color: "white",
  },
  weatherContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 40,
  },
  tempText: {
    fontSize: 72,
    color: "#fff",
  },
  bodyContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 60,
    color: "#fff",
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
  },
});

export default styles;
