import { View, TouchableOpacity, Text, Image, Alert } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { COLORS } from "../../constants/index";
import { styles } from "./styles";

export const ImageTake = ({ onImage }) => {
  const verifyPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant camera permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const onHandleTakeImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });
    if (!image.canceled) {
      const asset = image.assets[0];
      onImage(asset.uri);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: COLORS.primary }]}
      onPress={onHandleTakeImage}>
      <Text style={styles.buttonText}>TOMAR FOTO</Text>
    </TouchableOpacity>
  );
};

export default ImageTake;
