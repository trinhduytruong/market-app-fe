import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BottomNavigation from "./components/BottomNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailProductScreen from "./components/DetailProductScreen";
import DetailCategory from "./components/DetailCategory";
import DetailAccount from "./components/DetailAccount";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Bottom Navigation"
          component={BottomNavigation}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="detailproduct"
          component={DetailProductScreen}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="detailcategory"
          component={DetailCategory}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="detailaccount"
          component={DetailAccount}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


