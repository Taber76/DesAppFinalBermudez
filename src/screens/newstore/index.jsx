import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Picker } from "@react-native-picker/picker";

import { styles } from "./styles";
import { ImageTake, ImageSelector, Head, ButtonText } from "../../components";
import { addStore, loadStores } from "../../store/stores.slice";
import { COLORS } from "../../constants";
import { ModalText } from "../../components";

const NewStore = ({ navigation }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Restaurant");
  const [description, setDescription] = useState("");
  const [photoUri, setPhotoUri] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePickerChange = (value) => {
    switch (value) {
      case "Restaurantes":
        setCategory("Restaurant");
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
    console.log(photoUri, "photoUri<----------------------");
  };

  const handleSave = () => {
    if (!name || !category || !description || !photoUri) {
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
        }),
        loadStores()
      );
      setName("");
      setCategory("Restaurant");
      setDescription("");
      setPhotoUri(null);
      // navigation.goBack();
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

        <View style={styles.imageContainer}>
          {!photoUri ? (
            <Text style={styles.noImageText}>No hay imagen seleccionada</Text>
          ) : (
            <Image source={{ uri: photoUri }} style={styles.image} />
          )}
        </View>

        <View style={styles.buttonSelect}>
          <ImageTake onImage={handleImageSelect} />
        </View>

        <View style={styles.buttonSelect}>
          <ImageSelector onImage={handleImageSelect} />
        </View>

        <View style={styles.buttonsContainer}>
          <ButtonText text="GUARDAR" width={150} height={50} onPress={handleSave} />
          <ButtonText text="CANCELAR" width={150} height={50} onPress={() => navigation.goBack()} />
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
