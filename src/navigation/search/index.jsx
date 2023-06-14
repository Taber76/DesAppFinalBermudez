import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Search } from "../../screens/index";
import { COLORS } from "../../constants/index";

const Stack = createNativeStackNavigator();

const SearchNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
