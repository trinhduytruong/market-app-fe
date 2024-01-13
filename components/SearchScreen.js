import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import HeaderGoBack from "./HeaderGoBack";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import axios from "axios";
import { server } from "../server";
const SearchScreen = () => {
  const [dataSearch, setDataSearch] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const dataFake = [
    {
      name: "Cánh gà giữa nhập khẩu đông lạnh 500g (12 - 17 miếng)",
      image:
        "https://cdn.tgdd.vn/Products/Images/8790/297340/bhx/-202306211455508775.jpg",
      price: 200000,
    },
    {
      name: "Cánh gà giữa nhập khẩu đông lạnh 500g (12 - 17 miếng)",
      image:
        "https://cdn.tgdd.vn/Products/Images/8790/297340/bhx/-202306211455508775.jpg",
      price: 200000,
    },
  ];

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

  function formatVND(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }

  const handleSearch = async (keywordBody) => {
    console.log(keyWord);
    try {
      const response = await axios.post(`${server}/food/search/`, {
        keyword: keywordBody,
      });
      console.log(response);
      setDataSearch(response.data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
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
        quantity: 1,
      });

      // Xử lý phản hồi từ server
      console.log(response.data);
      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: "Sản phẩm đã được thêm vào giỏ hàng.",
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không thể thêm sản phẩm vào giỏ hàng.",
      });
    }
  };
  return (
    <View style={styles.container}>
      <HeaderGoBack title="Tìm kiếm" />
      <TextInput
        label="Từ khoá"
        onChangeText={(text) => setKeyWord(text)}
        right={<TextInput.Icon icon="magnify" />}
      />
      <Button
        icon="magnify"
        mode="contained"
        style={styles.btn_search}
        onPress={() => handleSearch(keyWord)}
      >
        Tìm kiếm
      </Button>

      <Text style={styles.title_search}>Kết quả tìm kiếm</Text>

      <View style={styles.main_product}>
        <FlatList
          key={(item) => item._id}
          data={dataSearch}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.name}
          numColumns={2}
        />
      </View>
      <Toast />
    </View>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  main_product: {
    height: 600,
  },
  btn_search: {
    marginVertical: 20,
    backgroundColor: "#00CC33",
  },
  title_search: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  btn_add_to_cart: {
    backgroundColor: "#00CC33",
  },
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
});
