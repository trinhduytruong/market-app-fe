import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { List, Button } from "react-native-paper";
import { useSelector } from "react-redux";
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';

import HeaderGoBack from "./HeaderGoBack";

const CartScreen = () => {
    const userId = useSelector((state) => state.userId);
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
                    const res = await axios.get(`http://localhost:8889/api/user/cart/${userId}`);
                    const data = res.data;
                    setCart(data);
                    const total = data.reduce((acc, item) => acc + item.foodId.price * item.quantity, 0);
                    setTotalPrice(total);
                } catch (error) {
                    console.error("Error fetching cart data:", error);
                }
            };

            getCart();
            return () => setCart([]); // Optional: Reset cart on screen blur
        }, [userId])
    );
    const handleRemoveItemCart = async (idItem) => {
      try {
          await axios.delete(`http://localhost:8889/api/user/cart/remove/${userId}`, {
              data: { foodId: idItem }
          });
          // Refresh cart data after successful removal
          const res = await axios.get(`http://localhost:8889/api/user/cart/${userId}`);
          const data = res.data;
          setCart(data);
          const total = data.reduce((acc, item) => acc + item.foodId.price * item.quantity, 0);
          setTotalPrice(total);
      } catch (error) {
          console.error("Error removing product from cart:", error);
      }
  };
  

    return (
        <View style={{ flex: 1 }}>
            <HeaderGoBack title="Giỏ hàng" />
            {userId && cart.length > 0 ? (
                cart.map((value, key) => (
                    <List.Item
                        key={key}
                        style={styles.list_cart}
                        title={value.foodId.name}
                        description={`Giá: ${formatVND(value.foodId.price)} - Số lượng: ${value.quantity}`}
                        left={() => <Image source={{ uri: value.foodId.image }} style={{ width: 60, height: 50 }} />}
                        right={() => (
                            <TouchableOpacity onPress={() => handleRemoveItemCart(value.foodId._id)}>
                                <List.Icon icon="delete" />
                            </TouchableOpacity>
                        )}
                    />
                ))
            ) : (
                <Text style={styles.emptyCartMessage}>
                    Chưa đăng nhập hoặc chưa có sản phẩm trong giỏ hàng
                </Text>
            )}
            <View style={styles.footer}>
                <Text style={styles.totalPrice}>
                    Tổng Tiền: <Text style={styles.price}>{userId ? formatVND(totalPrice) : 0}</Text>
                </Text>
                <Button mode="contained" style={styles.btn_buy} onPress={() => console.log("Pressed")}>
                    Mua ngay
                </Button>
            </View>
        </View>
    );
};

export default CartScreen;

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
