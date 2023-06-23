import React, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { loadUser, login, logout } from "../../store/user.slice";
import { Head, ButtonText, ModalText } from "../../components";
import { COLORS } from "../../constants";
import { styles } from "./styles";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const handleLogin = async () => {
    dispatch(login({ email, password })).then((result) => {
      if (result.error) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
      } else {
        setEmail("");
        setPassword("");
      }
    });
  };

  const handleLogout = () => {
    dispatch(logout(user.user.email));
  };

  return (
    <View>
      <Head />

      <View style={styles.container}>
        {user.isLogged ? (
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Bienvenido {user.user.username}!</Text>
            <ButtonText onPress={handleLogout} text="Cerrar sesion" width={"70%"} height={50} />
          </View>
        ) : (
          <View style={styles.loginContainer}>
            <TextInput
              style={styles.inputElement}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
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
      {showModal && (
        <ModalText
          text="Usuario o contraseña incorrectos"
          width={300}
          height={100}
          color={COLORS.primary}
        />
      )}
    </View>
  );
};

export default Home;
