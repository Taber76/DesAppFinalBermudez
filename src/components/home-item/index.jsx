import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { View, TouchableOpacity, Text, Image } from "react-native";

import { styles } from "./styles";

const HomeItem = ({ item, onRemove }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={{ uri: item.image }} />
      </View>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => onRemove(item)}>
        <MaterialCommunityIcons name="close" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeItem;
