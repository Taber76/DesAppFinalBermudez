import { View, TouchableOpacity, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { COLORS } from "../../constants/index";
import { styles } from "./styles";

export const ImageSelector = ({ onImage }) => {
  const verifyPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant media library permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const onHandleSelectImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;
    const image = await ImagePicker.launchImageLibraryAsync({
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
      onPress={onHandleSelectImage}>
      <Text style={styles.buttonText}>SELECCIONAR FOTO</Text>
    </TouchableOpacity>
  );
};

export default ImageSelector;
