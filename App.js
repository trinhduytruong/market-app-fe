import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BottomNavigation from "./components/BottomNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailProductScreen from "./components/DetailProductScreen";
import DetailCategory from "./components/DetailCategory";
import DetailAccount from "./components/DetailAccount";
import { Provider } from "react-redux";
import store from "./redux/store";
import HomeScreen from "./components/HomeScreen";
import Member from "./components/Member";
import ListItem from "./components/ListItem";
import Recipes from "./components/Recipes";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
          <Stack.Screen
            name="detailgruop"
            component={Member}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="listitem"
            component={ListItem}
            options={{ headerShown: false }}
          />
             <Stack.Screen
            name="recipes"
            component={Recipes}
            options={{ headerShown: false }}
          />
        
          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
