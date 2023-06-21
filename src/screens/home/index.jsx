import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { addUserToSqlite, getAllUsers, checkUserSqlite } from "../../store/db";

import { loadUser, logout } from "../../store/user.slice";
import { Head, ButtonText } from "../../components/index";
import { styles } from "./styles";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(loadUser());
    console.log("Usuarios-----------------------------:", user);
  }, []);

  const handleLogin = async () => {
    console.log("LOGIN");

    const userchk = await checkUserSqlite();
    console.log("Usuarios--SQLITE:", userchk);
  };

  const handleLogout = () => {
    console.log("LOGOUT");
    dispatch(logout(user.user.email));
  };

  return (
    <View>
      <Head />

      <View style={styles.container}>
        {user.user.name ? (
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Bienvenido {user.user.name}!</Text>
            <ButtonText onPress={handleLogout} text="Salir" width={"70%"} height={50} />
          </View>
        ) : (
          <View style={styles.loginContainer}>
            <TextInput
              style={styles.inputElement}
              placeholder="Nombre de usuario"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.inputElement}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <ButtonText onPress={handleLogin} text="Ingresar" width={"70%"} height={50} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Home;
