import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";

const ButtonText = ({ text, width, height, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { width: width, height: height }]}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonText;
