import React, { useState } from "react";

import { View, TextInput, TouchableOpacity, Image } from "react-native";

import { styles } from "./styles";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [showIcons, setShowIcons] = useState(true);

  const handleSearch = () => {
    console.log("Realizando búsqueda:", searchText);
  };

  const handleVoiceSearch = () => {
    console.log("Búsqueda por voz");
  };

  const handleBlur = () => {
    // Ocultar iconos y texto cuando se hace clic fuera de la barra de búsqueda
    setShowIcons(true);
  };

  return (
    <View style={styles.container}>
      {showIcons && (
        <TouchableOpacity onPress={handleSearch}>
          <Image
            source={require("../../../assets/icons/iconobuscador.png")}
            style={styles.image}
          />
        </TouchableOpacity>
      )}
      <TextInput
        style={styles.input}
        placeholder="Buscar"
        value={searchText}
        onChangeText={setSearchText}
        onFocus={() => setShowIcons(false)}
        onBlur={handleBlur}
      />
      <TouchableOpacity onPress={handleVoiceSearch}>
        <Image source={require("../../../assets/icons/iconomic.png")} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
