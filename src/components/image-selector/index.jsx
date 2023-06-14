import { View, TouchableOpacity, Text, Image, Alert } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { COLORS } from "../../constants/index";
import { styles } from "./styles";

export const ImageSelector = ({ onImage }) => {
  const [pickedUrl, setPickedUrl] = useState(null);

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
      setPickedUrl(asset.uri);
      onImage(asset.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {!pickedUrl ? (
          <Text style={styles.noImageText}>No hay imagen seleccionada</Text>
        ) : (
          <Image source={{ uri: pickedUrl }} style={styles.image} />
        )}
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: COLORS.primary }]}
        onPress={onHandleTakeImage}>
        <Text style={styles.buttonText}>TOMAR FOTO</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageSelector;
