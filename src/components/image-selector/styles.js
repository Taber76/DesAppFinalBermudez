import { StyleSheet } from "react-native";

import { COLORS } from "../../constants/index";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  imageContainer: {
    marginBottom: 10,
  },
  image: {
    width: 400,
    height: 200,
    resizeMode: "cover",
  },
  button: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.text,
    fontFamily: "Rubik-Regular",
  },
});
