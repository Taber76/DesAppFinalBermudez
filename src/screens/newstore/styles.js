import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/index";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontFamily: "Rubik-Bold",
    fontSize: 18,
  },
  scrollContainer: {
    flexGrow: 1,
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
  imageContainer: {
    marginBottom: 2,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "cover",
  },
  buttonSelect: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
