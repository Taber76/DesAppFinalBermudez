import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

import { ButtonText, Head } from "../../components";
import { styles } from "./styles";
import { insertUser, getAllUsers } from "../../db";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    insertUser(name, password, email, "");
    getAllUsers()
      .then((users) => {
        console.log("Usuarios:", users);
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
      });
  };

  return (
    <View>
      <Head />
      <View style={styles.container}>
        <Text style={styles.title}>DATOS USUARIO</Text>
        <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <ButtonText text="Guardar" width={200} height={50} onPress={handleSave} />
      </View>
    </View>
  );
};

export default Profile;
