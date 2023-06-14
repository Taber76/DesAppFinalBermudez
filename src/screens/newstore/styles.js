import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/index";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  content: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  title: {
    fontFamily: "Rubik-Bold",
    fontSize: 18,
  },
  input: {
    height: 50,
    fontFamily: "Rubik-Regular",
    fontSize: 20,
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.primary,
  },
  text: {
    fontFamily: "Rubik-Regular",
    fontSize: 20,
  },
  picker: {
    width: "100%",
    height: 40,
    fontFamily: "Rubik-Regular",
    fontSize: 20,
    marginBottom: 10,
    backgroundColor: COLORS.primary,
  },
  pickerItem: {
    fontSize: 20,
    color: "black",
    backgroundColor: "black",
  },
  pickerDropdown: {
    marginTop: 2,
    backgroundColor: "black",
    borderRadius: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: COLORS.text,
    textAlign: "center",
    fontWeight: "bold",
  },
});
