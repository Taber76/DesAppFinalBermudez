import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";

import { styles } from "./styles";

const ProductItem = ({ item, onSelected }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerTouchable} onPress={() => onSelected(item)}>
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
      </TouchableOpacity>
    </View>
  );
};

export default ProductItem;
