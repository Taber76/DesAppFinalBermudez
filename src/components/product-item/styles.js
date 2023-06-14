import { StyleSheet } from "react-native";

import { COLORS } from "../../constants/index";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 220,
    borderRadius: 5,
    margin: 10,
  },

  containerTouchable: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 10,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,

    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  image: {
    borderRadius: 5,
    height: 100,
    width: 380,
  },

  name: {
    textAlign: "center",
    fontFamily: "Rubik-Bold",
    fontSize: 20,
    color: COLORS.text,
  },

  description: {
    fontFamily: "Rubik-Regular",
    fontSize: 10,
    color: COLORS.text,
  },

  price: {
    fontFamily: "Rubik-Bold",
    fontSize: 20,
    color: COLORS.text,
  },
});
