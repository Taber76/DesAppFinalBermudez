import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadUser, addUser } from "../../store/user.slice";

import { ButtonText, Head, ModalText } from "../../components";
import { COLORS } from "../../constants";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  //const user = useSelector((state) => state.user);

  const handleSave = async () => {
    dispatch(addUser({ username, email, password })).then((result) => {
      if (result.error) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
      } else {
        setUsername("");
        setEmail("");
        setPassword("");
        dispatch(loadUser());
        navigation.navigate("Home");
      }
    });
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
      {showModal && (
        <ModalText text="Email ya registrado" width={300} height={100} color={COLORS.primary} />
      )}
    </View>
  );
};

export default Profile;
