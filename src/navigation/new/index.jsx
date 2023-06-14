import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NewStore } from "../../screens/index";
import { COLORS } from "../../constants/index";

const Stack = createNativeStackNavigator();

const NewNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="New"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="New" component={NewStore} />
    </Stack.Navigator>
  );
};

export default NewNavigator;
