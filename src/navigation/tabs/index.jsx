import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeIcon from "../../../assets/icons/iconohome.png";
import SearchIcon from "../../../assets/icons/iconobuscador.png";
import NewIcon from "../../../assets/icons/icononuevo.png";
import ProfileIcon from "../../../assets/icons/iconoperfil.png";

import HomeNavigator from "../home";
import ProfileNavigator from "../profile";
import NewNavigator from "../new";
import SearchNavigator from "../search";
import { COLORS } from "../../constants";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Rubik-Medium",
        },
        tabBarActiveTintColor: COLORS.black,
        tabBarInactiveTintColor: COLORS.darkGray,
        tabBarIconStyle: {
          fontSize: 24,
        },
      }}>
      <BottomTab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ focused, color, size }) => (
            <Image source={HomeIcon} size={size} color={focused ? color : COLORS.darkGray} />
          ),
        }}
      />
      <BottomTab.Screen
        name="SearchTab"
        component={SearchNavigator}
        options={{
          tabBarLabel: "Buscador",
          tabBarIcon: ({ focused, color, size }) => (
            <Image source={SearchIcon} size={size} color={focused ? color : COLORS.darkGray} />
          ),
        }}
      />
      <BottomTab.Screen
        name="NewTab"
        component={NewNavigator}
        options={{
          tabBarLabel: "Nuevo",
          tabBarIcon: ({ focused, color, size }) => (
            <Image source={NewIcon} size={size} color={focused ? color : COLORS.darkGray} />
          ),
        }}
      />
      <BottomTab.Screen
        name="ProfileTab"
        component={ProfileNavigator}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ focused, color, size }) => (
            <Image source={ProfileIcon} size={size} color={focused ? color : COLORS.darkGray} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
