import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Picker } from "@react-native-picker/picker";

import { styles } from "./styles";
import { ImageSelector, Head } from "../../components";
import { addStore } from "../../store/stores.slice";
import { COLORS } from "../../constants";
import { ModalText } from "../../components";

const NewStore = ({ navigation }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Categoria");
  const [description, setDescription] = useState("");
  const [photoUri, setPhotoUri] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePickerChange = (value) => {
    switch (value) {
      case "Restaurantes":
        setCategory("Restaurantes");
        break;
      case "Cosmetica":
        setCategory("Cosmetica");
        break;
      case "Limpieza":
        setCategory("Limpieza");
        break;
      case "Comestibles":
        setCategory("Comestibles");
        break;
    }
  };

  const handleImageSelect = (uri) => {
    setPhotoUri(uri);
  };

  const handleSave = () => {
    if (!name || !category || category == "Categoria" || !description || !photoUri) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    } else {
      dispatch(
        addStore({
          name: name,
          category: category,
          description: description,
          photoUri: photoUri,
        })
      );
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Head />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.title}>NUEVA TIENDA</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre de la tienda"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Text style={styles.text}>Categoria</Text>
        <Picker
          onValueChange={handlePickerChange}
          selectedValue={category}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          dropdownStyle={styles.pickerDropdown}>
          <Picker.Item label="Restaurantes" value="Restaurantes" />
          <Picker.Item label="Cosmetica" value="Cosmetica" />
          <Picker.Item label="Limpieza" value="Limpieza" />
          <Picker.Item label="Comestibles" value="Comestibles" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Descripcion"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <ImageSelector onImage={handleImageSelect} />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>GUARDAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showModal && (
        <ModalText
          text="Todos los campos son requeridos"
          width={300}
          height={100}
          color={COLORS.primary}
        />
      )}
    </View>
  );
};

export default NewStore;
