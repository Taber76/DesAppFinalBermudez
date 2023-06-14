import React from "react";

import { View, Text, TouchableOpacity, Image } from "react-native";

import { styles } from "./styles";

const StoreItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>*********</Text>
        <Text style={styles.subtitle}>ABIERTO</Text>
        <Text style={styles.subtitle}>{item.categorie}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default StoreItem;
