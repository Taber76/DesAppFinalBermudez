import React from "react";
import { View, Text, Image } from "react-native";

import { Head } from "../../components/index";
import { styles } from "./styles";

const Home = () => {
  return (
    <View>
      <Head />
      <View style={styles.container}>
        <Image style={styles.image} source={require("../../../assets/splash.png")} />
      </View>
    </View>
  );
};

export default Home;
