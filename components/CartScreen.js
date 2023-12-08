import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

import HeaderGoBack from "./HeaderGoBack";
import { List, Button } from "react-native-paper";

const CartScreen = () => {
  const totalPrice = 100000; 
  return (
    <View style={{ flex: 1 }}>
      <HeaderGoBack title="Giỏ hàng" />
      <List.Item
        style={styles.list_cart}
        title="Cánh gà giữa nhập khẩu đông lạnh 500g (12 - 17 miếng)"
        description="200000"
        left={() => (
          <Image
            source={{
              uri: "https://cdn.tgdd.vn/Products/Images/8790/297341/bhx/canh-ga-nhap-khau-dong-lanh-500g-3-5-canh-202312061440491558.jpg",
            }}
            style={{ width: 60, height: 50 }}
          />
        )}
        right={(props) => <List.Icon {...props} icon="delete" />}
      />
      <List.Item
        style={styles.list_cart}
        title="Cánh gà giữa nhập khẩu đông lạnh 500g (12 - 17 miếng)"
        description="200000"
        left={() => (
          <Image
            source={{
              uri: "https://cdn.tgdd.vn/Products/Images/8790/297341/bhx/canh-ga-nhap-khau-dong-lanh-500g-3-5-canh-202312061440491558.jpg",
            }}
            style={{ width: 60, height: 50 }}
          />
        )}
        right={(props) => <List.Icon {...props} icon="delete" />}
      />
      <List.Item
        style={styles.list_cart}
        title="Cánh gà giữa nhập khẩu đông lạnh 500g (12 - 17 miếng)"
        description="200000"
        left={() => (
          <Image
            source={{
              uri: "https://cdn.tgdd.vn/Products/Images/8790/297341/bhx/canh-ga-nhap-khau-dong-lanh-500g-3-5-canh-202312061440491558.jpg",
            }}
            style={{ width: 60, height: 50 }}
          />
        )}
        right={(props) => <List.Icon {...props} icon="delete" />}
      />
      <List.Item
        style={styles.list_cart}
        title="Cánh gà giữa nhập khẩu đông lạnh 500g (12 - 17 miếng)"
        description="200000"
        left={() => (
          <Image
            source={{
              uri: "https://cdn.tgdd.vn/Products/Images/8790/297341/bhx/canh-ga-nhap-khau-dong-lanh-500g-3-5-canh-202312061440491558.jpg",
            }}
            style={{ width: 60, height: 50 }}
          />
        )}
        right={(props) => <List.Icon {...props} icon="delete" />}
      />

      <View style={styles.footer}>
        <Text style={styles.totalPrice}>
          Tổng Tiền: <Text style={styles.price}>{totalPrice} VND</Text>
        </Text>
        <Button
          mode="contained"
          style={styles.btn_buy}
          onPress={() => console.log("Pressed")}>
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
});
