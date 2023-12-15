import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { List, Button } from "react-native-paper";
import { useSelector } from "react-redux";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

import HeaderGoBack from "./HeaderGoBack";
import { server } from "../server";

const ListItem = () => {
  const userId = useSelector((state) => state.userId);
  const groupId = useSelector((state) => state.idGroup);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);

  const formatVND = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  useFocusEffect(
    React.useCallback(() => {
      const getCart = async () => {
        try {
          const res = await axios.get(
            `${server}/familygroup/getlistitem/${groupId}`
          );
          const data = res.data;
          setCart(data);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };

      getCart();
      return () => setCart([]); // Optional: Reset cart on screen blur
    }, [userId, groupId])
  );
  const handleRemoveItem = async (idItem) => {
    console.log(groupId);
    try {
      await axios.delete(
        `${server}/user/deleteitem/${groupId}`,
        {
          data: { foodId: idItem },
        }
      );
      // Refresh cart data after successful removal
      const res = await axios.get(
        `${server}/familygroup/getlistitem/${groupId}`
      );
      const data = res.data;
      setCart(data);
     
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <HeaderGoBack title="Tủ lạnh gia đình" />
      <ScrollView>
        {userId && cart.length > 0 ? (
          cart.map(
            (value, key) =>
              value.foodId && (
                <List.Item
                  key={key}
                  style={styles.list_cart}
                  title={value.foodId.name}
                  description={`Giá: ${formatVND(
                    value.foodId.price
                  )} - Số lượng: ${value.quantity}`}
                  left={() => (
                    <Image
                      source={{ uri: value.foodId.image }}
                      style={{ width: 60, height: 50 }}
                    />
                  )}
                  right={() => (
                    <TouchableOpacity onPress={() =>handleRemoveItem(value.foodId._id) }>
                      <List.Icon icon="delete" />
                    </TouchableOpacity>
                  )}
                />
              )
          )
        ) : (
          <Text style={styles.emptyCartMessage}>
            Chưa có sản phẩm trong tủ lạnh
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  btn_buy: {
    backgroundColor: "#00CC33",
  },
  list_cart: {
    paddingLeft: 10,
  },
  footer: {
    position: "absolute",
    bottom: "7%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    color: "#ff0000",
  },
  emptyCartMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});
