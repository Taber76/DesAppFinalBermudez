import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadUser, addUser } from "../../store/user.slice";

import { ButtonText, Head } from "../../components";
import { styles } from "./styles";
import { addUserToSqlite, getAllUsers, checkUserSqlite, dropTable } from "../../store/db";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const user = useSelector((state) => state.user);

  const handleSave = async () => {
    try {
      await dispatch(addUser({ username, email, password }));
      await dispatch(loadUser());
    } catch (error) {
      console.error("Error al guardar o obtener usuarios:", error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View>
      <Head />
      <View style={styles.container}>
        <Text style={styles.title}>DATOS USUARIO</Text>
        <TextInput
          placeholder="Nombre"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
        <View style={styles.passwordInputContainer}>
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
          />
          <TouchableOpacity style={styles.eyeIconContainer} onPress={toggleShowPassword}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <ButtonText text="Guardar" width={200} height={50} onPress={handleSave} />
      </View>
    </View>
  );
};

export default Profile;
