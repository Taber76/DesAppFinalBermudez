import { StyleSheet, Platform } from "react-native";

import { COLORS } from "../../constants/index";

export const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 3,
  },
});
