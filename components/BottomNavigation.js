import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import AccountScreen from "./AccountScreen";
import SearchScreen from "./SearchScreen";
import CartScreen from "./CartScreen";
import { Feather } from '@expo/vector-icons';
import DetailAccount from "./DetailAccount";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeybroad: true,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 70,
    paddingTop: 10, // Thêm padding top
    paddingBottom: 10, // Thêm padding bottom
    borderRadius: 200,
  },
};

const BottomNavigation = () => {
  const userId = useSelector((state) => state.userId);

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={24}
                  color={focused ? "#00CC33" : "#99CC99"}
                />
                <Text color={focused ? "#00CC33" : "#99CC99"}>Trang chủ</Text>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <AntDesign
                  name="search1"
                  size={24}
                  color={focused ? "#00CC33" : "#99CC99"}
                />
                <Text>Tìm kiếm</Text>
              </>
            );
          },
        }}
      />
        <Tab.Screen
        name="cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
               
                <Feather name="shopping-bag" size={24}   color={focused ? "#00CC33" : "#99CC99"} />
                <Text>Giỏ hàng</Text>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name={userId ? 'detailaccount' : 'account'}
        component={userId ? DetailAccount : AccountScreen }
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <AntDesign
                  name="user"
                  size={24}
                  color={focused ? "#00CC33" : "#99CC99"}
                />
                <Text>Tài khoản</Text>
              </>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
