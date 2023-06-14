import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { styles } from "./styles";

const ButtonIcon = ({ icon, text, width, height, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { width: width, height: height }]}
      onPress={onPress}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonIcon;
