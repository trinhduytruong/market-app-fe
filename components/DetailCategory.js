import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import HeaderGoBack from "./HeaderGoBack";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import axios from "axios";
import { server } from "../server";
const DetailCategory = () => {
  const navigation = useNavigation();
  const idCategory = useSelector((state) => state.idCategory);
  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();
  const handleDetailProduct = (id) => {
    dispatch({ type: "SET_PRODUCT_ID", payload: id });
    navigation.navigate("detailproduct");
  };
  const renderProductItem = ({ item }) => {
    return (
      <View style={styles.item_product}>
        <Image
          source={{ uri: item.image }}
          resizeMode="contain"
          style={styles.img_product}
        />
        <Text
          onPress={() => handleDetailProduct(item._id)}
          style={styles.productName}
        >
          {item.name}
        </Text>
        <Text style={styles.productPrice}>{formatVND(item.price)} VND</Text>

        <Button
          icon="cart-arrow-down"
          mode="contained"
          style={styles.btn_add_to_cart}
          onPress={() => handleAddToCart(item._id)}
        >
          Thêm vào giỏ
        </Button>
      </View>
    );
  };
  const handleAddToCart = async (productId) => {
    if (!userId) {
      // Hiển thị thông báo nếu không có userId
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Bạn chưa đăng nhập",
      });
      return; // Dừng hàm nếu không có userId
    }

    try {
      const response = await axios.post(`${server}/user/addtocart/${userId}`, {
        foodId: productId,
        quantity: 1, // hoặc số lượng mà người dùng chọn
      });
      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: "Sản phẩm đã được thêm vào giỏ hàng.",
      });
      dispatch({ type: "UPDATE_CART" });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không thể thêm sản phẩm vào giỏ hàng.",
      });
    }
  };

  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`${server}/food/${idCategory}`);
      const data = await res.json();
      setListProduct(data);
    };
    getProduct();
  }, []);
  function formatVND(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
  return (
    <View>
      <HeaderGoBack title="Danh mục sản phẩm" />
      <View style={styles.main_product}>
        <FlatList
          data={listProduct}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.name}
          numColumns={2}
        />
      </View>
      <Toast />
    </View>
  );
};

export default DetailCategory;
const styles = StyleSheet.create({
  item_product: {
    flex: 1,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  img_product: {
    width: "100%",
    height: 150, // Chỉnh kích thước hình ảnh của sản phẩm
  },
  productName: {
    fontWeight: "bold",
    paddingVertical: 10,
  },
  productPrice: {
    color: "red",
    fontSize: 18,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  name_category: {
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 10,
  },

  btn_add_to_cart: {
    backgroundColor: "#00CC33",
  },
});
